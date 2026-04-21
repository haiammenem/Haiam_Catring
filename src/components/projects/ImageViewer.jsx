import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ImageViewer({ images, onClose }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!images) return null;

  return (
    <AnimatePresence>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-[95] p-6"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="relative w-full flex items-center justify-center"
        >
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Project preview"
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
          />

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white"
          >
            <X />
          </motion.button>

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setIndex(
                    (prev) =>
                      (prev - 1 + images.length) %
                      images.length
                  )
                }
                className="absolute left-2 p-2 rounded-full bg-black/40 text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() =>
                  setIndex(
                    (prev) =>
                      (prev + 1) % images.length
                  )
                }
                className="absolute right-2 p-2 rounded-full bg-black/40 text-white"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}