// /src/app/lobby/components/BackgroundAnimation.tsx
import { motion } from "framer-motion";

const BackgroundAnimation: React.FC = () => {
  const circleAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: [0, 1, 0], scale: [0.5, 1.2, 1.8] },
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror" as const, // Specify the exact value here
    },
  };

  return (
    <div className="absolute inset-0  overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full dark:bg-gray-300/30 bg-slate-400/40 backdrop-blur-lg bg-opacity-20 w-32 h-32"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 85}%`,
          }}
          initial="initial"
          animate="animate"
          variants={circleAnimation}
          transition={{
            ...circleAnimation.transition,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
