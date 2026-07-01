import { motion } from "framer-motion";
import React from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

const pageTransition = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={pageTransition}>
      {children}
    </motion.div>
  );
}

export default PageTransition;
