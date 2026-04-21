import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact({ contactMeRef }) {
  return (
    <motion.section
      ref={contactMeRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center space-y-8"
    >
      <h2 className="text-3xl font-bold">Contact</h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center opacity-80">
        <div className="flex items-center gap-2">
          <Mail size={18} />
          omarabdelmonem91@gmail.com
        </div>

        <div className="flex items-center gap-2">
          <Phone size={18} />
          +201093818755
        </div>
      </div>

      <div className="flex gap-6 justify-center items-center mt-6">
        <a
          href="http://www.linkedin.com/in/omar-monem2002"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-400 hover:bg-gray-200 dark:border-white/30 dark:hover:bg-white/10 transition-colors flex items-center justify-center group"
          aria-label="LinkedIn"
        >
          <Linkedin
            size={24}
            className="group-hover:text-blue-500 transition-colors"
          />
        </a>
        <a
          href="https://github.com/OmarMonem02"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-400 hover:bg-gray-200 dark:border-white/30 dark:hover:bg-white/10 transition-colors flex items-center justify-center group"
          aria-label="GitHub"
        >
          <Github
            size={24}
            className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
          />
        </a>
      </div>
    </motion.section>
  );
}
