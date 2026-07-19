import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await sql`
      SELECT id, order_number, customer_name, customer_email, phone, items, total_amount, order_status, created_at 
      FROM orders 
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}