import { NextRequest, NextResponse } from "next/server";

const CASHFREE_APP_ID = "1178790fac83669a8ab4ff432b978711";
const CASHFREE_SECRET_KEY = "cfsk_ma_prod_9c723053ad196a5dbd341b0bb23dd5e0_36199afd";
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders"; // Production

interface OrderItem {
    name: string;
    licenseType: string;
    price: number;
    componentId: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, customerEmail, customerPhone, customerName, items } = body as {
            amount: number;
            customerEmail: string;
            customerPhone: string;
            customerName: string;
            items: OrderItem[];
        };

        if (!amount || amount < 1) {
            return NextResponse.json({ error: "Minimum order amount is ₹1" }, { status: 400 });
        }

        if (!customerPhone) {
            return NextResponse.json({ error: "Customer phone is required" }, { status: 400 });
        }

        // Generate a unique order ID
        const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        const customerId = `CUST_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        // Ensure amount has max 2 decimal places
        const orderAmount = Math.round(amount * 100) / 100;

        // Build return URL — Cashfree production requires HTTPS
        // For localhost testing, we use a generic HTTPS placeholder that still works
        const origin = request.nextUrl.origin;
        const isLocalhost = origin.includes("localhost") || origin.includes("127.0.0.1");
        // For localhost, we won't use return_url redirect — we'll use popup/modal mode instead
        // For production, use the real HTTPS origin
        const returnUrl = isLocalhost
            ? `https://getapi.dev/checkout?order_id=${orderId}&cf_status={order_status}`
            : `${origin}/checkout?order_id=${orderId}&cf_status={order_status}`;

        const orderPayload = {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: "INR",
            customer_details: {
                customer_id: customerId,
                customer_email: customerEmail || "customer@getapi.dev",
                customer_phone: customerPhone,
                customer_name: customerName || "Customer",
            },
            order_meta: {
                return_url: returnUrl,
                notify_url: isLocalhost ? undefined : `${origin}/api/cashfree/webhook`,
            },
            order_note: `Get API Purchase - ${items?.length || 0} items`,
            order_tags: {
                source: "getapi-marketplace",
                items_count: String(items?.length || 0),
            },
        };

        console.log("Creating Cashfree order:", JSON.stringify(orderPayload, null, 2));

        const response = await fetch(CASHFREE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": CASHFREE_APP_ID,
                "x-client-secret": CASHFREE_SECRET_KEY,
                "x-api-version": "2023-08-01",
            },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Cashfree order creation failed:", JSON.stringify(data, null, 2));
            return NextResponse.json(
                { error: "Failed to create payment order", details: data },
                { status: response.status }
            );
        }

        console.log("Cashfree order created successfully:", data.order_id);

        return NextResponse.json({
            success: true,
            orderId: data.order_id,
            cfOrderId: data.cf_order_id,
            paymentSessionId: data.payment_session_id,
            orderStatus: data.order_status,
            orderAmount: data.order_amount,
            orderCurrency: data.order_currency,
            isLocalhost,
        });
    } catch (error) {
        console.error("Error creating Cashfree order:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
