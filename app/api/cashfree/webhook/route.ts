import { NextRequest, NextResponse } from "next/server";

// Cashfree will send payment status webhooks to this endpoint
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Log webhook data for debugging
        console.log("Cashfree Webhook received:", JSON.stringify(body, null, 2));

        // In production, you should:
        // 1. Verify the webhook signature using x-cashfree-signature header
        // 2. Update order status in your database
        // 3. Send confirmation emails
        // 4. Grant access to purchased items

        const { data } = body;

        if (data?.order?.order_status === "PAID") {
            // Payment successful
            console.log(`✅ Payment successful for order: ${data.order.order_id}`);
            // TODO: Update your database, grant access, send emails, etc.
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
