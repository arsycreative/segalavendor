"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
  ];

  const quickLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Layanan", href: "/services" },
    { name: "Promo", href: "/promo" },
  ];

  const services = [
    "Manpower & Talent",
    "Event Production",
    "Wedding Decoration",
    "Sound & Lighting",
    "Photography",
    "Catering Service",
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/bcn-logo.png"
                alt="Logo PT Bintang Creative Nusantara"
                width={120}
                height={120}
                priority
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Menciptakan moment yang berarti melalui layanan profesional di
              bidang event, talent, dan produksi dengan jangkauan seluruh
              Jawa-Bali.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`text-gray-400 transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Menu Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Layanan Kami
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Kontak Kami
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Blk. A, Jl. Boulevard Artha Gading Blok A No.5-7,
                    RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara,
                    Daerah Khusus Ibukota Jakarta 14240, Indonesia.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="tel:+628123456789"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  0895-6228-30815
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="mailto:bintangcreativenusantara@gmail.com"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  bintangcreativenusantara@gmail.com
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(255, 215, 0, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-lg shadow-lg transition"
              onClick={() =>
                window.open(
                  "https://wa.me/62895622830815?text=Halo, saya ingin konsultasi dengan Bintang Creative Nusantara",
                  "_blank"
                )
              }
            >
              Konsultasi Gratis
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2018 PT. Bintang Creative Nusantara. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Menciptakan Moment Yang Berarti
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
