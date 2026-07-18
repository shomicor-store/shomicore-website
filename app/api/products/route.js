import sql from '@/lib/db';
import { NextResponse } from 'next/server';


function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\-\-+/g, '-');      // Replace multiple - with single -
}

export async function POST(request) {
  try {
    const body = await request.json();
    

    const { 
      name, description, price, parentCategory, subCategoryId, 
      images, colors, sizingType, availableSizes, isFeatured 
    } = body;

    const slug = generateSlug(name);

    // Save directly into your custom Neon arrays layout
    const [newProduct] = await sql`
      INSERT INTO products (
        name, slug, description, price, parent_category, sub_category_id, 
        images, colors, sizing_type, available_sizes, is_featured
      ) VALUES (
        ${name}, ${slug}, ${description}, ${price}, ${parentCategory}, ${subCategoryId || null}, 
        ${images}, ${colors}, ${sizingType}, ${availableSizes}, ${isFeatured || false}
      ) RETURNING id, name, slug
    `;

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filtering criteria directly from frontend URL search params
    const parentCategory = searchParams.get('category');       // e.g., ?category=Silver Jewelry
    const subCategoryId = searchParams.get('subcategory');     // e.g., ?subcategory=uuid-here
    const size = searchParams.get('size');                     // e.g., ?size=Medium or ?size=7
    const color = searchParams.get('color');                   // e.g., ?color=Sky Blue
    const featured = searchParams.get('featured');             // e.g., ?featured=true (For Home Page)


    let query = sql`
      SELECT 
        id, 
        name, 
        slug, 
        description, 
        price, 
        parent_category, 
        sub_category_id, 
        images, 
        colors, 
        available_sizes, 
        is_featured 
      FROM products 
      WHERE 1=1
    `;

    // Dynamically append SQL conditions based on active client filters
    if (parentCategory) {
      query = sql`${query} AND parent_category = ${parentCategory}`;
    }
    if (subCategoryId) {
      query = sql`${query} AND sub_category_id = ${subCategoryId}`;
    }
    if (featured === 'true') {
      query = sql`${query} AND is_featured = true`;
    }
    
    if (size) {
      query = sql`${query} AND available_sizes @> ARRAY[${size}]::VARCHAR[]`;
    }
    if (color) {
      query = sql`${query} AND colors @> ARRAY[${color}]::VARCHAR[]`;
    }

   
    const products = await sql`${query} ORDER BY created_at DESC`;

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
