import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectCard({
  project,
  dark,
  onOpenModal,
  onPreview,
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.01 }}
      onClick={() => onOpenModal(project)}
      className={
        (dark
          ? "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
          : "bg-white/70 border-gray-200 hover:bg-white/90 hover:border-gray-300") +
        " border rounded-2xl p-8 shadow-xl cursor-pointer backdrop-blur-xl transition duration-300 hover:shadow-2xl"
      }
    >
      {(project.projectCover ||
        (project.images && project.images.length > 0)) && (
        <div className="mb-4 relative">
          <img
            src={project.projectCover || project.images[0]}
            alt={project.title + " screenshot"}
            className="w-full h-54 object-cover rounded-xl"
          />

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              const imgs =
                project.images && project.images.length
                  ? project.images
                  : [project.projectCover];
              onPreview(imgs);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/10 backdrop-blur border border-white/20 text-white"
            aria-label={"Preview " + project.title}
          >
            <Eye size={16} />
          </motion.button>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg flex-1">
          {project.title}
        </h3>
      </div>

      <p className="text-xs opacity-60 mb-3 font-medium">
        {project.duration}
      </p>

      <p className="text-sm opacity-80 mb-4 leading-relaxed">
        {project.desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((t, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20"
          >
            {t}
          </span>
        ))}

        {project.tech.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-full opacity-60">
            +{project.tech.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}