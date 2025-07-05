"use client";
import { motion } from "framer-motion";
import { ChevronDown, Star, Award, Users } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-10" />
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&auto=format&fit=crop')",
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-20 h-20 gold-gradient rounded-full opacity-20"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-40 right-20 w-16 h-16 silver-gradient rounded-full opacity-20"
      />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 sm:mb-8"
        >
          <div className="mb-4 sm:mb-6 flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo Bintang Creative Nusantara"
              width={320}
              height={100}
              className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 object-contain"
              priority
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
              <strong className="text-white">
                PT. BINTANG CREATIVE NUSANTARA
              </strong>
            </p>
            <p className="text-base sm:text-lg text-yellow-400 italic mt-2">
              Menciptakan Momen yang Berarti
            </p>
          </motion.div>
        </motion.div>

        {/* Stats - Fixed Mobile Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8 sm:mb-12"
        >
          {/* Mobile: Triangle layout - two on top, one below */}
          <div className="flex flex-col gap-3 sm:hidden">
            {/* Top row: Talent and Events side by side */}
            <div className="flex gap-3 px-4">
              <div className="glass-effect rounded-lg p-3 flex-1">
                <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">500+</h3>
                <p className="text-xs text-gray-300">Talent Profesional</p>
              </div>
              <div className="glass-effect rounded-lg p-3 flex-1">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">1000+</h3>
                <p className="text-xs text-gray-300">Event Sukses</p>
              </div>
            </div>
            {/* Bottom row: Partners centered */}
            <div className="px-8">
              <div className="glass-effect rounded-lg p-3">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">100+</h3>
                <p className="text-xs text-gray-300">Partner Perusahaan</p>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop: Horizontal layout */}
          <div className="hidden sm:flex justify-center gap-4 flex-wrap">
            <div className="glass-effect rounded-lg p-5 md:p-6 flex-1 max-w-xs">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                500+
              </h3>
              <p className="text-base text-gray-300">Talent Profesional</p>
            </div>
            <div className="glass-effect rounded-lg p-5 md:p-6 flex-1 max-w-xs">
              <Award className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                1000+
              </h3>
              <p className="text-base text-gray-300">Event Sukses</p>
            </div>
            <div className="glass-effect rounded-lg p-5 md:p-6 flex-1 max-w-xs">
              <Star className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                100+
              </h3>
              <p className="text-base text-gray-300">Partner Perusahaan</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg transition text-base sm:text-lg w-full sm:w-auto"
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Jelajahi Layanan
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 glass-effect text-white font-bold rounded-full text-base sm:text-lg border border-gray-400 hover:border-yellow-400 transition-colors w-full sm:w-auto"
            onClick={() =>
              window.open(
                "https://wa.me/62895622830815?text=Halo, saya tertarik dengan layanan Bintang Creative Nusantara",
                "_blank"
              )
            }
          >
            Konsultasi Gratis
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-yellow-400 transition-colors"
        onClick={scrollToNext}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
