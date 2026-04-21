import ProjectCard from "../projects/ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsSection({
  title,
  projects,
  dark,
  onOpenModal,
  onPreview,
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className="space-y-10"
    >
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="w-28 h-[3px] bg-indigo-500 rounded-full mt-2" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            dark={dark}
            onOpenModal={onOpenModal}
            onPreview={onPreview}
          />
        ))}
      </div>
    </motion.section>
  );
}