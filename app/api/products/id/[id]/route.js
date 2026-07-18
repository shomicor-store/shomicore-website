import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import { applySecurityHeaders, createRateLimitResponse, isAdminAuthenticated, isRateLimited } from '@/lib/security';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shomicore123';

function generateSlug(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// 1. PUT: Clean execution update mapper matching frontend JSON keys safely
export async function PUT(request, { params }) {
  try {
    if (isRateLimited(request, { prefix: 'products-put', limit: 30, windowMs: 60_000 })) {
      return createRateLimitResponse();
    }

    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token || token !== ADMIN_PASSWORD) {
      return applySecurityHeaders(
        NextResponse.json({ success: false, message: 'Unauthorized admin request.' }, { status: 401 })
      );
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const body = await request.json();

    // Destructure variables correctly matching your exact payload array parameters
    const { 
      name, 
      description, 
      price, 
      parentCategory, 
      subCategoryId, 
      images, 
      colors, 
      sizingType, 
      availableSizes, 
      isFeatured 
    } = body;

    // Direct data verification check
    if (!name || !price || !parentCategory) {
      return NextResponse.json({ success: false, message: "Missing core operational parameter fields" }, { status: 400 });
    }

    const slug = generateSlug(name);

    // Run clean native row mapping to prevent PostgreSQL type constraint crashes
    const [updatedProduct] = await sql`
      UPDATE products 
      SET 
        name = ${name},
        slug = ${slug},
        description = ${description},
        price = ${parseFloat(price)},
        parent_category = ${parentCategory},
        sub_category_id = ${subCategoryId || null},
        images = ${images},
        colors = ${colors},
        sizing_type = ${sizingType},
        available_sizes = ${availableSizes},
        is_featured = ${isFeatured || false}
      WHERE id = ${id}
      RETURNING id, name, slug
    `;

    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "No SKU row identified matching this ID parameter." }, { status: 404 });
    }

    return applySecurityHeaders(NextResponse.json({ 
      success: true, 
      message: "Product specifications updated and re-indexed smoothly!", 
      data: updatedProduct 
    }, { status: 200 }));

  } catch (error) {
    return applySecurityHeaders(NextResponse.json({ success: false, error: error.message }, { status: 500 }));
  }
}

// 2. DELETE: Clean execution deletion handler
export async function DELETE(request, { params }) {
  try {
    if (isRateLimited(request, { prefix: 'products-delete', limit: 20, windowMs: 60_000 })) {
      return createRateLimitResponse();
    }

    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token || token !== ADMIN_PASSWORD) {
      return applySecurityHeaders(
        NextResponse.json({ success: false, message: 'Unauthorized admin request.' }, { status: 401 })
      );
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const [deletedProduct] = await sql`
      DELETE FROM products 
      WHERE id = ${id}
      RETURNING id, name
    `;

    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: "Product record not found in dataset" }, { status: 404 });
    }

    return applySecurityHeaders(NextResponse.json({ 
      success: true, 
      message: `Product "${deletedProduct.name}" successfully deleted from archive.` 
    }, { status: 200 }));

  } catch (error) {
    return applySecurityHeaders(NextResponse.json({ success: false, error: error.message }, { status: 500 }));
  }
}