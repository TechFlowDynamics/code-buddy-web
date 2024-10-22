// utils/motionVariants.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const scaleOnHover = {
  whileHover: { scale: 1.1, transition: { type: "spring", stiffness: 200 } },
};
