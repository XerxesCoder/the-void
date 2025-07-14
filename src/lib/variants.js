export const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 1,
    },
  },
};

export const fadeUpVariant = (duration = 0.5) => ({
  hidden: { opacity: 0, filter: "blur(14px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: "easeOut" },
  },
});

export const buttonContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

export const buttonVariant = (delay = 4.5, duration = 1) => ({
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(30px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration,
      ease: "easeOut",
    },
  },
});
