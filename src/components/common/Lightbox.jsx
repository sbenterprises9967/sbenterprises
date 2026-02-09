import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ open, images = [], index = 0, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;
  const img = images[index];

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm grid place-items-center p-4">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/90 hover:text-white inline-flex items-center gap-2"
        >
          <X size={20} /> Close
        </button>

        <div className="rounded-2xl overflow-hidden border border-white/20 bg-black shadow-soft">
          <img src={img?.src} alt={img?.alt || "Gallery"} className="w-full max-h-[78vh] object-contain bg-black" />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button onClick={onPrev} className="text-white inline-flex items-center gap-2 hover:opacity-90">
            <ChevronLeft size={20} /> Prev
          </button>
          <p className="text-white/80 text-sm">{index + 1} / {images.length}</p>
          <button onClick={onNext} className="text-white inline-flex items-center gap-2 hover:opacity-90">
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
