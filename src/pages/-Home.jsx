// src/pages/Home.jsx
import React from "react";
import Container from "../components/common/Container.jsx";
import Button from "../components/common/Button.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Reveal from "../components/common/Reveal.jsx";
import AnimatedCounter from "../components/common/AnimatedCounter.jsx";
// import heroImage from "../assets/hero-collage.png";
import heroImage1 from "../assets/hero-collage.png";
import heroImage2 from "../assets/hero-slider-1.png";
import heroImage3 from "../assets/hero-slider-2.png";
import promoStandee from "../assets/home-promo-standee.jpg";
import printingMachine from "../assets/home-printing-machine.jpg";

import WhatWeProvideSection from "../components/home/WhatWeProvideSection.jsx";




import { Link } from "react-router-dom";
import {
    SITE,
    HOME_PUNCHES,
    WHAT_WE_PROVIDE,
    HOME_PROGRESS,
    CLIENTS,
} from "../data/site.js";

import {
    Play,
    Pause,
    Megaphone,
    Flag,
    BadgeCheck,
    LayoutPanelTop,
    Tent,
    Umbrella,
    Signpost,
    Printer,
    TrendingUp,
    ChevronDown,
    ChevronUp,
} from "lucide-react";


/* ✅ Premium “What we provide” icon mapping */
const PROVIDE_ICONS = {
    "Roll-up Standee": LayoutPanelTop,
    "Luxury Roll-up Standee": BadgeCheck,
    "Canopy/Tent": Tent,
    "Gazebo Tent": Tent,
    "Garden Umbrella Metal Stand": Umbrella,
    "Garden Umbrella Tripod Stand": Umbrella,
    "Umbrella 2 Fold": Umbrella,
    "Umbrella - Golf": Umbrella,
    "Umbrella J-Handle": Umbrella,
    "LD Foam Banners": Flag,
    "Promo Table": Megaphone,
    "PVC Balloons": Megaphone,
    "Queue Manager": BadgeCheck,
    "Sign Boards": Signpost,
};

//Hero Slider
function HeroSlider() {
    const slides = [
        { src: heroImage3, alt: "SB Enterprises Welcome Page" },
        { src: heroImage1, alt: "SB Enterprises promotional products collage" },
        { src: heroImage2, alt: "SB Enterprises promotional solutions" },
    ];

    const [index, setIndex] = React.useState(0);
    const [paused, setPaused] = React.useState(false);

    React.useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setIndex((p) => (p + 1) % slides.length);
        }, 3500);
        return () => clearInterval(id);
    }, [paused, slides.length]);

    const goTo = (i) => setIndex(i);

    return (
        <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border"
            onMouseEnter={() => setPaused(true)}   // ✅ pause on hover (desktop)
            onMouseLeave={() => setPaused(false)}  // ✅ resume on leave
            onTouchStart={() => setPaused(true)}   // ✅ pause on touch (mobile)
            onTouchEnd={() => setPaused(false)}    // ✅ resume after touch
            aria-label="Hero image slider"
        >
            {slides.map((s, i) => (
                <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                    loading={i === 0 ? "eager" : "lazy"}
                />
            ))}

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            {/* ✅ Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-transparent px-4 py-2 shadow-soft border border-white/20">
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-2.5 w-2.5 rounded-full transition ${i === index
                                ? "bg-white scale-110"
                                : "bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="h-4 w-px bg-white/30" />

                {/* Pause / Play */}
                <button
                    onClick={() => setPaused((p) => !p)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition"
                    aria-label={paused ? "Play slider" : "Pause slider"}
                    type="button"
                >
                    {paused ? (
                        <>
                            <Play size={14} />
                        </>
                    ) : (
                        <>
                            <Pause size={14} />
                        </>
                    )}
                </button>
            </div>

        </div>
    );
}


/* ✅ runs TRUE only once when element becomes visible */
function useInViewOnce(options = { threshold: 0.25 }) {
    const ref = React.useRef(null);
    const [inView, setInView] = React.useState(false);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                obs.disconnect(); // run only once
            }
        }, options);

        obs.observe(el);
        return () => obs.disconnect();
    }, [options]);

    return { ref, inView };
}

