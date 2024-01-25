"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
    // <motion.div
    //   key={pathname}
    //   initial={{ opacity: 0, x: "-100%" }}
    //   animate={{ opacity: 1, x: 0 }}
    //   transition={{ ease: "easeInOut", duration: 0.75 }}
    // >
    //   {children}
    // </motion.div>
  );
}
