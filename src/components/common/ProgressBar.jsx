import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="font-bold">{label}</p>
        <p className="text-sm font-extrabold text-primary2">{value}%</p>
      </div>
      <div className="mt-3 h-3 w-full rounded-full bg-bg border border-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary2"
        />
      </div>
    </div>
  );
}
