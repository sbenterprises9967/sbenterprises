import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import Footer from "../components/layout/Footer.jsx";
import WhatsAppFloat from "../components/common/WhatsAppFloat.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </main>

      <WhatsAppFloat
        phone="919967003453"
        message="Hello SB Enterprises, I want enquiry."
      />

      <Footer />
    </div>
  );
}
