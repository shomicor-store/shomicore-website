import sql from '@/lib/db';
import { NextResponse } from 'next/server';

function generateSlug(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// ⚡ SECURITY GUARD HOOK: Validates authorization headers against secret server env variables
function validateAdminAuthorization(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;

  // Reads your hidden production password from Vercel env settings
  const serverSecretMasterKey = process.env.ADMIN_PASSWORD;
  
  // 🚀 THE FIX: Check if the token matches your live Vercel password OR your local 'shomicore123' key!
  const isLivePassCorrect = serverSecretMasterKey ? authHeader === `Bearer ${serverSecretMasterKey}` : false;
  const isLocalPassCorrect = authHeader === 'Bearer shomicore123';

  // If either the live password matches or the local password matches, let the admin proceed!
  return isLivePassCorrect || isLocalPassCorrect;
}


// 1. PUT: Clean execution update mapper matching frontend JSON keys safely
export async function PUT(request, { params }) {
  try {
    // 🚀 THE SECURITY FIX: Interrupt transaction instantly if header token mismatches
    if (!validateAdminAuthorization(request)) {
      return NextResponse.json({ success: false, message: "Unauthorized admin request parameters." }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();

    const { 
      name, description, price, parentCategory, subCategoryId, 
      images, colors, sizingType, availableSizes, isFeatured 
    } = body;

    if (!name || !price || !parentCategory) {
      return NextResponse.json({ success: false, message: "Missing core operational parameter fields" }, { status: 400 });
    }

    const slug = generateSlug(name);

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

    return NextResponse.json({ success: true, message: "Product updated successfully!", data: updatedProduct }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. DELETE: Clean execution deletion handler
export async function DELETE(request, { params }) {
  try {
    // 🚀 THE SECURITY FIX: Interrupt transaction instantly if header token mismatches
    if (!validateAdminAuthorization(request)) {
      return NextResponse.json({ success: false, message: "Unauthorized admin request parameters." }, { status: 401 });
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

    return NextResponse.json({ 
      success: true, 
      message: `Product "${deletedProduct.name}" successfully deleted from archive.` 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
