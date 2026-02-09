import React from "react";

export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
      {children}
    </span>
  );
}
