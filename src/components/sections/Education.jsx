import { motion } from "framer-motion";

export default function Education({ dark }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-10"
    >
      <div>
        <h2 className="text-3xl font-bold">
          Education
        </h2>
        <div className="w-35 h-[3px] bg-indigo-500 rounded-full mt-2" />
      </div>

      <div
        className={
          (dark
            ? "bg-white/5 border-white/10 hover:bg-white/10"
            : "bg-white/70 border-gray-200 hover:bg-white/80") +
          " border rounded-2xl p-8 backdrop-blur-xl shadow-lg transition"
        }
      >
        <h3 className="text-2xl font-semibold">
          Canadian International College (CIC)
        </h3>

        <p className="text-indigo-500 font-medium mt-2 text-lg">
          Bachelor of Business Information Technology
          (2020 – 2024)
        </p>

        <p className="text-sm opacity-60 mt-1">
          El Sheikh Zayed, Egypt
        </p>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p>
            <span className="font-medium text-indigo-400">
              Graduation Project:
            </span>{" "}
            SubTrain – Flutter Mobile Application
          </p>

          <div className="flex gap-3 mt-4">
            <div className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-sm border border-indigo-500/30">
              ⭐ A+ Grade
            </div>
            <div className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
              🏆 Ranked 2nd Place
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}