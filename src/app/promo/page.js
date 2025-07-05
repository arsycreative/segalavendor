"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Eye,
  MessageCircle,
  Gift,
  Sparkles,
  Calendar,
  Loader2,
} from "lucide-react";

export default function PromoPage() {
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch promos from API
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/promos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch promos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  // Transform API data to match component structure
  const transformImageToPromo = (image, index) => ({
    id: image.public_id || `promo-${index}`,
    image: image.secure_url || image.url,
    isHot: index < 2, // First 2 images are "hot"
    isNew: index === 0, // First image is "new"
    uploadDate: image.created_at || new Date().toISOString(),
    width: image.width,
    height: image.height,
    format: image.format,
    bytes: image.bytes,
    display_name: image.display_name,
  });

  // Split images into current and history (last 5 as current, rest as history)
  const currentPromos = images.slice(0, 5).map(transformImageToPromo);
  const historyPromos = images.slice(5).map(transformImageToPromo);

  const contactAboutPromo = (promo) => {
    const message = `Hai, saya tertarik dengan promo "${
      promo.display_name || "promo terkini"
    }". Bisakah Anda memberikan informasi lebih rinci?`;
    const whatsappUrl = `https://wa.me/62895622830815?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const viewPromoDetails = (promo) => {
    setSelectedPromo(promo);
  };

  const nextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  useEffect(() => {
    if (currentPromos.length === 0) return;

    const loadSwiper = async () => {
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css";
      document.head.appendChild(cssLink);

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";
      script.onload = () => {
        const swiper = new window.Swiper(".swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: currentPromos.length > 1,
          loopedSlides: currentPromos.length,
          autoplay:
            currentPromos.length > 1
              ? {
                  delay: 5000,
                  disableOnInteraction: false,
                }
              : false,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            768: {
              slidesPerView: Math.min(2, currentPromos.length),
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: Math.min(2.5, currentPromos.length),
              spaceBetween: 40,
            },
          },
          on: {
            slideChange: function () {
              setCurrentSlide(this.realIndex);
            },
          },
        });

        setSwiperInstance(swiper);
      };

      document.head.appendChild(script);
    };

    loadSwiper();

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
    };

    // ✅ Ignore lint warning for swiperInstance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPromos.length]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Memuat promo terkini...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-red-400 text-xl font-bold mb-2">
              Gagal Memuat Promo
            </h2>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Gift className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h2 className="text-white text-2xl font-bold mb-4">
            Belum Ada Promo
          </h2>
          <p className="text-gray-400 mb-8">Promo terbaru akan segera hadir!</p>
          <button
            onClick={() =>
              window.open(
                "https://wa.me/62895622830815?text=Hi, I want to upload a promo",
                "_blank"
              )
            }
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Upload Promo Pertama
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Custom Styles */}
      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .image-hover-overlay {
          background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.3)
          );
        }
        .swiper {
          padding: 20px 0;
        }
        .swiper-slide {
          height: auto;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin-top: -25px;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          transform: scale(1.2);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10" />
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&auto=format&fit=crop')",
            }}
          />
        </div>

        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Promo{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Terkini
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Swipe untuk melihat penawaran terbaik
            </p>

            <div className="flex justify-center items-center space-x-8 mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Promo Aktif
                </h3>
                <p className="text-4xl font-bold text-yellow-400">
                  {currentPromos.length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Promo Swiper */}
      {currentPromos.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="relative mx-auto">
              <div className="swiper">
                <div className="swiper-wrapper">
                  {currentPromos.map((promo, index) => (
                    <div key={promo.id} className="swiper-slide">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                      >
                        <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-2xl shadow-2xl">
                          <Image
                            src={promo.image}
                            fill
                            alt={promo.display_name || `Promo ${index + 1}`}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading={index === 0 ? "eager" : "lazy"}
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 image-hover-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => viewPromoDetails(promo)}
                                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
                              >
                                <Eye className="w-6 h-6" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => contactAboutPromo(promo)}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-3 rounded-full hover:shadow-lg transition-all"
                              >
                                <MessageCircle className="w-6 h-6" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="absolute top-4 left-4 space-y-2">
                            {promo.isHot && (
                              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                                <Sparkles className="w-3 h-3" />
                                <span>HOT</span>
                              </span>
                            )}
                            {promo.isNew && (
                              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                                <Gift className="w-3 h-3" />
                                <span>NEW</span>
                              </span>
                            )}
                          </div>

                          {/* Upload Date */}
                          <div className="absolute bottom-4 right-4">
                            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(promo.uploadDate).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Navigation - only show if more than 1 slide */}
                {currentPromos.length > 1 && (
                  <>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                  </>
                )}

                {/* Pagination */}
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* History Gallery */}
      {historyPromos.length > 0 && (
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Promo{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Sebelumnya
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                Lihat kembali promo-promo yang telah berlalu
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {historyPromos.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                  onClick={() => viewPromoDetails(promo)}
                >
                  <div className="relative h-32 overflow-hidden rounded-xl">
                    <Image
                      src={promo.image}
                      fill
                      alt={promo.display_name || `History Promo ${index + 1}`}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center space-x-1 text-white text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(promo.uploadDate).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-2xl p-12 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              Punya Promo Menarik?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Upload promo Anda dan jangkau lebih banyak pelanggan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg transition text-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/62895622830815?text=Hi, I want to upload a promo",
                    "_blank"
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Upload Promo</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-effect text-white font-semibold rounded-full border border-gray-600 hover:border-yellow-400 transition text-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/62895622830815?text=Hi, I need help with promo creation",
                    "_blank"
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Konsultasi</span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Detail Modal */}
      <AnimatePresence>
        {selectedPromo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPromo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-effect rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedPromo.image}
                  fill
                  alt={selectedPromo.display_name || "Promo Detail"}
                  className="object-contain"
                />
                <button
                  onClick={() => setSelectedPromo(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all text-xl font-bold w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {selectedPromo.display_name || "Promo Details"}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-300 text-sm">
                    <span>
                      {selectedPromo.width} × {selectedPromo.height}
                    </span>
                    <span>
                      {(selectedPromo.bytes / 1024 / 1024).toFixed(1)} MB
                    </span>
                    <span className="uppercase">{selectedPromo.format}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => contactAboutPromo(selectedPromo)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Tanyakan Detail</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
