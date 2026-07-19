import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { 
      customerName, customerEmail, phone, 
      addressLine1, addressLine2, city, state, postalCode, country,
      items, subtotal, shippingCost, totalAmount 
    } = body;

    // 1. Core input parameter validation check
    if (!customerName || !customerEmail || !addressLine1 || !city || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Missing required transactional fields." }, { status: 400 });
    }

    // 2. Database Transaction Layer Execution Loop
    const [newOrder] = await sql`
      INSERT INTO orders (
        customer_name, customer_email, phone, 
        address_line1, address_line2, city, state, postal_code, country,
        items, subtotal, shipping_cost, total_amount, order_status
      ) VALUES (
        ${customerName}, ${customerEmail}, ${phone}, 
        ${addressLine1}, ${addressLine2 || null}, ${city}, ${state}, ${postalCode}, ${country || 'EU'},
        ${JSON.stringify(items)}::jsonb, ${parseFloat(subtotal)}, ${parseFloat(shippingCost)}, ${parseFloat(totalAmount)}, 'PENDING'
      ) RETURNING id, order_number, total_amount
    `;

    return NextResponse.json({ 
      success: true, 
      message: "Order logged and snapshot synchronized successfully!",
      data: newOrder
    }, { status: 201 });

  } catch (error) {
    console.error("❌ CRITICAL TRANSACTION TRANSACTION PIPE DROP ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
