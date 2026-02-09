import React from "react";

export default function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold text-primary2">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-muted">{desc}</p> : null}
    </div>
  );
}
