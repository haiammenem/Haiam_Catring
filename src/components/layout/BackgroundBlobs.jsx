import { motion } from "framer-motion";

const blobAnimation = {
  animate: { x: [0, 20, 0, -20, 0], y: [0, -20, 0, 20, 0] },
  transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
};

export default function BackgroundBlobs({ dark }) {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ position: "absolute" }}
    >
      {dark ? (
        <>
          <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[180px]"
            variants={blobAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[200px]"
            variants={blobAnimation}
            animate="animate"
          />
        </>
      ) : (
        <>
          <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-300/40 rounded-full blur-[160px]"
            variants={blobAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-[180px]"
            variants={blobAnimation}
            animate="animate"
          />
        </>
      )}
    </div>
  );
}
