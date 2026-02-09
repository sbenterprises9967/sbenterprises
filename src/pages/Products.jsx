// src/pages/Products.jsx
import React, { useMemo, useState } from "react";
import Container from "../components/common/Container.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Button from "../components/common/Button.jsx";
import Reveal from "../components/common/Reveal.jsx";

import products from "../data/products.js";
import { SITE } from "../data/site.js";

import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowRight,
  Search,
  Sparkles,
  Images,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";

const cn = (...a) => a.filter(Boolean).join(" ");

/** Small filter chip */
function Chip({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-extrabold transition",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-white hover:bg-slate-50 text-slate-800"
      )}
    >
      {children}
    </button>
  );
}

/** Premium skeleton card (loads instantly, feels fast) */
function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
      <div className="h-44 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-28 bg-slate-200 rounded-full" />
          <div className="h-8 w-28 bg-slate-200 rounded-full" />
        </div>
        <div className="h-12 bg-slate-200 rounded-2xl mt-4" />
      </div>
    </div>
  );
}

function WhatsAppLink({ text }) {
  const phone = (SITE?.phones?.[0] || "+91 99875 91006").replace(/\D/g, "");
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    text
  )}`;
}

// ✅ Helper: create "Available Options" automatically
function buildOptionsFromName(name = "") {
  const n = name.toLowerCase();

  if (n.includes("standee")) {
    return [
      { name: "Size 4 x 2", note: "Budget" },
      { name: "Size 6 x 2.5", note: "Popular" },
      { name: "Size 6 x 3", note: "Max visibility" },
    ];
  }

  if (n.includes("canopy") || n.includes("gazebo") || n.includes("tent")) {
    return [
      { name: "Standard", note: "Quick setup" },
      { name: "Premium", note: "Strong frame" },
      { name: "Custom Branding", note: "Full print" },
    ];
  }

  if (n.includes("umbrella")) {
    return [
      { name: "Garden Umbrella", note: "Outdoor cafes" },
      { name: "All Types", note: "Custom branding" },
    ];
  }

  if (n.includes("visiting card")) {
    return [
      { name: "Matt", note: "Classic" },
      { name: "Glossy", note: "Shiny finish" },
      { name: "Lamination", note: "Premium" },
    ];
  }

  if (n.includes("board") || n.includes("sign") || n.includes("parking")) {
    return [
      { name: "Standard", note: "Ready formats" },
      { name: "Custom", note: "As per requirement" },
      { name: "Outdoor", note: "Weather resistant" },
    ];
  }

  if (n.includes("promo table") || n.includes("table")) {
    return [
      { name: "PVC Promo Table", note: "Lightweight" },
      { name: "MDF Promo Table", note: "Premium look" },
    ];
  }

  // default
  return [
    { name: "Custom Size", note: "As required" },
    { name: "Brand Printing", note: "Logo + details" },
    { name: "Bulk Orders", note: "Best pricing" },
  ];
}

/** Tag for filter grouping */
function inferTag(name = "") {
  const n = name.toLowerCase();
  if (n.includes("printing")) return "Printing";
  if (n.includes("standee") || n.includes("banner")) return "Standees";
  if (n.includes("canopy") || n.includes("gazebo") || n.includes("tent"))
    return "Tents";
  if (n.includes("umbrella")) return "Umbrellas";
  if (n.includes("board") || n.includes("sign") || n.includes("parking"))
    return "Boards";
  if (n.includes("table")) return "Promo Tables";
  if (n.includes("card") || n.includes("badge")) return "Stationery";
  return "More";
}

export default function Products() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("A-Z"); // ✅ new

  // ✅ Convert products.js → UI card format
  const cards = useMemo(() => {
    return products.map((p) => ({
      name: p.name,
      slug: p.slug,
      tag: inferTag(p.name),
      image: p.images?.[0] || "/products/placeholder.jpg",
      photoCount: p.images?.length || 0,
      short:
        "Premium promotional product with custom branding and durable finishing for indoor & outdoor use.",
      items: buildOptionsFromName(p.name),
    }));
  }, []);

  const filters = useMemo(() => {
    const unique = Array.from(new Set(cards.map((c) => c.tag)));
    return ["All", ...unique];
  }, [cards]);

  const totalPhotos = useMemo(
    () => cards.reduce((sum, c) => sum + (c.photoCount || 0), 0),
    [cards]
  );

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = cards.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q);
      const matchF = filter === "All" || c.tag === filter;
      return matchQ && matchF;
    });

    // ✅ sorting
    if (sortBy === "A-Z") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "Z-A") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "Photos")
      list.sort((a, b) => (b.photoCount || 0) - (a.photoCount || 0));

    return list;
  }, [cards, query, filter, sortBy]);

  return (
    <Container className="py-12">
      {/* ================= HERO (premium) ================= */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-primary2/10 to-accent2/10 shadow-soft">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent2/20 blur-3xl" />

          <div className="relative p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-extrabold">
                  <Sparkles size={16} className="text-primary" />
                  Latest Product Gallery
                </div>

                <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Explore Our Product Categories
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted max-w-2xl">
                  Premium indoor & outdoor promotional products with custom
                  branding, strong materials, and professional finishing.
                </p>

                {/* ✅ different text colors for stats */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                    <Images size={14} />
                    {cards.length} Categories
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-accent2/30 bg-accent2/10 px-3 py-1 text-xs font-extrabold text-accent2">
                    <Images size={14} />
                    {totalPhotos} Photos
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-extrabold text-green-600">
                    <SlidersHorizontal size={14} />
                    Custom Sizes + Branding
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  as={Link}
                  to="/contact"
                  variant="accent"
                  className="justify-center"
                >
                  Request Quote <ArrowRight size={16} />
                </Button>
                <Button
                  as="a"
                  href={WhatsAppLink({ text: "Hello SB Enterprises, I want enquiry." })}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  className="justify-center"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Search + Sort + Filters */}
            <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto] items-center">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search category… (standee, gazebo, umbrella, board, printing...)"
                  className="w-full rounded-2xl border border-border bg-white px-11 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-extrabold outline-none focus:ring-4 focus:ring-primary/10"
                >
                  <option value="A-Z">Sort: A–Z</option>
                  <option value="Z-A">Sort: Z–A</option>
                  <option value="Photos">Sort: Photos</option>
                </select>

                {filters.map((f) => (
                  <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
                    {f}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= SECTION TITLE ================= */}
      <div className="mt-10">
        <SectionTitle
          eyebrow="PRODUCTS"
          title="Choose a Category"
          desc="Click any card to open full gallery (photos, details & enquiry)."
        />
      </div>

      {/* ================= GRID ================= */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {/* ✅ skeletons while empty (nice premium feel) */}
        {filteredCards.length === 0
          ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
          : filteredCards.map((c, i) => (
              <Reveal key={c.slug || c.name} delay={Math.min(0.25, i * 0.03)}>
                {/* ✅ Whole card clickable */}
                <Link
                  to={`/products/${c.slug}`}
                  className="group block rounded-2xl border border-border bg-white shadow-soft overflow-hidden hover:-translate-y-1 transition focus:outline-none focus:ring-4 focus:ring-primary/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-bg overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover blur-sm transition duration-700 group-hover:scale-[1.07] group-hover:blur-0"
                      onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
                        {c.tag}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
                        {c.photoCount} Photos
                      </span>
                    </div>

                    {/* Bottom Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white/75 text-[11px] font-semibold tracking-wide">
                        SB ENTERPRISES • PANVEL
                      </p>
                      <div className="mt-1 flex items-end justify-between gap-3">
                        <h3 className="text-white text-xl font-extrabold leading-tight">
                          {c.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-white/90 text-xs font-extrabold">
                          View <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">
                      {c.short}
                    </p>

                    {/* Options */}
                    <div className="mt-4">
                      <p className="text-sm font-extrabold">Popular Options</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {c.items.slice(0, 4).map((it) => (
                          <span
                            key={it.name}
                            className="inline-flex items-center rounded-full border border-border bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700"
                          >
                            {it.name}
                            {it.note ? ` • ${it.note}` : ""}
                          </span>
                        ))}
                        {c.items.length > 4 ? (
                          <span className="inline-flex items-center rounded-full border border-border bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                            +{c.items.length - 4} more
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* CTA Row */}
                    <div
                      className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
                      onClick={(e) => e.preventDefault()} // keep buttons clickable inside Link
                    >
                      <Button
                        as={Link}
                        to="/contact"
                        variant="accent"
                        className="justify-center"
                      >
                        Get Quote <ArrowRight size={16} />
                      </Button>

                      <Button
                        as="a"
                        href={WhatsAppLink({
                          text: `Hello SB Enterprises, I need details for ${c.name}.`,
                        })}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline"
                        className="justify-center"
                      >
                        <FaWhatsapp size={18} />
                        WhatsApp
                      </Button>
                    </div>

                    {/* Mini footer strip */}
                    <div className="mt-4 rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-primary2/10 to-accent2/10 p-3">
                      <p className="text-xs font-extrabold">
                        Fast execution • Premium finishing
                      </p>
                      <p className="text-[11px] text-muted mt-1">
                        Share size + quantity + delivery location for best pricing.
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
      </div>

      {/* ================= EMPTY STATE (for real empty, after user search/filter) ================= */}
      {filteredCards.length === 0 && query.trim() && (
        <div className="mt-10 rounded-2xl border border-border bg-white p-8 shadow-soft text-center">
          <p className="text-lg font-extrabold">No matching categories</p>
          <p className="mt-2 text-sm text-muted">
            Try another keyword or select “All”.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Button onClick={() => setQuery("")} variant="outline">
              Clear Search
            </Button>
            <Button onClick={() => setFilter("All")} variant="accent">
              Reset Filter
            </Button>
          </div>
        </div>
      )}

      {/* ================= Bottom CTA ================= */}
      <div className="mt-12 rounded-2xl border border-border bg-white p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary2">Need quick pricing?</p>
          <p className="text-lg font-extrabold">
            Send your requirement and get a fast quotation.
          </p>
          <p className="text-sm text-muted mt-1">
            Example: “10 roll-up standees 6×2.5, delivery in Panvel”
          </p>
        </div>
        <Button as={Link} to="/contact" variant="accent">
          Request Pricing / Quote
        </Button>
      </div>
    </Container>
  );
}
