import { motion } from "framer-motion";

export default function Hero({ dark, yHero, projectsRef, contactMeRef }) {
  return (
    <motion.section
      style={{ y: yHero }}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[55vh]"
    >
      {/* RIGHT SIDE - PROFILE */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] rounded-full border border-indigo-500/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-indigo-500/10 blur-[100px]" />

          <div
            className={
              (dark
                ? "bg-white/5 border-white/10"
                : "bg-white/70 border-gray-200") +
              " relative w-[300px] h-[300px] rounded-full border backdrop-blur-xl shadow-xl flex items-center justify-center"
            }
          >
            <img
              src="/profile.png"
              alt="Omar Abdelmonem"
              className="w-[260px] h-[260px] object-cover rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* LEFT SIDE - TEXT */}
      <div className="space-y-8 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Omar Abdelmonem Mohamed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg opacity-70"
        >
          Software Engineer (Flutter & Web)
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start"
        >
          <button
            onClick={() =>
              projectsRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="px-6 py-2 rounded-2xl font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
          >
            View Projects
          </button>

          <button
            onClick={() =>
              contactMeRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className={
              (dark
                ? "border border-white/30 hover:bg-white/10"
                : "border border-gray-400 hover:bg-gray-200") +
              " px-6 py-2 rounded-2xl font-medium transition"
            }
          >
            Contact Me
          </button>

          <button
            onClick={() =>
              window.open("/Omar%20Abdelmonem%20Mohamed.pdf", "_blank")
            }
            className="px-6 py-2 rounded-2xl font-medium bg-gray-800 text-white shadow-lg"
          >
            View CV
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
