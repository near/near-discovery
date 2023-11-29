export const container = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
  },
  transition: {
    duration: 0.2,
  },
};
