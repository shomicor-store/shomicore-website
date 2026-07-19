import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { status } = await request.json();

    const [updatedOrder] = await sql`
      UPDATE orders 
      SET order_status = ${status}
      WHERE id = ${id}
      RETURNING id, order_number, order_status
    `;

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order record missing" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Fulfillment updated!", data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
