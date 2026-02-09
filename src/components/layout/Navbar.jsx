import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Container from "../common/Container.jsx";
import Button from "../common/Button.jsx";
import logo from "../../assets/sb-enterprises.png";
import { SITE } from "../../data/site.js";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  // { to: "/work-gallery", label: "Work Gallery" },

];

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl text-sm font-semibold transition ${isActive ? "bg-white text-primary shadow-soft" : "text-text hover:bg-white"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="SB Enterprises Logo"
              className="h-10 sm:h-12 w-31 object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              as="a"
              href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
            >
              <Phone size={16} />
              Call
            </Button>
            <Button as={Link} to="/contact" variant="accent">
              Get Quote
            </Button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-border bg-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open ? (
          <div className="md:hidden mt-3 rounded-2xl border border-border bg-white p-3 shadow-soft">
            <div className="grid gap-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                as="a"
                href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
              >
                Call
              </Button>
              <Button as={Link} to="/contact" variant="accent" onClick={() => setOpen(false)}>
                Get Quote
              </Button>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
