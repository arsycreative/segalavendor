"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ShoppingCart,
  Users,
  Wrench,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Filter,
} from "lucide-react";
import { servicesData } from "@/data/services";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    {
      id: "all",
      name: "SEMUA LAYANAN",
      icon: Filter,
      color: "from-gray-500 to-gray-700",
    },
    {
      id: "manpower",
      name: "MANPOWER",
      icon: Users,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "produksi",
      name: "PRODUKSI",
      icon: Wrench,
      color: "from-green-500 to-teal-600",
    },
    {
      id: "jasaLainnya",
      name: "JASA LAINNYA",
      icon: Heart,
      color: "from-pink-500 to-red-600",
    },
  ];

  const getAllServices = () => {
    const allServices = [];
    Object.keys(servicesData).forEach((category) => {
      allServices.push(...servicesData[category]);
    });
    return allServices;
  };

  const getFilteredServices = () => {
    if (activeCategory === "all") {
      return getAllServices();
    }
    return servicesData[activeCategory] || [];
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10" />
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/services-bg.png')",
            }}
          />
        </div>

        <div className="relative z-20 container mx-auto px-4">
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Layanan{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Profesional
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
              Solusi lengkap untuk kebutuhan event, talent, dan produksi dengan
              standar internasional
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-effect rounded-lg p-6 text-center">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                  500+
                </h3>
                <p className="text-gray-300">Talent Tersedia</p>
              </div>
              <div className="glass-effect rounded-lg p-6 text-center">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">50+</h3>
                <p className="text-gray-300">Jenis Layanan</p>
              </div>
              <div className="glass-effect rounded-lg p-6 text-center">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                  24/7
                </h3>
                <p className="text-gray-300">Support</p>
              </div>
              <div className="glass-effect rounded-lg p-6 text-center">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                  100%
                </h3>
                <p className="text-gray-300">Bergaransi</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    flex items-center space-x-3 px-8 py-4 rounded-full font-bold transition-all
                    ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-2xl"
                        : "glass-effect text-white hover:text-yellow-400 border border-gray-600 hover:border-yellow-400"
                    }
                  `}
                >
                  <category.icon size={20} />
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {getFilteredServices().map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="glass-effect rounded-2xl overflow-hidden group cursor-pointer border border-gray-700 hover:border-yellow-400 transition-all duration-300"
                  onClick={() => openServiceModal(service)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        {service.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs">4.9</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-yellow-400 font-bold text-lg">
                        {service.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {" "}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors justify-items-end"
                      >
                        <ArrowRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA Section */}
          <AnimatedSection delay={1} className="text-center mt-20">
            <div className="glass-effect rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">
                Tidak Menemukan Layanan yang Anda Cari?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Kami menyediakan layanan custom sesuai kebutuhan spesifik Anda.
                Konsultasi gratis dengan tim profesional kami sekarang!
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg transition text-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/62895622830815?text=Halo, saya ingin konsultasi tentang layanan custom Bintang Creative Nusantara",
                    "_blank"
                  )
                }
              >
                Konsultasi Gratis Sekarang
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {showModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image
                  src={selectedService.image}
                  alt={selectedService.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedService.name}
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {selectedService.category.toUpperCase()}
                  </span>
                  <span className="text-yellow-400 font-bold text-xl">
                    {selectedService.price}
                  </span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass-effect rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Durasi</h4>
                    <p className="text-gray-300">Sesuai kebutuhan</p>
                  </div>
                  <div className="glass-effect rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Garansi</h4>
                    <p className="text-gray-300">100% Puas</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open(
                        `https://wa.me/62895622830815?text=Halo, saya tertarik dengan layanan ${selectedService.name} dari Bintang Creative Nusantara`,
                        "_blank"
                      );
                      setShowModal(false);
                    }}
                    className="flex-1 glass-effect text-white font-semibold py-3 rounded-full border border-gray-600 hover:border-yellow-400 transition-all"
                  >
                    Konsultasi Langsung
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
