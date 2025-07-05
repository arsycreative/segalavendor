"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: "/layanan/mc.jpeg",
      title: "Corporate Event",
      category: "Event",
    },
    {
      id: 2,
      src: "/layanan/JASAMUA.jpeg",
      title: "Wedding Package & Decoration",
      category: "Wedding",
    },
    {
      id: 3,
      src: "/layanan/PanggungFullRingging.jpeg",
      title: "Concert Stage",
      category: "Concert",
    },
    {
      id: 4,
      src: "/layanan/PRODUKSIBOOTHEVENT.jpeg",
      title: "Exhibition Booth",
      category: "Exhibition",
    },
    {
      id: 5,
      src: "/layanan/DJFDJ.jpeg",
      title: "DJ Performance",
      category: "Entertainment",
    },
    {
      id: 6,
      src: "/layanan/SOUNDSYSTEM.jpeg",
      title: "Live Music",
      category: "Music",
    },
    {
      id: 7,
      src: "/layanan/DANCE.jpeg",
      title: "Dance Performance",
      category: "Performance",
    },
    {
      id: 8,
      src: "/layanan/KOLINFLUENCE.jpeg",
      title: "Influencer",
      category: "Influencer",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Galeri <span className="text-yellow-400">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lihat berbagai event dan project yang telah kami kerjakan dengan
            hasil yang memukau
          </p>
        </AnimatedSection>

        {/* Main Slider */}
        <AnimatedSection className="mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="gallery-swiper"
          >
            {galleryImages.map((image) => (
              <SwiperSlide key={image.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-xl h-64 group">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                      <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {galleryImages.map((image, index) => (
            <AnimatedSection key={image.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="relative group cursor-pointer h-20"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover rounded-lg group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={800}
                  height={600} // bisa rasio asli gambar
                  className="w-[800px] h-auto object-contain"
                />

                <div className="p-6 bg-gradient-to-r from-gray-900 to-black text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedImage.title}
                  </h3>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedImage.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatedSection delay={1} className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 gold-gradient text-black font-bold rounded-full text-lg"
            onClick={() =>
              window.open(
                "https://wa.me/62895622830815?text=Halo, saya ingin melihat portfolio lengkap Bintang Creative Nusantara",
                "_blank"
              )
            }
          >
            Lihat Portfolio Lengkap
          </motion.button>
        </AnimatedSection>
      </div>
    </section>
  );
}
