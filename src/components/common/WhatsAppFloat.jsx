import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat({
  phone = "919967003453",
  message = "Hello SB Enterprises, I want enquiry.",
}) {
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Enquire Now on WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        flex items-center gap-2
        rounded-full
        bg-[#25D366] text-white
        shadow-soft
        transition hover:scale-105
        h-14 px-4 sm:px-5
        animate-pulse

      "
    >
      {/* WhatsApp Icon (always visible) */}
      <FaWhatsapp size={26} />

      {/* Text → only visible on desktop */}
      <span className="hidden sm:inline font-extrabold text-sm tracking-wide">
        ENQUIRE NOW
      </span>
    </a>
  );
}
