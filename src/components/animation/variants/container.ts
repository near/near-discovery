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

export const modal = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: { y: 50, opacity: 0 },
  transition: {
    duration: 0.2,
  },
};

export const overlay = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
  },
};
