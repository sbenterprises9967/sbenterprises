import React from "react";
import Container from "../components/common/Container.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Reveal from "../components/common/Reveal.jsx";
import Button from "../components/common/Button.jsx";
import aboutBanner from "../assets/about-banner.png";
import { SITE } from "../data/site.js";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Award, Clock, Users, Factory } from "lucide-react";

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-soft flex items-center gap-3">
      <div className="h-11 w-11 rounded-2xl bg-bg border border-border grid place-items-center">
        <Icon size={18} className="text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted font-semibold">{label}</p>
        <p className="text-lg font-extrabold">{value}</p>
      </div>
    </div>
  );
}

function PromiseItem({ children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 h-9 w-9 rounded-2xl bg-white/70 border border-border grid place-items-center">
        <CheckCircle2 size={18} className="text-primary2" />
      </div>
      <p className="text-sm text-muted leading-relaxed">{children}</p>
    </div>
  );
}

export default function About() {
  return (
    <Container className="py-12">
      {/* ================= HERO BANNER (PREMIUM) ================= */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-soft">
          <img
            src={aboutBanner}
            alt="About SB Enterprises"
            className="w-full h-[280px] sm:h-[360px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
          <div className="absolute inset-0">
            <div className="h-full flex items-center">
              <div className="px-6 sm:px-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                  <Award size={16} />
                  Trusted Promotion Partner
                </div>

                <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  Building Brand Visibility with Premium Promotional Solutions
                </h1>

                <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed">
                  SB Enterprises delivers durable, high-impact indoor & outdoor promotion
                  products — with strong materials, premium finishing, and reliable execution.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button as={Link} to="/contact" variant="accent" className="w-full sm:w-auto">
                    Get a Quote <ArrowRight size={16} />
                  </Button>
                  <Button as={Link} to="/work-gallery" variant="outline" className="w-full sm:w-auto">
                    View Work Gallery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ================= STATS ROW ================= */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <Stat icon={Factory} label="Established" value="Since 2006" />
        </Reveal>
        <Reveal delay={0.05}>
          <Stat icon={Users} label="Trusted Clients" value="500+ (Approx.)" />
        </Reveal>
        <Reveal delay={0.1}>
          <Stat icon={Clock} label="Turnaround" value="Fast Execution" />
        </Reveal>
        <Reveal delay={0.15}>
          <Stat icon={Award} label="Output Quality" value="Premium Finish" />
        </Reveal>
      </div>

      {/* ================= PAGE TITLE ================= */}
      <div className="mt-12">
        <SectionTitle
          eyebrow="ABOUT"
          title="Who We Are"
          desc="A complete solution for indoor & outdoor promotions — from design to print and production."
        />
      </div>

      {/* ================= CONTENT (PREMIUM LAYOUT) ================= */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* LEFT (Story + Proprietor) */}
        <Reveal>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold text-primary2">Our Story</p>
            <h3 className="mt-2 text-xl font-extrabold">Reliable. Durable. High-Visibility.</h3>

            <p className="mt-3 text-muted leading-relaxed">
              SB Enterprises is a trusted manufacturer and printing partner focused on in & outdoor promotions.
              We support businesses with banners, standees, tents, umbrellas, sign boards and printing stationery —
              built for robust use and clean finishing.
            </p>

            {/* Timeline style */}
            <div className="mt-6 rounded-2xl border border-border bg-bg p-5">
              <p className="font-bold text-sm">What we focus on</p>
              <div className="mt-4 grid gap-3">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary2" />
                  <p className="text-sm text-muted">Quality materials & strong construction</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary2" />
                  <p className="text-sm text-muted">Premium finishing for professional branding</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary2" />
                  <p className="text-sm text-muted">Timely execution & reliable delivery</p>
                </div>
              </div>
            </div>

            {/* Proprietor */}
            <div className="mt-6 rounded-2xl border border-border bg-white p-5">
              <p className="text-sm font-bold">Proprietor</p>
              <p className="text-sm text-muted mt-1">{SITE.proprietor}</p>
            </div>
          </div>
        </Reveal>

        {/* RIGHT (Promise as icon list + CTA) */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-primary2/10 to-accent2/10 p-6 shadow-soft">
            <p className="text-sm font-semibold text-primary2">Our Promise</p>
            <h3 className="mt-2 text-xl font-extrabold">Premium Output. Professional Experience.</h3>

            <div className="mt-5 grid gap-4">
              <PromiseItem>Durable materials & strong construction for long usage.</PromiseItem>
              <PromiseItem>Easy installation and clean, premium finishing.</PromiseItem>
              <PromiseItem>Fast turnaround with reliable delivery support.</PromiseItem>
              <PromiseItem>Custom branding for events, shops, exhibitions & campaigns.</PromiseItem>
            </div>

            {/* CTA strip */}
            <div className="mt-6 rounded-2xl border border-border bg-white/70 backdrop-blur p-5">
              <p className="font-bold text-sm">Want to promote your brand?</p>
              <p className="text-sm text-muted mt-1">
                Share your size, quantity, and location — we’ll suggest the best product & give you quick pricing.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button as={Link} to="/products" variant="outline" className="w-full sm:w-auto">
                  Explore Products
                </Button>
                <Button as={Link} to="/contact" variant="accent" className="w-full sm:w-auto">
                  Request Quote <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <p className="mt-5 text-xs text-muted">
              Tip: Add real project photos in Work Gallery for stronger trust.
            </p>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
