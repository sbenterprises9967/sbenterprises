import React from "react";
import { Link } from "react-router-dom";
import {
    Megaphone,
    Printer,
    ChevronDown,
    ChevronUp,
    LayoutPanelTop,
    BadgeCheck,
    Tent,
    Umbrella,
    Flag,
    Signpost,
} from "lucide-react";

import Container from "../common/Container.jsx";
import Button from "../common/Button.jsx";
import Reveal from "../common/Reveal.jsx";

import { WHAT_WE_PROVIDE } from "../../data/site.js";
import { WE_PROVIDE_IMAGES, WE_PROVIDE_FALLBACK } from "../../assets/we-provide";

// ✅ DEFINE ICONS HERE (so no "not defined" error)
const PROVIDE_ICONS = {
    "Roll-up Standee": LayoutPanelTop,
    "Luxury Roll-up Standee": BadgeCheck,
    "Canopy/Tent": Tent,
    "Easel Stand": BadgeCheck,
    "Garden Umbrella Metal Stand": Umbrella,
    "Garden Umbrella Tripod Stand": Umbrella,
    "Gazebo Tent": Tent,
    "LD Foam Banners": Flag,
    "Promo Table": Megaphone,
    "PVC Balloons": Megaphone,
    "Queue Manager": BadgeCheck,
    "Umbrella 2 Fold": Umbrella,
    "Umbrella - Golf": Umbrella,
    "Umbrella J-Handle": Umbrella,
    "Sign Boards": Signpost,
};

export default function WhatWeProvideSection({ initialCount = 8 }) {
    const [expanded, setExpanded] = React.useState(false);
    const gridRef = React.useRef(null);
    const [activeItem, setActiveItem] = React.useState(null);


    const total = WHAT_WE_PROVIDE.length;
    const visibleCount = expanded ? total : Math.min(initialCount, total);
    const visibleItems = React.useMemo(
        () => WHAT_WE_PROVIDE.slice(0, visibleCount),
        [visibleCount]
    );

    const canToggle = total > initialCount;

    return (
        <section className="py-14 sm:py-18 relative overflow-hidden">
            {/* background blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-28 -left-20 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute top-24 -right-24 h-[420px] w-[420px] rounded-full bg-primary2/15 blur-3xl" />
                <div className="absolute -bottom-32 left-1/3 h-[520px] w-[520px] rounded-full bg-accent/15 blur-3xl" />
            </div>



            <Container>
                {/* header */}
                <Reveal>
                    <div className="rounded-2xl border border-border bg-white/70 backdrop-blur p-6 sm:p-8 shadow-soft">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div className="max-w-2xl">
                                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-xs font-extrabold text-primary2">
                                    <Megaphone size={16} />
                                    WHAT WE PROVIDE
                                </p>

                                <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                                    Your brand’s voice isn’t just in what you say —
                                    <span className="text-primary2"> it’s in how you promote it.</span>
                                </h2>

                                <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                                    Explore our core promotional products and solutions designed for high
                                    visibility, durability, and premium finishing.
                                </p>

                                {/* mobile-friendly chips */}
                                <div className="mt-5 -mx-1 flex gap-2 overflow-x-auto pb-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {["Indoor + Outdoor", "Custom Branding", "Premium Finish", "Fast Execution"].map(
                                        (t) => (
                                            <span
                                                key={t}
                                                className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-muted shadow-soft"
                                            >
                                                {t}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button as={Link} to="/products" variant="accent">
                                    Explore Products
                                </Button>
                                <Button as={Link} to="/contact" variant="outline">
                                    Request Quote
                                </Button>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* grid */}
                <div
                    ref={gridRef}
                    className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {visibleItems.map((p, i) => {
                        const Icon = PROVIDE_ICONS[p] || Printer;
                        const img = WE_PROVIDE_IMAGES[p] || WE_PROVIDE_FALLBACK;

                        return (
                            <Reveal key={p} delay={Math.min(0.25, i * 0.03)}>
                                <article
                                    onClick={() => setActiveItem({ title: p, img })}
                                    className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition hover:-translate-y-1">
                                    {/* image */}
                                    <div className="relative">
                                        <div className="aspect-[4/3] overflow-hidden">
                                            <img
                                                src={img}
                                                alt={p}
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />

                                        {/* badge */}
                                        {/* <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 rounded-full bg-white/85 backdrop-blur border border-white/30 px-3 py-2">
                        <div className="h-9 w-9 rounded-xl bg-bg border border-border grid place-items-center">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-text line-clamp-1">
                          {p}
                        </p>
                      </div>
                    </div> */}
                                    </div>

                                    {/* content */}
                                    <div className="p-5">
                                        <p className="text-sm text-muted leading-relaxed">
                                            Durable materials • Clean finishing • Custom sizes • Premium branding
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold text-muted">
                                                Durable
                                            </span>
                                            <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold text-muted">
                                                Outdoor Ready
                                            </span>
                                            <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold text-muted">
                                                Premium Finish
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>

                {/* show more */}
                {canToggle ? (
                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={() => {
                                const next = !expanded;
                                setExpanded(next);

                                // ✅ premium auto-scroll when opening
                                if (next) {
                                    setTimeout(() => {
                                        gridRef.current?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }, 150);
                                }
                            }}
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur px-6 py-3 text-sm font-extrabold text-text shadow-soft transition hover:-translate-y-0.5"
                            aria-expanded={expanded}
                        >
                            {expanded ? (
                                <>
                                    <ChevronUp size={18} className="text-primary" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={18} className="text-primary" />
                                    Show More
                                </>
                            )}
                            <span className="ml-1 text-xs font-semibold text-muted">
                                ({expanded ? total : `${visibleCount}/${total}`})
                            </span>
                        </button>
                    </div>
                ) : null}
            </Container>

            {/* ================= IMAGE MODAL ================= */}
            {activeItem && (
                <div
                    className="mt-8 fixed inset-0 z-[98798] bg-black/70 flex items-center justify-center px-4 py-6 sm:px-8"
                    onClick={() => setActiveItem(null)}
                >
                    <div
                        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setActiveItem(null)}
                            className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Image wrapper */}
                        <div className="flex items-center justify-center">
                            <img
                                src={activeItem.img}
                                alt={activeItem.title}
                                className="max-h-[85vh] w-auto max-w-full object-contain"
                            />
                        </div>

                        {/* Caption */}
                        <div className="p-4 text-center border-t border-border hidden">
                            <p className="font-extrabold">{activeItem.title}</p>
                            <p className="text-sm text-muted mt-1">
                                Premium promotional solution by SB Enterprises
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
