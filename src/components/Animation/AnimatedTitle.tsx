"use client";

import { motion } from "framer-motion";

const slogan = "Đầu tư sinh lãi, An cư phát tài";

export default function AnimatedTitle() {
  return (
    <motion.h1
      className="text-3xl md:text-5xl font-bold text-white flex flex-wrap"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {slogan.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
