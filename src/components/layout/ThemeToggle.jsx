import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ dark, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      animate={{ rotate: dark ? 0 : 180 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border border-white/20 bg-white/10 shadow-lg"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
}