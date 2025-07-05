// app/api/promos/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "diet0axoq",
  api_key: "156223365426895",
  api_secret: "Qy2cy2TXmYJDbyF-98P9BPSi5mw",
});

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "", // or set a folder e.g., 'promo-images/'
      resource_type: "image",
      max_results: 50,
    });

    return NextResponse.json(result.resources);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result === "ok") {
      return NextResponse.json({
        success: true,
        message: "Image deleted successfully",
        result,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to delete image", details: result },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Error deleting image:", err);
    return NextResponse.json(
      { error: "Failed to delete image", details: err.message },
      { status: 500 }
    );
  }
}
