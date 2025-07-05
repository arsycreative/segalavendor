"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Award,
  Users,
  Lightbulb,
  Handshake,
  TrendingUp,
  Palette,
  Camera,
  Monitor,
  Megaphone,
  Star,
  CheckCircle,
} from "lucide-react";

export default function About() {
  const visionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to background position (parallax effect)
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const services = [
    {
      category: "AGENSI",
      icon: Megaphone,
      items: [
        "Manajemen Pemasaran Digital",
        "Strategi dan Perencanaan",
        "Manajemen Pemasaran Kreatif",
        "Aktivasi Merek",
      ],
    },
    {
      category: "DESAIN",
      icon: Palette,
      items: [
        "Branding dan Identitas Perusahaan",
        "Materi Pemasaran dan Penjualan",
        "Iklan Cetak dan Online",
        "Desain Informasi dan Editorial",
      ],
    },
    {
      category: "ACARA",
      icon: Star,
      items: [
        "Acara Aktivasi Merek",
        "Kampanye Acara Kreatif",
        "Program Korporat",
        "Program Acara",
      ],
    },
    {
      category: "DIGITAL",
      icon: Monitor,
      items: [
        "Pengembangan Website",
        "Pembuatan Video",
        "Desain 3D",
        "Fotografi",
      ],
    },
  ];

  const missions = [
    {
      title: "Meningkatkan Kreativitas dan Inovasi",
      description:
        "Mengembangkan ide-ide kreatif dan solusi inovatif untuk memenuhi kebutuhan pelanggan.",
      icon: Lightbulb,
    },
    {
      title: "Membangun Kualitas dan Profesionalisme",
      description:
        "Meningkatkan kualitas layanan dan produk melalui pelatihan dan pengembangan sumber daya manusia.",
      icon: Award,
    },
    {
      title: "Meningkatkan Kepuasan Pelanggan",
      description:
        "Memberikan layanan yang berkualitas tinggi dan responsif untuk memenuhi kebutuhan pelanggan.",
      icon: Users,
    },
    {
      title: "Mengembangkan Industri Kreatif",
      description:
        "Berkontribusi pada pengembangan industri kreatif di Indonesia melalui kerjasama dan inovasi.",
      icon: Handshake,
    },
    {
      title: "Meningkatkan Nilai Perusahaan",
      description:
        "Meningkatkan nilai perusahaan melalui pertumbuhan yang berkelanjutan dan pengelolaan sumber daya yang efektif.",
      icon: TrendingUp,
    },
  ];

  const stats = [
    { number: "10+", label: "Tahun Pengalaman" },
    { number: "500+", label: "Proyek Selesai" },
    { number: "100+", label: "Klien Puas" },
    { number: "50+", label: "Talenta Profesional" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/80 z-10" />
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/about.jpg')",
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

        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              <span className="text-white">TENTANG </span>
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                KAMI
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl md:text-3xl text-yellow-400 font-bold mb-4"
            >
              ONE STOP SOLUTION FOR YOUR BUSINESS
            </motion.p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Kami adalah Solusi Bagi perusahaan anda Dalam Memaksimalkan
              pemasaran melalui
              <span className="text-yellow-400 font-semibold">
                {" "}
                Creative & Digital Marketing Strategy{" "}
              </span>
              yang efektif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <div className="glass-effect rounded-xl p-6 hover-lift">
                  <h3 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-white font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              OUR <span className="text-yellow-400">CREATIVE SERVICE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Layanan kreatif terlengkap untuk semua kebutuhan bisnis Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect rounded-xl p-8 text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow"
                >
                  <service.icon className="w-10 h-10 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 group-hover:text-white transition-colors">
                  {service.category}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-300 group-hover:text-white transition-colors flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section with Scrolling Background */}
      <section ref={visionRef} className="py-20 relative overflow-hidden">
        {/* Scrolling Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/70 to-black/80 z-10" /> */}
          <div
            className="w-full h-[120%] bg-cover bg-center"
            style={{
              backgroundImage: "url('/earth.png",
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-effect rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-black/40 border border-yellow-400/30">
              <div className="flex items-center mb-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-6 shadow-lg shadow-yellow-400/30"
                >
                  <Target className="w-8 h-8 text-black" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  <span className="text-yellow-400">VISION</span>
                </h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-100 leading-relaxed font-medium"
              >
                Menjadi perusahaan Kreatif terdepan di Indonesia, yang
                memberikan solusi inovatif dan berkualitas tinggi untuk memenuhi
                kebutuhan pelanggan, serta menjadi inspirasi bagi industri
                kreatif.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              OUR <span className="text-yellow-400">MISSION</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect rounded-xl p-8 group h-full"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-black font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    <mission.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {mission.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Siap Berkolaborasi{" "}
              <span className="text-yellow-400">Bersama Kami?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Mari wujudkan visi bisnis Anda dengan solusi kreatif terbaik dari
              tim profesional kami
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
                    "https://wa.me/62895622830815?text=Halo, saya tertarik untuk berkolaborasi dengan Bintang Creative Nusantara",
                    "_blank"
                  )
                }
              >
                Mulai Konsultasi
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
