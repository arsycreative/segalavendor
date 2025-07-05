"use client";
import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, Heart, Zap } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";

export default function WhyUs() {
  const reasons = [
    {
      icon: Award,
      title: "Pengalaman 10+ Tahun",
      description:
        "Berpengalaman menangani berbagai event dari skala kecil hingga nasional",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description:
        "Talent dan crew terpilih dengan kemampuan dan attitude terbaik",
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: Clock,
      title: "Tepat Waktu",
      description:
        "Komitmen tinggi terhadap deadline dan jadwal yang telah disepakati",
      color: "from-green-400 to-teal-500",
    },
    {
      icon: Shield,
      title: "Terpercaya & Bergaransi",
      description:
        "Semua layanan dilindungi asuransi dan bergaransi kepuasan 100%",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Heart,
      title: "Pelayanan Prima",
      description:
        "Customer service 24/7 siap membantu kebutuhan Anda kapan saja",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: Zap,
      title: "One Stop Solution",
      description:
        "Solusi lengkap dari konsep hingga eksekusi event dalam satu tempat",
      color: "from-indigo-400 to-cyan-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Mengapa Memilih <span className="text-yellow-400">Kami?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kepercayaan ribuan klien adalah bukti komitmen kami terhadap
            kualitas dan profesionalisme
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <AnimatedSection key={reason.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect rounded-xl p-8 text-center group h-full"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 bg-gradient-to-r ${reason.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow`}
                >
                  <reason.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  {reason.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonial Section */}
        <AnimatedSection delay={0.8} className="mt-20">
          <div className="glass-effect rounded-2xl p-8 md:p-12 text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Award className="w-8 h-8 text-yellow-400 mx-1" />
                    </motion.div>
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-8">
                  &ldquo;Bintang Creative Nusantara selalu memberikan yang
                  terbaik. Event kami sukses berkat profesionalisme tim
                  mereka.&rdquo;
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/profile.jpeg"
                      alt="Client"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Budi Santoso</p>
                    <p className="text-gray-400">
                      Marketing Director, PT. Maju Jaya
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
