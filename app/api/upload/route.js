import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { applySecurityHeaders, createRateLimitResponse, isAdminAuthenticated, isRateLimited } from '@/lib/security';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shomicore123';

// ✅ Explicit configuration using individual secure keys
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    if (isRateLimited(request, { prefix: 'upload', limit: 20, windowMs: 60_000 })) {
      return createRateLimitResponse();
    }

    if (!isAdminAuthenticated(request)) {
      return applySecurityHeaders(
        NextResponse.json({ success: false, message: 'Unauthorized upload request.' }, { status: 401 })
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return applySecurityHeaders(NextResponse.json({ success: false, message: "No file target found" }, { status: 400 }));
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload directly to Cloudinary folder branch
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'shomicore_products',
      resource_type: 'image',
    });

    return applySecurityHeaders(NextResponse.json({ 
      success: true, 
      url: uploadResult.secure_url 
    }, { status: 200 }));

  } catch (error) {
    console.error("❌ CRITICAL CLOUDINARY ENGINE UPLOAD CRASH DETECTED:");
    console.error(error);

    return applySecurityHeaders(NextResponse.json({ 
      success: false, 
      error: error.message || "Cloudinary authentication issue." 
    }, { status: 500 }));
  }
}
