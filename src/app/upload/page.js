"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Eye,
  Upload,
  Calendar,
  FileImage,
  Loader2,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";

export default function UploadPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/promos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const deleteImage = async (publicId) => {
    try {
      setDeleteLoading(publicId);
      const response = await fetch("/api/promos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.status}`);
      }

      // Remove from local state
      setImages(images.filter((img) => img.public_id !== publicId));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Failed to delete image:", err);
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle successful upload
  const handleUploadSuccess = (result) => {
    console.log("Upload successful:", result);
    setUploadSuccess(true);

    // Add new image to the beginning of the array
    const newImage = result.info;
    setImages([newImage, ...images]);

    // Hide success message after 3 seconds
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Success Toast */}
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Image uploaded successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Upload{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Promo
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Upload dan kelola gambar promo Anda
          </p>
        </div>

        {/* Upload Section */}
        <section className="mb-16">
          <div className="max-w-md mx-auto">
            <CldUploadWidget
              uploadPreset="sagala_vendor_preset"
              onSuccess={handleUploadSuccess}
              onError={(error) => console.error("Upload error:", error)}
            >
              {({ open }) => (
                <motion.button
                  onClick={() => open()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-lg">Upload Gambar Promo</span>
                </motion.button>
              )}
            </CldUploadWidget>
          </div>
        </section>

        {/* Images Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <FileImage className="w-6 h-6" />
              <span>Gambar Promo ({images.length})</span>
            </h2>
            <button
              onClick={fetchImages}
              disabled={loading}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-300">Loading images...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                <p className="text-red-300">{error}</p>
                <button
                  onClick={fetchImages}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && images.length === 0 && (
            <div className="text-center py-12">
              <FileImage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Belum ada gambar promo</p>
              <p className="text-gray-500">Upload gambar pertama Anda!</p>
            </div>
          )}

          {!loading && !error && images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={image.public_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative group h-48">
                    <Image
                      src={image.secure_url}
                      alt={image.display_name}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(image.public_id)}
                        disabled={deleteLoading === image.public_id}
                        className="bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-500 transition-all disabled:opacity-50"
                      >
                        {deleteLoading === image.public_id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 truncate">
                      {image.display_name}
                    </h3>

                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(image.created_at)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>
                          {image.width} × {image.height}
                        </span>
                        <span>{formatFileSize(image.bytes)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="uppercase text-xs bg-gray-700 px-2 py-1 rounded">
                          {image.format}
                        </span>
                        <span className="text-xs text-gray-500">
                          {image.public_id.substring(0, 10)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImage.secure_url}
                  alt={selectedImage.display_name}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-white text-xl font-bold mb-4">
                  {selectedImage.display_name}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Size:</span>
                    <span className="text-white ml-2">
                      {selectedImage.width} × {selectedImage.height}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">File Size:</span>
                    <span className="text-white ml-2">
                      {formatFileSize(selectedImage.bytes)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Format:</span>
                    <span className="text-white ml-2 uppercase">
                      {selectedImage.format}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white ml-2">
                      {formatDate(selectedImage.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">
                  Hapus Gambar?
                </h3>
                <p className="text-gray-300 mb-6">
                  Tindakan ini tidak dapat dibatalkan. Gambar akan dihapus
                  secara permanen.
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => deleteImage(showDeleteConfirm)}
                    disabled={deleteLoading === showDeleteConfirm}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {deleteLoading === showDeleteConfirm ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
