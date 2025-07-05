"use client";
import { motion } from "framer-motion";
import { MapPin, Truck, Clock, Shield } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";

export default function Coverage() {
  const areas = [
    "Jakarta",
    "Bogor",
    "Depok",
    "Tangerang",
    "Bekasi",
    "Bandung",
    "Semarang",
    "Yogyakarta",
    "Surabaya",
    "Malang",
    "Denpasar",
    "Ubud",
    "Sanur",
    "Seminyak",
    "Canggu",
  ];

  const features = [
    {
      icon: Truck,
      title: "Mobilitas Tinggi",
      description: "Tim siap bergerak ke seluruh wilayah Jawa-Bali",
    },
    {
      icon: Clock,
      title: "Respon Cepat",
      description: "Konsultasi dan penawaran dalam 24 jam",
    },
    {
      icon: Shield,
      title: "Terjamin",
      description: "Semua layanan bergaransi dan berstandar ISO",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Jangkauan <span className="text-yellow-400">Layanan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Melayani seluruh wilayah Pulau Jawa dan Bali dengan standar
            profesional yang sama
          </p>
        </AnimatedSection>

        {/* Map Visual */}
        <AnimatedSection className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-2xl p-8 relative overflow-hidden min-h-[300px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10">
                <div className="relative w-full h-full">
                  <Image
                    src="/coverage.jpeg"
                    alt="Indonesia Map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Foreground Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <MapPin className="w-12 h-12 text-yellow-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">JAWA - BALI</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {areas.map((area, index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-white/10 rounded-lg p-3 text-center cursor-pointer hover:bg-yellow-400/20 transition-all"
                    >
                      <span className="text-white font-medium">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.2}>
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect rounded-xl p-8 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <feature.icon className="w-8 h-8 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={1} className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-lg p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Butuh Layanan di Luar Area?
            </h3>
            <p className="text-gray-300 mb-6">
              Hubungi kami untuk konsultasi khusus wilayah di luar Jawa-Bali
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(255, 215, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg transition"
              onClick={() =>
                window.open(
                  "https://wa.me/62895622830815?text=Halo, saya butuh layanan di luar area Jawa-Bali",
                  "_blank"
                )
              }
            >
              Konsultasi Sekarang
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
