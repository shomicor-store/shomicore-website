import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'fs';

// 🚀 Core metadata options: Set dimension profiles exactly to standard high-end browser icons scales
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  try {
    // ⚡ THE FIX: Safely reads the binary image buffer from your public folder path
    const filePath = path.join(process.cwd(), 'public', 'shomicor_logo.png');
    const imageBuffer = fs.readFileSync(filePath);
    
    // Convert array buffers cleanly to pass safely down browser header streams
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifycontent: 'center', background: 'transparent' }}>
          <img src={base64Image} width="32" height="32" alt="Shomicor Icon" />
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    console.error("Favicon asset buffering pipeline bypassed:", error);
    // Safe standard fallback fallback if data reading locks during build compilation steps
    return new Response("Icon Error", { status: 500 });
  }
}
