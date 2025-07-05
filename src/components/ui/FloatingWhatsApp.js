"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen((open) => !open);

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        onClick={toggleChat}
      >
        <Phone size={28} />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleChat}
            />

            {/* WhatsApp Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Chat via WhatsApp</h3>
                <button onClick={toggleChat}>
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex-1">
                <p className="text-gray-700 mb-4">
                  Klik tombol di bawah untuk memulai obrolan:
                </p>
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/62895622830815?text=Halo, saya ingin bertanya tentang layanan Anda",
                      "_blank"
                    )
                  }
                  className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md transition"
                >
                  Mulai Chat WhatsApp
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
