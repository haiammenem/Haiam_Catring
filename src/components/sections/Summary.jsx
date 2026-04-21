import { motion } from "framer-motion";

export default function Summary({ dark }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold">
          Professional Summary
        </h2>
        <div className="w-79 h-[3px] bg-indigo-500 rounded-full mt-2" />
      </div>

      <div
        className={
          (dark
            ? "bg-white/5 border-white/10"
            : "bg-white/70 border-gray-200") +
          " border rounded-2xl p-10 backdrop-blur-xl shadow-lg leading-relaxed"
        }
      >
        <p className="opacity-90">
          Junior Software Engineer with hands-on
          experience building mobile and web
          applications. Specialized in Flutter for
          cross-platform development, with additional
          experience in Laravel and MySQL.
        </p>

        <p className="mt-4 opacity-80">
          Experienced in RESTful API integration,
          payment systems, role-based access control,
          and real-time data handling. Passionate
          about building scalable, reliable systems
          and delivering high-quality user experiences.
        </p>
      </div>
    </motion.section>
  );
}