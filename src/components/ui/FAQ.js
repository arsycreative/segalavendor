"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CreditCard,
  MapPin,
  Users,
  Award,
  Headphones,
} from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const faqData = [
    {
      id: 1,
      icon: Phone,
      question: "Bagaimana cara melakukan pemesanan layanan event organizer?",
      answer:
        "Untuk melakukan pemesanan, Anda dapat menghubungi bagian penjualan kami melalui WhatsApp di +62 895-6228-30815, email, atau formulir kontak di website. Sebutkan detail produk/layanan yang Anda butuhkan, jumlahnya, lokasi event, tanggal pelaksanaan, dan budget yang tersedia. Tim kami akan memberikan konsultasi gratis dan penawaran terbaik dalam 24 jam.",
      category: "pemesanan",
    },
    {
      id: 2,
      icon: CreditCard,
      question:
        "Bagaimana cara melakukan pembayaran untuk sewa alat dan vendor?",
      answer:
        "Pembayaran dapat dilakukan melalui transfer bank, kartu kredit, atau metode pembayaran digital lainnya yang disepakati. Kami menerima pembayaran bertahap: DP 50% saat kontrak ditandatangani, dan pelunasan sebelum hari H event. Semua transaksi dilindungi dengan invoice resmi dan garansi kepuasan 100%.",
      category: "pembayaran",
    },
    {
      id: 3,
      icon: Headphones,
      question:
        "Bagaimana cara menghubungi customer service jika ada pertanyaan?",
      answer:
        "Anda dapat menghubungi kami 24/7 melalui WhatsApp atau email. Tim customer service kami siap membantu konsultasi gratis, memberikan penawaran, dan support teknis kapan saja.",
      category: "layanan",
    },
    {
      id: 4,
      icon: MapPin,
      question:
        "Wilayah mana saja yang dilayani oleh agency event organizer ini?",
      answer:
        "Bintang Creative Nusantara melayani seluruh wilayah Pulau Jawa dan Bali termasuk Jakarta, Bogor, Depok, Tangerang, Bekasi, Bandung, Semarang, Yogyakarta, Surabaya, Malang, Denpasar, Ubud, Sanur, Seminyak, dan Canggu. Untuk wilayah luar Jawa-Bali, kami menyediakan layanan khusus dengan konsultasi terlebih dahulu.",
      category: "coverage",
    },
    {
      id: 5,
      icon: Users,
      question:
        "Apa saja layanan yang tersedia untuk event corporate dan wedding?",
      answer:
        "Kami menyediakan layanan lengkap meliputi: 1) Manpower (MC, Host, Model, Talent, Crew Event, Security), 2) Produksi (Sound System, Lighting, Panggung, Dekorasi, Catering), 3) Jasa Lainnya (Dokumentasi, Live Streaming, Entertainment, Wedding Package). Semua layanan dapat disesuaikan dengan kebutuhan dan budget Anda.",
      category: "layanan",
    },
    {
      id: 6,
      icon: Clock,
      question: "Berapa lama waktu persiapan yang dibutuhkan untuk event?",
      answer:
        "Waktu persiapan bervariasi tergantung skala event: Event kecil (50-100 orang) minimal 2 minggu, event sedang (100-500 orang) minimal 1 bulan, event besar (500+ orang) minimal 2-3 bulan. Namun, kami juga melayani urgent event dengan tambahan biaya express. Konsultasi gratis tersedia untuk perencanaan timeline yang optimal.",
      category: "persiapan",
    },
    {
      id: 7,
      icon: Award,
      question: "Apakah ada garansi untuk layanan yang diberikan?",
      answer:
        "Ya, semua layanan kami dilindungi dengan garansi kepuasan 100%. Jika ada kendala teknis atau ketidaksesuaian dengan kontrak, kami akan memberikan kompensasi atau perbaikan gratis. Semua equipment disertai asuransi, dan tim backup siap standby untuk memastikan event berjalan lancar tanpa gangguan.",
      category: "garansi",
    },
    {
      id: 8,
      icon: CreditCard,
      question: "Apakah tersedia paket bundling untuk menghemat budget?",
      answer:
        "Ya, kami menyediakan berbagai paket bundling yang dapat menghemat budget hingga 30%. Paket Wedding All-in-One, Corporate Event Package, dan Birthday Party Package tersedia dengan harga spesial. Semakin banyak layanan yang diambil, semakin besar diskon yang diberikan. Konsultasi gratis untuk paket terbaik sesuai kebutuhan Anda.",
      category: "paket",
    },
    {
      id: 9,
      icon: Phone,
      question: "Apakah bisa melakukan survey lokasi sebelum event?",
      answer:
        "Tentu saja! Survey lokasi gratis disediakan untuk semua klien dalam radius Jabodetabek. Untuk wilayah luar, survey dapat dilakukan dengan biaya transport sesuai jarak. Tim teknis kami akan mengecek kondisi venue, kebutuhan power, akses loading, dan aspek teknis lainnya untuk memastikan setup optimal pada hari H.",
      category: "survey",
    },
    {
      id: 10,
      icon: MessageCircle,
      question: "Bagaimana sistem komunikasi selama event berlangsung?",
      answer:
        "Kami menggunakan sistem komunikasi terintegrasi dengan coordinator khusus untuk setiap event. Klien akan mendapat contact person yang dapat dihubungi 24/7 selama event. Tim menggunakan radio komunikasi untuk koordinasi real-time, dan ada grup WhatsApp khusus untuk update progress kepada klien secara berkala.",
      category: "komunikasi",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredFaqData =
    selectedCategory === "Semua"
      ? faqData
      : faqData.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Pertanyaan <span className="text-yellow-400">Umum</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan seputar layanan event organizer,
            vendor, agency, dan sewa alat terlengkap
          </p>
        </AnimatedSection>

        {/* FAQ Categories */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Semua", "Pemesanan", "Pembayaran", "Layanan", "Garansi"].map(
              (category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 glass-effect rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-yellow-400 text-black"
                      : "text-white hover:text-yellow-400"
                  }`}
                >
                  {category}
                </motion.button>
              )
            )}
          </div>
        </AnimatedSection>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqData.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-lg font-semibold text-white flex-1">
                        {item.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 ml-16">
                          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-6">
                            <p className="text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
