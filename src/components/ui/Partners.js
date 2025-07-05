"use client";
import { motion } from "framer-motion";
import { partnersData } from "@/data/services";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";

export default function Partners() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Partner <span className="text-yellow-400">Terpercaya</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dipercaya oleh perusahaan-perusahaan terkemuka di Indonesia
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6">
          {partnersData.map((partner, index) => (
            <AnimatedSection key={partner.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.1, y: -10 }}
                className="glass-effect rounded-lg p-6 text-center group cursor-pointer"
              >
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 rounded-full"
                  />
                </div>
                <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                  {partner.name}
                </h3>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.8} className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block glass-effect rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Bergabung dengan 100+ Perusahaan Lainnya
            </h3>
            <p className="text-gray-300 mb-6">
              Jadilah bagian dari klien yang puas dengan layanan profesional
              kami
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
                  "https://wa.me/62895622830815?text=Halo, saya ingin bermitra dengan Bintang Creative Nusantara",
                  "_blank"
                )
              }
            >
              Hubungi Kami
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
