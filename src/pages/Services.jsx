// src/pages/Services.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/common/Container.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Reveal from "../components/common/Reveal.jsx";
import Button from "../components/common/Button.jsx";
import servicesBanner from "../assets/services-banner.png";
import products from "../data/products.js";

import {
  Printer,
  Tent,
  Image as ImageIcon,
  BadgeCheck,
  LayoutPanelTop,
  CreditCard,
  Trophy,
  Shield,
} from "lucide-react";

const cn = (...a) => a.filter(Boolean).join(" ");

// 🔹 Icon mapping based on category name keywords
const pickIcon = (name = "") => {
  const n = name.toLowerCase();

  if (n.includes("printing")) return Printer;
  if (n.includes("card") || n.includes("stationery")) return CreditCard;
  if (n.includes("gazebo") || n.includes("canopy") || n.includes("tent")) return Tent;
  if (n.includes("umbrella")) return Tent;
  if (n.includes("standee") || n.includes("banner")) return ImageIcon;
  if (n.includes("sign") || n.includes("board") || n.includes("parking")) return BadgeCheck;
  if (n.includes("trophy")) return Trophy;
  if (n.includes("stall")) return LayoutPanelTop;
  if (n.includes("safety") || n.includes("no parking")) return Shield;

  return BadgeCheck;
};

export default function Services() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  // ✅ Build filters from your latest products.js
  const filters = useMemo(() => {
    const base = ["All"];
    const extra = [];

    products.forEach((p) => {
      const n = (p?.name || "").toLowerCase();
      if (n.includes("printing")) extra.push("Printing");
      if (n.includes("standee") || n.includes("banner")) extra.push("Standees");
      if (n.includes("tent") || n.includes("gazebo") || n.includes("canopy")) extra.push("Tents");
      if (n.includes("umbrella")) extra.push("Umbrellas");
      if (n.includes("board") || n.includes("sign") || n.includes("parking")) extra.push("Boards");
      if (n.includes("table")) extra.push("Promo Tables");
      if (n.includes("card") || n.includes("badge")) extra.push("Stationery");
    });

    return [...base, ...Array.from(new Set(extra))];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return products.filter((p) => {
      const name = (p?.name || "").toLowerCase();

      const matchQuery = !query || name.includes(query);

      const matchFilter =
        filter === "All" ||
        (filter === "Printing" && name.includes("printing")) ||
        (filter === "Standees" && (name.includes("standee") || name.includes("banner"))) ||
        (filter === "Tents" && (name.includes("tent") || name.includes("gazebo") || name.includes("canopy"))) ||
        (filter === "Umbrellas" && name.includes("umbrella")) ||
        (filter === "Boards" && (name.includes("board") || name.includes("sign") || name.includes("no parking") || name.includes("parking"))) ||
        (filter === "Promo Tables" && name.includes("table")) ||
        (filter === "Stationery" && (name.includes("card") || name.includes("badge")));

      return matchQuery && matchFilter;
    });
  }, [q, filter]);

  // ✅ Small UX: scroll to top when filter changes
  useEffect(() => {
    // optional: window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filter]);

  return (
    <Container className="py-12">
      {/* ================= SERVICES BANNER ================= */}
      <Reveal>
        <div className="mb-10 relative overflow-hidden rounded-2xl border border-border shadow-soft">
          <img
            src={servicesBanner}
            alt="SB Enterprises Services"
            className="w-full h-[260px] sm:h-[340px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
          <div className="absolute inset-0 flex items-center px-6">
            <div className="mx-auto text-center">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                Our Products & Services
              </h1>
              <p className="mt-2 text-white/85 text-sm sm:text-base">
                Complete solution for indoor & outdoor promotions
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= PAGE TITLE ================= */}
      <SectionTitle
        eyebrow="CATEGORIES"
        title="Explore Our Range"
        desc="Browse categories with real product photos from our latest product library."
      />

      {/* ================= SEARCH + FILTER BAR ================= */}
      <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search category (e.g., standee, gazebo, umbrella...)"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-extrabold transition",
                filter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-white hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => {
          const Icon = pickIcon(p.name);
          const cover = p?.images?.[0] || "/products/placeholder.jpg";

          return (
            <Reveal key={p.slug} delay={Math.min(0.25, i * 0.04)}>
              {/* ✅ CARD IS CLICKABLE NOW */}
              <div
                role="link"
                tabIndex={0}
                onClick={() => navigate(`/products/${p.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/products/${p.slug}`);
                  }
                }}
                className={cn(
                  "group rounded-2xl border border-border bg-white shadow-soft overflow-hidden transition cursor-pointer",
                  "hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/10"
                )}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cover}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition" />

                  {/* badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 border border-border">
                    <Icon size={16} className="text-primary" />
                    <span className="text-[12px] font-extrabold">{p.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="font-extrabold text-base">{p.name}</p>

                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {p?.images?.length ? `${p.images.length} photos available` : "Photos coming soon"}
                    {" · "}
                    Custom sizes, branding & finishing available.
                  </p>

                  {/* ✅ Buttons inside clickable card must stop propagation */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <Button
                      as={Link}
                      to={`/products/${p.slug}`}
                      variant="primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Gallery
                    </Button>

                    <Button
                      as={Link}
                      to="/contact"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-border bg-white p-8 text-center shadow-soft">
          <p className="text-lg font-extrabold">No results found</p>
          <p className="mt-2 text-sm text-muted">
            Try a different keyword or remove filters.
          </p>
          <div className="mt-4">
            <Button
              onClick={() => {
                setQ("");
                setFilter("All");
              }}
              variant="accent"
            >
              Reset
            </Button>
          </div>
        </div>
      )}

      {/* ================= SERVICE HIGHLIGHTS ================= */}
      <div className="mt-14">
        <SectionTitle
          eyebrow="WHY CHOOSE US"
          title="Service Highlights"
          desc="What makes our promotional work reliable and professional."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <div className="h-40 w-full rounded-xl bg-slate-100 grid place-items-center">
                <Printer className="h-10 w-10 text-primary" />
              </div>
              <p className="mt-4 font-extrabold">Premium Print Quality</p>
              <p className="mt-2 text-sm text-muted">
                High-resolution output with durable material options for indoor & outdoor use.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <div className="h-40 w-full rounded-xl bg-slate-100 grid place-items-center">
                <Tent className="h-10 w-10 text-primary" />
              </div>
              <p className="mt-4 font-extrabold">Strong Outdoor Visibility</p>
              <p className="mt-2 text-sm text-muted">
                Tents, umbrellas, boards & standees designed for outdoor promotions and events.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
              <div className="h-40 w-full rounded-xl bg-slate-100 grid place-items-center">
                <BadgeCheck className="h-10 w-10 text-primary" />
              </div>
              <p className="mt-4 font-extrabold">Professional Branding</p>
              <p className="mt-2 text-sm text-muted">
                Clean layouts, strong build quality and finishing that enhances brand trust.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-14 rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-primary2/10 to-accent2/10 p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary2">Need promotional services?</p>
          <p className="text-lg font-extrabold">Get a quick quote tailored to your requirement.</p>
          <p className="text-sm text-muted mt-1">
            Share your size, quantity & location — we’ll handle the rest.
          </p>
        </div>
        <Button as={Link} to="/contact" variant="accent">
          Request Quote
        </Button>
      </div>
    </Container>
  );
}
