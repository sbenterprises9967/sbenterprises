import React from "react";

const styles = {
  solid:
    "bg-primary text-white hover:opacity-95 active:opacity-90 shadow-soft",
  outline:
    "border border-border bg-white text-text hover:bg-bg",
  accent:
    "bg-accent text-white hover:opacity-95 active:opacity-90 shadow-soft",
};

export default function Button({
  as: Tag = "button",
  variant = "solid",
  className = "",
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
