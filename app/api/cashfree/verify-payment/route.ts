import { NextRequest, NextResponse } from "next/server";

const CASHFREE_APP_ID = "1178790fac83669a8ab4ff432b978711";
const CASHFREE_SECRET_KEY = "cfsk_ma_prod_9c723053ad196a5dbd341b0bb23dd5e0_36199afd";
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders"; // Production

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId } = body as { orderId: string };

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        // Get order status from Cashfree
        const response = await fetch(`${CASHFREE_API_URL}/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": CASHFREE_APP_ID,
                "x-client-secret": CASHFREE_SECRET_KEY,
                "x-api-version": "2023-08-01",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Cashfree order verification failed:", data);
            return NextResponse.json(
                { error: "Failed to verify payment", details: data },
                { status: response.status }
            );
        }

        const isPaid = data.order_status === "PAID";

        // Also get the payment details if paid
        let paymentDetails = null;
        if (isPaid) {
            try {
                const paymentsResponse = await fetch(`${CASHFREE_API_URL}/${orderId}/payments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-client-id": CASHFREE_APP_ID,
                        "x-client-secret": CASHFREE_SECRET_KEY,
                        "x-api-version": "2023-08-01",
                    },
                });
                const paymentsData = await paymentsResponse.json();
                if (Array.isArray(paymentsData) && paymentsData.length > 0) {
                    paymentDetails = paymentsData.find((p: Record<string, unknown>) => p.payment_status === "SUCCESS") || paymentsData[0];
                }
            } catch {
                // Silently fail - payment details are optional
            }
        }

        return NextResponse.json({
            success: true,
            orderId: data.order_id,
            cfOrderId: data.cf_order_id,
            orderStatus: data.order_status,
            orderAmount: data.order_amount,
            orderCurrency: data.order_currency,
            isPaid,
            paymentDetails: paymentDetails ? {
                paymentId: paymentDetails.cf_payment_id,
                paymentMethod: paymentDetails.payment_method,
                paymentTime: paymentDetails.payment_completion_time,
                paymentAmount: paymentDetails.payment_amount,
            } : null,
        });
    } catch (error) {
        console.error("Error verifying Cashfree payment:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
