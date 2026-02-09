// src/components/common/Reveal.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  direction = "up", // up | down | left | right
  distance = 24,
}) {
  const variants = {
    up: { opacity: 0, y: distance, x: 0 },
    down: { opacity: 0, y: -distance, x: 0 },
    left: { opacity: 0, x: -distance, y: 0 },
    right: { opacity: 0, x: distance, y: 0 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}








// import React from "react";
// import { motion } from "framer-motion";

// export default function Reveal({ children, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 18 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.6, ease: "easeOut", delay }}
//     >
//       {children}
//     </motion.div>
//   );
// }
