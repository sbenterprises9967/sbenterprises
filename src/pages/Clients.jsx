import React from "react";
import Container from "../components/common/Container.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Reveal from "../components/common/Reveal.jsx";
import { CLIENTS } from "../data/site.js";

export default function Clients() {
  return (
    <Container className="py-12">
      <SectionTitle
        eyebrow="CLIENTS"
        title="Brands we’ve worked with"
        desc="Some of our trusted clients."
      />

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {CLIENTS.map((c, i) => (
          <Reveal key={c.name} delay={Math.min(0.25, i * 0.03)}>
            <div className="rounded-2xl border border-border bg-white p-4 shadow-soft grid place-items-center">
              <div className="h-14 w-full rounded-xl border border-border bg-bg grid place-items-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}clients/${c.file}`}
                  alt={c.name}
                  className="h-10 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `${import.meta.env.BASE_URL}vite.svg`;
                  }}
                />
              </div>

              <p className="mt-2 text-xs font-bold text-muted">{c.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
