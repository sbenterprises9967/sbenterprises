// src/pages/ProductDetails.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products.js";
import Container from "../components/common/Container.jsx";
import Button from "../components/common/Button.jsx";
import Reveal from "../components/common/Reveal.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import { SITE } from "../data/site.js";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Images,
} from "lucide-react";

const cn = (...a) => a.filter(Boolean).join(" ");

function buildWhatsAppUrl(text) {
  const phone = (SITE?.phones?.[0] || "+91 99875 91006").replace(/\D/g, "");
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    text
  )}`;
}

/** ✅ Mobile-friendly icon button (44px touch target) */
function IconBtn({ onClick, label, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-white/20 bg-white/15 backdrop-blur grid place-items-center text-white hover:bg-white/25 transition",
        "focus:outline-none focus:ring-4 focus:ring-white/20",
        className
      )}
    >
      {children}
    </button>
  );
}

/** ✅ Premium image with blur-on-load + fallback */
function Img({ src, alt, className = "", onClick }) {
  const [loaded, setLoaded] = useState(false);
  const safeSrc = src || "/products/placeholder.jpg";

  return (
    <img
      src={safeSrc}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        e.currentTarget.src = "/products/placeholder.jpg";
      }}
      onClick={onClick}
      className={cn(
        "transition duration-700",
        loaded ? "blur-0" : "blur-sm",
        className
      )}
    />
  );
}

export default function ProductDetails() {
  const { slug } = useParams();

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  const images = product?.images || [];
  const [active, setActive] = useState(0);

  // Lightbox state
  const [open, setOpen] = useState(false);

  const hasImages = images.length > 0;
  const cover = images[active] || images[0] || "/products/placeholder.jpg";

  const goPrev = useCallback(() => {
    if (!hasImages) return;
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  const goNext = useCallback(() => {
    if (!hasImages) return;
    setActive((i) => (i + 1) % images.length);
  }, [hasImages, images.length]);

  // ✅ Keyboard support (lightbox + slider)
  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;

      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  // ✅ Reset active index when slug changes
  useEffect(() => {
    setActive(0);
    setOpen(false);
  }, [slug]);

  if (!product) {
    return (
      <Container className="py-10 sm:py-12">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-soft">
          <p className="text-lg sm:text-xl font-extrabold">Product not found</p>
          <p className="mt-2 text-sm text-muted">
            The product you are looking for doesn’t exist.
          </p>
          <div className="mt-5">
            <Button as={Link} to="/products" variant="accent" className="w-full sm:w-auto">
              <ArrowLeft size={16} /> Back to Products
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-12">
      {/* ✅ Top Nav (responsive) */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button as={Link} to="/products" variant="ghost" className="w-full sm:w-auto">
          <ArrowLeft size={16} /> Back
        </Button>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            as="a"
            target="_blank"
            rel="noreferrer"
            href={buildWhatsAppUrl(
              `Hello SB Enterprises, I need details for ${product.name}.`
            )}
            variant="outline"
            className="w-full sm:w-auto justify-center"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </Button>

          <Button
            as={Link}
            to="/contact"
            variant="accent"
            className="w-full sm:w-auto justify-center"
          >
            Get Quote
          </Button>
        </div>
      </div>

      <SectionTitle
        eyebrow="PRODUCT DETAILS"
        title={product.name}
        desc="Browse real photos. Choose your size, quantity, and branding requirements."
      />

      {/* ✅ Layout: 1 col on mobile, 2 col on large */}
      <div className="mt-8 grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* ============= LEFT: Gallery ============= */}
        <Reveal>
          <div className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
            {/* Main Image (responsive aspect ratios) */}
            <div className="relative bg-slate-100 overflow-hidden">
              {/* ✅ mobile: taller, desktop: wide */}
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10]">
                <Img
                  src={cover}
                  alt={product.name}
                  className="h-full w-full object-cover cursor-zoom-in"
                  onClick={() => setOpen(true)}
                />
              </div>

              {/* Top badges */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-white backdrop-blur">
                  <Images size={16} />
                  {images.length} Photos
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-white backdrop-blur">
                  Custom Branding
                </span>
              </div>

              {/* Controls (bigger touch targets) */}
              {images.length > 1 && (
                <>
                  <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2">
                    <IconBtn onClick={goPrev} label="Previous image">
                      <ChevronLeft />
                    </IconBtn>
                  </div>
                  <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                    <IconBtn onClick={goNext} label="Next image">
                      <ChevronRight />
                    </IconBtn>
                  </div>
                </>
              )}

              {/* Zoom hint */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-white backdrop-blur hover:bg-white/25 transition focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  <ZoomIn size={16} />
                  View
                </button>
              </div>
            </div>

            {/* Thumbnails (horizontal scroll on mobile) */}
            {images.length > 0 && (
              <div className="p-4 sm:p-5">
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={cn(
                        "relative flex-none overflow-hidden rounded-xl border transition",
                        "h-16 w-24 sm:h-16 sm:w-24 md:h-20 md:w-28",
                        idx === active
                          ? "border-primary ring-4 ring-primary/10"
                          : "border-border hover:border-slate-300"
                      )}
                      aria-label={`Open image ${idx + 1}`}
                    >
                      <Img
                        src={src}
                        alt={`${product.name} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs text-muted">
                  Tip: Tap the main photo to open full screen. Swipe (or use buttons)
                  to navigate.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {/* ============= RIGHT: Details / CTA ============= */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-border bg-white shadow-soft p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-extrabold">
              Get Your Best Quote
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Share your <b>size</b>, <b>quantity</b>, <b>branding matter</b>, and{" "}
              <b>delivery location</b>. We’ll respond with best pricing and timeline.
            </p>

            <div className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-slate-50 p-4">
                <p className="text-xs font-extrabold text-slate-700">Category</p>
                <p className="mt-1 text-sm font-extrabold break-words">
                  {product.name}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-slate-50 p-4">
                <p className="text-xs font-extrabold text-slate-700">Photos</p>
                <p className="mt-1 text-sm font-extrabold">{images.length}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-primary2/10 to-accent2/10 p-4">
              <p className="text-sm font-extrabold">Quick message format</p>
              <p className="mt-1 text-xs text-muted">
                Example: “{product.name} – Qty 10 – Size 6×2.5 – Delivery Panvel”
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  as="a"
                  target="_blank"
                  rel="noreferrer"
                  href={buildWhatsAppUrl(
                    `Hello SB Enterprises, I need quote for ${product.name}. Qty: __, Size: __, Delivery: __.`
                  )}
                  variant="outline"
                  className="flex-1 justify-center"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp Enquiry
                </Button>

                <Button
                  as={Link}
                  to="/contact"
                  variant="accent"
                  className="flex-1 justify-center"
                >
                  Get Quote
                </Button>
              </div>
            </div>

            <div className="mt-6 text-xs text-muted">
              <p>
                <b>SB Enterprises</b> • Panvel • Indoor & Outdoor Promotions
              </p>
              <p className="mt-1 break-words">
                Phone: {SITE?.phones?.join(" / ") || "+91 99875 91006"}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ============= LIGHTBOX (mobile-safe + scroll-safe) ============= */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-3 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-5xl">
              {/* Close (safe touch target) */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute -top-3 right-0 sm:-top-4 sm:right-0 h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-white/20 bg-white/10 backdrop-blur grid place-items-center text-white hover:bg-white/20 transition focus:outline-none focus:ring-4 focus:ring-white/20"
                aria-label="Close"
              >
                <X />
              </button>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black">
                <img
                  src={cover}
                  alt={product.name}
                  className="w-full max-h-[78vh] sm:max-h-[82vh] object-contain bg-black"
                />
              </div>

              {/* Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl border border-white/20 bg-white/10 backdrop-blur grid place-items-center text-white hover:bg-white/20 transition focus:outline-none focus:ring-4 focus:ring-white/20"
                    aria-label="Previous"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl border border-white/20 bg-white/10 backdrop-blur grid place-items-center text-white hover:bg-white/20 transition focus:outline-none focus:ring-4 focus:ring-white/20"
                    aria-label="Next"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              <div className="mt-3 text-center text-white/80 text-[11px] sm:text-xs">
                {active + 1} / {images.length} 
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
