import React, { useState } from "react";
import Container from "../components/common/Container.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";
import Button from "../components/common/Button.jsx";
import { SITE } from "../data/site.js";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Simple "mailto" submit (no backend)
  const mailto = () => {
    const subject = encodeURIComponent("Quote Request - SB Enterprises");
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nRequirement:\n${form.requirement}`
    );
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Container className="py-12">
      <SectionTitle
        eyebrow="CONTACT"
        title="Get in touch"
        desc="Call, email, or send your requirement. We’ll respond quickly with the best solution."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <p className="font-extrabold">Send Requirement</p>

          <div className="mt-4 grid gap-3">
            <input
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary2/30"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={onChange}
            />
            <input
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary2/30"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={onChange}
            />
            <input
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary2/30"
              placeholder="Email (optional)"
              name="email"
              value={form.email}
              onChange={onChange}
            />
            <textarea
              className="min-h-[140px] w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary2/30"
              placeholder="Example: Need 10 roll-up standees 6x2.5, design + printing, delivery in Panvel"
              name="requirement"
              value={form.requirement}
              onChange={onChange}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button as="a" href={mailto()} variant="accent">
                Send Email
              </Button>
              <Button as="a" href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} variant="outline">
                Call Now
              </Button>
            </div>

            <p className="text-xs text-muted">
              Note: This form uses your email app (no backend). If you want WhatsApp or database saving, tell me and I’ll add it.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <p className="font-extrabold">Contact Details</p>

          <div className="mt-4 grid gap-3 text-sm">
            {SITE.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg px-4 py-3 hover:bg-white"
              >
                <Phone size={16} className="text-primary" />
                {p}
              </a>
            ))}

            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg px-4 py-3 hover:bg-white"
            >
              <Mail size={16} className="text-primary2" />
              {SITE.email}
            </a>

            <div className="rounded-xl border border-border bg-bg px-4 py-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-accent" />
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-muted mt-1">{SITE.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-gradient-to-r from-primary/10 via-primary2/10 to-accent2/10 px-4 py-3">
              <p className="font-bold">Website</p>
              <p className="text-muted mt-1">{SITE.website}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
