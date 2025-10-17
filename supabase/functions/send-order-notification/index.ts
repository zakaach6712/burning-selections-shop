import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product_name: string;
  quantity: number;
  product_price: number;
  subtotal: number;
}

interface OrderNotificationRequest {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderNotificationRequest = await req.json();
    
    console.log("Processing order notification for order:", orderData.orderId);

    // Create items list HTML
    const itemsHtml = orderData.items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${item.product_name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.product_price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">$${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🔥 New Order Received!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #667eea; margin-top: 0;">Order Details</h2>
              <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderData.orderId}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #667eea; margin-top: 0;">Customer Information</h2>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${orderData.customerName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${orderData.customerEmail}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${orderData.customerPhone || 'Not provided'}</p>
              <p style="margin: 5px 0;"><strong>Shipping Address:</strong><br>${orderData.shippingAddress}<br>${orderData.shippingCity}, ${orderData.shippingCountry}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #667eea; margin-top: 0;">Order Items</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #667eea; color: white;">
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Qty</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                    <th style="padding: 12px; text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr style="background-color: #f0f0f0; font-weight: bold;">
                    <td colspan="3" style="padding: 15px; text-align: right;">Total Amount:</td>
                    <td style="padding: 15px; text-align: right; color: #667eea; font-size: 18px;">$${orderData.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="text-align: center; padding: 20px; color: #666;">
              <p style="margin: 5px 0;">Please process this order as soon as possible.</p>
              <p style="margin: 5px 0; font-size: 12px;">This is an automated notification from Burning Selections Shop</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Burning Selections <onboarding@resend.dev>",
      to: ["yussufabdirizak123@gmail.com"],
      subject: `🔥 New Order #${orderData.orderId.slice(0, 8)} - $${orderData.totalAmount.toFixed(2)}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
