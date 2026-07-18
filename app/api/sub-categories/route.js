import sql from '@/lib/db';
import { NextResponse } from 'next/server';

// GET: Fetches subcategories so they appear in your dropdown select boxes
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const parent = searchParams.get('parent'); // e.g., ?parent=Silver Jewelry

    let data;
    if (parent) {
      data = await sql`SELECT id, name, parent_category FROM sub_categories WHERE parent_category = ${parent} ORDER BY name ASC`;
    } else {
      data = await sql`SELECT * FROM sub_categories ORDER BY name ASC`;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Creates a brand new subcategory from your dashboard form
export async function POST(request) {
  try {
    const { parentCategory, name, imageUrl } = await request.json();

    if (!parentCategory || !name) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const [newSub] = await sql`
      INSERT INTO sub_categories (parent_category, name, image_url)
      VALUES (${parentCategory}, ${name}, ${imageUrl || null})
      RETURNING id, name, parent_category
    `;

    return NextResponse.json({ success: true, message: "Subcategory created!", data: newSub });
  } catch (error) {
    // Catch unique name constraint violations
    if (error.code === '23505') {
      return NextResponse.json({ success: false, message: "This subcategory already exists!" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
