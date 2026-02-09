import React from "react";
import Container from "../common/Container.jsx";
import { SITE } from "../../data/site.js";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold">{SITE.brand}</p>
            <p className="mt-2 text-muted">{SITE.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              Trusted manufacturer & printing partner for high-impact promotions.
            </p>
          </div>

          <div>
            <p className="font-bold">Contact</p>
            <div className="mt-3 grid gap-2 text-sm">
              <a className="inline-flex items-center gap-2 hover:underline" href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}>
                <Phone size={16} /> {SITE.phones[0]}
              </a>
              <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${SITE.email}`}>
                <Mail size={16} /> {SITE.email}
              </a>
              <div className="inline-flex items-start gap-2 text-muted">
                <MapPin size={16} className="mt-0.5" /> {SITE.address}
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold">Quick Links</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <a className="hover:underline" href="#services">Services</a>
              <a className="hover:underline" href="#products">Products</a>
              <a className="hover:underline" href="#why-us">Why Us</a>
              <a className="hover:underline" href="#contact">Get Quote</a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted">
          <p>© {new Date().getFullYear()} {SITE.brand}. All rights reserved.</p>
          <p>Website: {SITE.website}</p>
        </div>
      </Container>
    </footer>
  );
}
