import { useRef, useState, useEffect } from "react";
import { AnimatePresence, useScroll, useTransform } from "framer-motion";

import useTheme from "./hooks/useTheme";
import { projectsData } from "./data/projects";

/* Layout */
import BackgroundBlobs from "./components/layout/BackgroundBlobs";
import LoadingScreen from "./components/layout/LoadingScreen";
import ThemeToggle from "./components/layout/ThemeToggle";

/* Sections */
import Hero from "./components/sections/Hero";
import Summary from "./components/sections/Summary";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";

/* Projects */
import ProjectsSection from "./components/sections/ProjectsSection";
import ProjectModal from "./components/projects/ProjectModal";
import ImageViewer from "./components/projects/ImageViewer";

/*vercel Insights*/
import { SpeedInsights } from "@vercel/speed-insights/react";
export default function App() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const contactMeRef = useRef(null);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, -120]);

  const { dark, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [viewerImages, setViewerImages] = useState(null);

  /* Loading Timer */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        (dark
          ? "bg-gradient-to-br from-[#0f0f1a] via-[#0b0b14] to-[#141427] text-white"
          : "bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#fdf2f8] text-gray-900") +
        " min-h-screen relative overflow-hidden transition-colors duration-700"
      }
      style={{ position: "relative" }}
    >
      {/* Background */}
      <BackgroundBlobs dark={dark} />

      {/* Loading */}
      <AnimatePresence>
        {loading && <LoadingScreen dark={dark} />}
      </AnimatePresence>

      {/* Theme Toggle */}
      <ThemeToggle dark={dark} toggleTheme={toggleTheme} />

      {/* Main Content */}
      {!loading && (
        <div className="px-6 md:px-16 py-16 space-y-16 relative z-10">
          <Hero
            dark={dark}
            yHero={yHero}
            projectsRef={projectsRef}
            contactMeRef={contactMeRef}
          />

          <Summary dark={dark} />

          <Skills dark={dark} />

          <Education dark={dark} />

          <div ref={projectsRef}>
            <ProjectsSection
              title="Experience Projects"
              projects={projectsData.experience}
              dark={dark}
              onOpenModal={setActiveProject}
              onPreview={setViewerImages}
            />
          </div>

          <ProjectsSection
            title="Personal Projects"
            projects={projectsData.personal}
            dark={dark}
            onOpenModal={setActiveProject}
            onPreview={setViewerImages}
          />

          <Contact contactMeRef={contactMeRef} />

          <footer className="text-center opacity-50 pt-16">
            © {new Date().getFullYear()} Omar Abdelmonem Mohamed
          </footer>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        activeProject={activeProject}
        dark={dark}
        onClose={() => setActiveProject(null)}
      />

      {/* Image Viewer */}
      <ImageViewer
        images={viewerImages}
        onClose={() => setViewerImages(null)}
      />
      <SpeedInsights />
    </div>
  );
}