/* ✅ Stable + Premium Circular Progress (animates 0 → target only when visible) */
function CircularProgress({ label, value, delay = 0, icon: Icon = TrendingUp }) {
    const size = 140;
    const stroke = 10;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;

    const target = Math.max(0, Math.min(100, Number(value || 0)));
    const [pct, setPct] = React.useState(0);

    // start only when visible
    const { ref, inView } = useInViewOnce({ threshold: 0.3 });

    React.useEffect(() => {
        if (!inView) return; // ✅ IMPORTANT (this was missing in your version)

        let raf = 0;
        let start = null;

        const startAfter = setTimeout(() => {
            const step = (t) => {
                if (!start) start = t;
                const progress = Math.min((t - start) / 900, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                setPct(Math.round(target * eased));
                if (progress < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, delay * 1000);

        return () => {
            clearTimeout(startAfter);
            cancelAnimationFrame(raf);
        };
    }, [inView, target, delay]);

    const dash = (pct / 100) * c;

    return (
        <div ref={ref}>
            <Reveal delay={delay}>
                <div className="group rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1">
                    <div className="flex items-center gap-5">
                        {/* Ring */}
                        <div className="relative" style={{ width: size, height: size }}>
                            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
                                {/* base */}
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={r}
                                    fill="none"
                                    stroke="currentColor"
                                    className="text-border"
                                    strokeWidth={stroke}
                                />
                                {/* progress */}
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={r}
                                    fill="none"
                                    stroke="currentColor"
                                    className="text-primary"
                                    strokeWidth={stroke}
                                    strokeLinecap="round"
                                    strokeDasharray={`${dash} ${c - dash}`}
                                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                                />
                            </svg>

                            {/* center */}
                            <div className="absolute inset-0 grid place-items-center">
                                <div className="text-center">
                                    <div className="mx-auto mb-2 h-11 w-11 rounded-2xl bg-bg border border-border grid place-items-center">
                                        <Icon size={18} className="text-primary2" />
                                    </div>
                                    <div className="text-3xl font-extrabold leading-none">{pct}%</div>
                                    {/* <div className="mt-1 text-[11px] font-semibold text-muted">
                    PERFORMANCE
                  </div> */}
                                </div>
                            </div>
                        </div>

                        {/* text */}
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-primary2">Metric</p>
                            <p className="mt-1 text-lg font-extrabold leading-snug">{label}</p>
                            <p className="mt-2 text-sm text-muted leading-relaxed">
                                Consistent delivery with professional finishing and dependable output.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold text-muted">
                                    Quality
                                </span>
                                <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold text-muted">
                                    Timely
                                </span>
                                <span className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold text-muted">
                                    Trusted
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}

export default function Home() {
    return (
        <div>
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute top-10 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary2/20 blur-3xl" />
                </div>

                <Container className="py-14 sm:py-20">
                    <div className="grid gap-10 lg:grid-cols-2 items-center">
                    {/* <div className=" flex flex-col-reverse sm:flex-row gap-6"> */}
                        <div>
                            <Reveal>
                                <div className="grid grid-cols-2 gap-3">
                                    {HOME_PUNCHES.map((t) => (
                                        <div
                                            key={t}
                                            className="rounded-2xl border border-border bg-white p-4 shadow-soft"
                                        >
                                            <p className="text-sm font-extrabold">{t}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight">
                                    {SITE.brand}
                                </h1>
                                <p className="mt-2 text-lg sm:text-xl text-muted">{SITE.tagline}</p>
                                <p className="mt-4 text-muted">
                                    <span className="font-bold text-text">
                                        “A great promotion doesn’t push a product; it pulls people in.”
                                    </span>
                                </p>
                                <p className="mt-4 text-muted max-w-xl">
                                    We create impactful indoor & outdoor promotions that elevate brands,
                                    captivate audiences, and drive results.
                                </p>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                                    <Button as={Link} to="/about" variant="accent">
                                        KNOW MORE
                                    </Button>
                                    <Button as={Link} to="/contact" variant="outline">
                                        CONTACT US
                                    </Button>
                                </div>
                            </Reveal>
                        </div>

                        {/* HERO IMAGE + COUNTERS */}
                        <Reveal delay={0.15}>
                            <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
                                {/* <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <img
                    src={heroImage}
                    alt="SB Enterprises promotional products"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div> */}

                                <HeroSlider />


                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="rounded-2xl border border-border bg-bg p-4 text-center">
                                        <p className="text-sm text-muted">Promotions Done</p>
                                        <p className="text-xl font-extrabold">
                                            <AnimatedCounter to={25} suffix="k+" />
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border bg-bg p-4 text-center">
                                        <p className="text-sm text-muted">Years of Experience</p>
                                        <p className="text-xl font-extrabold">
                                            <AnimatedCounter to={18} suffix="+" />
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border bg-bg p-4 text-center">
                                        <p className="text-sm text-muted">Satisfied Clients</p>
                                        <p className="text-xl font-extrabold">
                                            <AnimatedCounter to={500} suffix="+" />
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border bg-bg p-4 text-center">
                                        <p className="text-sm text-muted">Team Members</p>
                                        <p className="text-xl font-extrabold">
                                            <AnimatedCounter to={25} suffix="+" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* WHAT WE PROVIDE (PREMIUM STYLE 2) */}
            <section className="py-14 sm:py-18 relative overflow-hidden">
                <WhatWeProvideSection initialCount={8} />
                
            </section>


            {/* home-promo-standee home-printing-machine NEW HOME SECTION */}
            <section className="py-14 sm:py-18">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-2 items-stretch">

                        {/* LEFT: Full height vertical image (slides from LEFT) */}
                        <Reveal direction="left">
                            <div className="h-full rounded-3xl border border-border bg-white p-3 shadow-soft">
                                <div className="h-full rounded-2xl overflow-hidden border border-border">
                                    <img
                                        src={promoStandee}
                                        alt="Roll-up standee promotional design"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </Reveal>

                        {/* RIGHT: image + content (slides from RIGHT) */}
                        <Reveal direction="right" delay={0.15}>
                            <div className="h-full flex flex-col group">

                                {/* top image */}
                                <div className="rounded-3xl border border-border bg-white p-3 shadow-soft">
                                    <div className="rounded-2xl overflow-hidden border border-border">
                                        <img
                                            src={printingMachine}
                                            alt="Digital printing machine in action"
                                            className="w-full h-[240px] sm:h-[280px] object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* content */}
                                <div className="mt-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* badge */}
                                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-xs font-extrabold text-primary2">
                                            <span className="h-2 w-2 rounded-full bg-primary2" />
                                            PREMIUM PRINTING + OUTDOOR PROMOTIONS
                                        </div>

                                        {/* headline with animated underline */}
                                        <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                                            <span className="quote-underline">
                                                “A great promotion doesn’t push a product; it pulls people in.”
                                            </span>
                                        </h3>

                                        <p className="mt-4 text-muted leading-relaxed">
                                            At <span className="font-bold text-text">SB Enterprises</span>, we create impactful
                                            indoor & outdoor promotions that elevate brands and attract customers.
                                            From standees to sign boards, canopy tents and digital printing —
                                            everything is built with strong materials and premium finishing.
                                        </p>

                                        {/* premium bullets */}
                                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                            <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
                                                <p className="text-sm font-extrabold">High Visibility</p>
                                                <p className="mt-1 text-xs text-muted">Bold prints that stand out</p>
                                            </div>
                                            <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
                                                <p className="text-sm font-extrabold">Durable Output</p>
                                                <p className="mt-1 text-xs text-muted">Strong materials & finishing</p>
                                            </div>
                                            <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
                                                <p className="text-sm font-extrabold">Fast Delivery</p>
                                                <p className="mt-1 text-xs text-muted">Timely execution you can trust</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA buttons */}
                                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                        <Button as={Link} to="/about" variant="accent">
                                            KNOW MORE
                                        </Button>
                                        <Button as={Link} to="/contact" variant="outline">
                                            GET QUOTE
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </Container>
            </section>

            {/* ✅ PERFORMANCE (CIRCULAR – ON VIEW) */}
            <section className="py-14 sm:py-18 bg-white border-y border-border">
                <Container>
                    <SectionTitle
                        eyebrow="PERFORMANCE"
                        title="We deliver results you can trust"
                        desc="Quality work, timely execution and dependable output."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {HOME_PROGRESS.map((p, i) => (
                            <CircularProgress
                                key={p.label}
                                label={p.label}
                                value={p.value}
                                delay={Math.min(0.25, i * 0.06)}
                                icon={TrendingUp}
                            />
                        ))}
                    </div>
                </Container>
            </section>

            {/* CLIENTS */}
            <section className="py-14 sm:py-18">
                <Container>
                    <SectionTitle
                        eyebrow="CLIENTS"
                        title="Brands we’ve worked with"
                        desc="A glimpse of our trusted client network."
                    />

                    <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                        {CLIENTS.map((c) => (
                            <div
                                key={c.name}
                                className="rounded-2xl border border-border bg-white p-4 shadow-soft grid place-items-center"
                            >
                                <div className="h-14 w-full rounded-xl border border-border bg-bg grid place-items-center overflow-hidden">
                                    <img
                                        src={`${import.meta.env.BASE_URL}clients/${c.file}`}
                                        alt={c.name}
                                        className="h-10 object-contain transition"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="mt-2 text-xs font-bold text-muted">{c.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Button as={Link} to="/clients" variant="outline">
                            View All Clients
                        </Button>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="pb-16">
                <Container>
                    <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-primary2/10 to-accent/10 p-6 sm:p-10 shadow-soft">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            <div className="max-w-2xl">
                                <p className="text-sm font-semibold text-primary2">CONTACT US NOW</p>
                                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold">
                                    Marketing Solutions for Your Business’s Growth
                                </h3>
                                <p className="mt-3 text-muted">
                                    Promotion is not just about selling; it’s about creating an experience customers remember.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button as={Link} to="/contact" variant="accent">
                                    CONTACT US
                                </Button>
                                <Button as={Link} to="/services" variant="outline">
                                    KNOW MORE
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
