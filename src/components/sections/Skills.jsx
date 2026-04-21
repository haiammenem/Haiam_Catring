import { motion } from "framer-motion";

export default function Skills({ dark }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-10"
    >
      <div>
        <h2 className="text-3xl font-bold">Skills</h2>
        <div className="w-18 h-[3px] bg-indigo-500 rounded-full mt-2" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div
          className={
            (dark
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-gray-200") +
            " border rounded-2xl p-10 backdrop-blur-xl shadow-lg"
          }
        >
          <h3 className="text-xl font-semibold mb-6 text-indigo-500">
            Technical Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {[
              "Flutter & Dart",
              "RESTful APIs",
              "State Management (Bloc)",
              "Payment Integration",
              "Maps & GPS",
              "RBAC",
              "Real-time Data",
              "Firebase",
              "Git & Version Control",
            ].map((skill, i) => (
              <span
                key={i}
                className={
                  (dark
                    ? "bg-indigo-500/10 border-indigo-500/20"
                    : "bg-indigo-100 border-indigo-200") +
                  " px-4 py-2 rounded-full text-sm border"
                }
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div
          className={
            (dark
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-gray-200") +
            " border rounded-2xl p-10 backdrop-blur-xl shadow-lg"
          }
        >
          <h3 className="text-xl font-semibold mb-6 text-indigo-500">
            Soft Skills
          </h3>

          <ul className="space-y-4">
            {[
              "Strong Problem-Solving Skills",
              "Effective Communication & Teamwork",
              "Fast Adaptation in Startup Environments",
              "Attention to Detail",
            ].map((skill, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="opacity-90">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}