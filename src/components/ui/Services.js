"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShoppingCart, Users, Wrench, Heart } from "lucide-react";
import { servicesData } from "@/data/services";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("manpower");

  const categories = [
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

  const addToCart = (service) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === service.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...service, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    // Show notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 glass-effect rounded-lg p-4 text-white z-50";
    notification.innerHTML = `✅ ${service.name} ditambahkan ke keranjang`;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Layanan <span className="text-yellow-400">Profesional</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Solusi lengkap untuk kebutuhan event, talent, dan produksi Anda
          </p>
        </AnimatedSection>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`
      flex items-center space-x-3 px-6 py-3 rounded-full font-bold transition-all
      ${
        activeCategory === category.id
          ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg"
          : "glass-effect text-white hover:text-yellow-400"
      }
    `}
            >
              <category.icon size={20} />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {servicesData[activeCategory].map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className="glass-effect rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                      {service.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">
                      {service.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(service);
                      }}
                      className="bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors"
                    >
                      {/* <Plus size={16} /> */}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatedSection delay={1} className="text-center mt-16">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg transition"
            onClick={() =>
              window.open(
                "https://wa.me/62895622830815?text=Halo, saya ingin konsultasi tentang layanan Bintang Creative Nusantara",
                "_blank"
              )
            }
          >
            Konsultasi Gratis Sekarang
          </motion.button>
        </AnimatedSection>
      </div>
    </section>
  );
}
