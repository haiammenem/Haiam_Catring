import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TbApi } from "react-icons/tb";
import {
  SiFlutter,
  SiLaravel,
  SiMysql,
  SiFirebase,
} from "react-icons/si";

const techIcons = {
  Flutter: <SiFlutter />,
  Laravel: <SiLaravel />,
  MySQL: <SiMysql />,
  Firebase: <SiFirebase />,
  "REST APIs": <TbApi />,
};

export default function ProjectModal({
  activeProject,
  dark,
  onClose,
}) {
  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[90] p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className={
              (dark
                ? "bg-white/10 border-white/20"
                : "bg-white border-gray-200") +
              " border rounded-3xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto backdrop-blur-xl shadow-2xl"
            }
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {activeProject.title}
                </h3>
                <p className="text-sm opacity-70">
                  {activeProject.duration}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <X />
              </motion.button>
            </div>

            <p className="opacity-80 mb-4">
              {activeProject.desc}
            </p>

            <ul className="list-disc pl-5 space-y-1 mb-4 opacity-80">
              {activeProject.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              {activeProject.tech.map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm"
                >
                  {techIcons[t] || <TbApi />}
                  {t}
                </motion.div>
              ))}
            </div>

            {activeProject.url && (
              <div className="mt-6 text-center">
                <motion.a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-6 py-2 rounded-2xl font-medium transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700"
                >
                  View on GitHub
                </motion.a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}