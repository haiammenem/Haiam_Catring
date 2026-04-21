import { motion } from "framer-motion";

export default function LoadingScreen({ dark }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={
        (dark
          ? "bg-gradient-to-br from-[#0f0f1a] to-[#141427]"
          : "bg-gradient-to-br from-[#f0f9ff] to-[#fdf2f8]") +
        " fixed inset-0 flex flex-col items-center justify-center z-[100]"
      }
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className={
            (dark ? "bg-purple-600/20" : "bg-sky-300/30") +
            " absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full blur-[120px]"
          }
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className={
            (dark ? "bg-blue-600/20" : "bg-pink-300/30") +
            " absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[120px]"
          }
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8 relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={
            (dark ? "border-purple-500/40" : "border-indigo-400/40") +
            " absolute inset-0 rounded-full border-2"
          }
        />
        <img
          src="/portfolio.png"
          alt="Loading..."
          className={
            (dark ? "border-white/20" : "border-gray-300") +
            " w-38 h-38 object-contain rounded-full border-2"
          }
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center space-y-4"
      >
        <h1
          className={
            (dark ? "text-white" : "text-gray-900") +
            " text-4xl md:text-5xl font-bold"
          }
        >
          Omar Abdelmonem
        </h1>
        <p
          className={
            (dark ? "text-gray-300" : "text-gray-600") +
            " text-lg font-medium"
          }
        >
          Software Engineer (Flutter & Web)
        </p>
      </motion.div>

      {/* Loading Dots */}
      <motion.div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={
              (dark ? "bg-purple-500" : "bg-indigo-500") +
              " w-3 h-3 rounded-full"
            }
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}