import React, { useMemo, useState } from "react";
import Container from "../components/common/Container.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Reveal from "../components/common/Reveal.jsx";
import Lightbox from "../components/common/Lightbox.jsx";

export default function WorkGallery() {
  // ✅ matches your files in public/gallery (jpeg)
  const images = useMemo(
    () => [
      { src: "/gallery/g1.jpeg", alt: "Gallery Work 1" },
      { src: "/gallery/g2.jpeg", alt: "Gallery Work 2" },
      { src: "/gallery/g3.jpeg", alt: "Gallery Work 3" },
      { src: "/gallery/g4.jpeg", alt: "Gallery Work 4" },
      { src: "/gallery/g5.jpeg", alt: "Gallery Work 5" },
      { src: "/gallery/g6.jpeg", alt: "Gallery Work 6" },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);
  const next = () => setIdx((p) => (p + 1) % images.length);

  return (
    <Container className="py-12">
      <SectionTitle
        eyebrow="WORK GALLERY"
        title="Our Recent Promotional Work"
        desc="Click any image to view in full screen."
      />

      {/* ✅ Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={Math.min(0.25, i * 0.04)}>
            <button
              onClick={() => openAt(i)}
              className="group rounded-2xl border border-border bg-white shadow-soft overflow-hidden text-left"
            >
              <div className="aspect-[4/3] bg-bg overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <p className="font-extrabold">{img.alt}</p>
                <p className="text-sm text-muted mt-1">Tap to preview</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* ✅ Lightbox popup */}
      <Lightbox
        open={open}
        images={images}
        index={idx}
        onClose={() => setOpen(false)}
        onPrev={prev}
        onNext={next}
      />
    </Container>
  );
}
