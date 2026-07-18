import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    //  THE FIX: Safely unwrap the asynchronous params Promise using await
    const resolvedParams = await params;
    const slug = resolvedParams.slug; 

    const [product] = await sql`
      SELECT p.*, s.name as sub_category_name 
      FROM products p
      LEFT JOIN sub_categories s ON p.sub_category_id = s.id
      WHERE p.slug = ${slug}
    `;
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
