import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// ✅ Explicit configuration using individual secure keys
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: "No file target found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload directly to Cloudinary folder branch
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'shomicore_products',
      resource_type: 'image',
    });

    return NextResponse.json({ 
      success: true, 
      url: uploadResult.secure_url 
    }, { status: 200 });

  } catch (error) {
    console.error("❌ CRITICAL CLOUDINARY ENGINE UPLOAD CRASH DETECTED:");
    console.error(error);

    return NextResponse.json({ 
      success: false, 
      error: error.message || "Cloudinary authentication issue." 
    }, { status: 500 });
  }
}
