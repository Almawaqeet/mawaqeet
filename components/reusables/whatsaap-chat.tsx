"use client"
import { motion } from "framer-motion"
import { IoLogoWhatsapp } from "react-icons/io5"
const WhatsaapChat = () => {
    return (
        <a
        href="https://wa.me/2348074456704"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed xmd:bottom-16 sm:bottom-28 right-4 sm:right-8 px-6 sm:px-8 py-3 sm:py-4 bg-brand-color text-white rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2 sm:gap-3 hover:bg-brand-color/90 transition-all duration-300 z-50"
        >
            <IoLogoWhatsapp className="w-6 h-6 text-brand-color-subtle" />
            <span className="font-semibold text-base sm:text-lg">Chat</span>
        </motion.button>
        </a>
    )
}

export default WhatsaapChat;