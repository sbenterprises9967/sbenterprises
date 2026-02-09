import rollup from "../assets/rollup-standees.png";
import gazebo from "../assets/gazebo-tent.png";
import umbrellas from "../assets/promotional-umbrellas.png";
import signboards from "../assets/sign-boards.png";
import stationery from "../assets/stationery-set.png";


// "+91 86920 08530",
export const SITE = {
  brand: "SB Enterprises",
  tagline: "the complete solution for in & outdoor promotions",
  // From your visiting card PDF
  phones: ["+91 99670 03453",  "+91 99875 91006",  ],
  email: "sbenterprises31@gmail.com",
  website: "www.sbenterprises.info",
  address:
    "Shree Gayatri CHS., Shop No. 12, Sector 11, Khanda Colony, New Panvel - 410206.",
  proprietor: "Mr. Bhagwan Jangam",
};

export const HIGHLIGHTS = [
  { title: "Since 2006", desc: "Trusted manufacturing & printing partner." },
  { title: "Indoor + Outdoor", desc: "Complete promotional solutions under one roof." },
  { title: "Fast Turnaround", desc: "Quick execution with quality finishing." },
  { title: "Strong Materials", desc: "Robust construction & elevated durability." },
];

export const SERVICES = [
  "Digital Printing",
  "ECO Solvent Printing",
  "Offset Printing",
  "Sign Boards",
  "Roll-Up Standees",
  "Canopy / Gazebo Tents",
  "Promotional Umbrellas (All Types)",
  "Foam / Flex / Banner Printing",
  "Visiting Cards & Letterheads",
  "PVC Balloons",
  "No Parking Boards",
  "Promo Tables (PVC / MDF)",
];

export const PRODUCT_CATEGORIES = [
  {
    name: "Roll-Up Standees",
    image: rollup,
    short: "Portable, premium finishing, perfect for events & shops.",
    imagePrompt:
      "A high quality product photo of roll-up standees in a modern showroom, clean lighting, realistic, 4k, white background",
    items: [
      { name: "Size 4 x 2", note: "Compact & budget-friendly" },
      { name: "Size 6 x 2.5", note: "Most popular" },
      { name: "Size 6 x 3", note: "Extra visibility" },
    ],
  },
  {
    name: "Canopy / Gazebo Tents",
    image: gazebo,
    short: "Outdoor promotions, exhibitions, brand stalls.",
    imagePrompt:
      "A realistic outdoor promotional gazebo tent with branding space, clean sunny environment, 4k, professional product photography",
    items: [
      { name: "Canopy Tent", note: "Quick setup" },
      { name: "Gazebo Tent", note: "Premium stall look" },
    ],
  },
  {
    name: "Promotional Umbrellas",
    image: umbrellas,
    short: "Brand visibility for outdoor marketing.",
    imagePrompt:
      "A realistic product photo of promotional umbrellas in different sizes, clean background, high detail, 4k",
    items: [
      { name: "Garden Umbrella", note: "For cafes / outdoor areas" },
      { name: "All Types Umbrella", note: "Custom branding" },
    ],
  },
  {
    name: "Sign Boards & Safety Boards",
    image: signboards,
    short: "No Parking, direction boards, site boards, branding boards.",
    imagePrompt:
      "A realistic product photo collage of sign boards including no parking board, shop signboard, outdoor signage, 4k, clean layout",
    items: [
      { name: "No Parking Board", note: "Standard + custom" },
      { name: "Sign Board", note: "Indoor/outdoor" },
    ],
  },
  {
    name: "Printing Stationery",
    image: stationery,
    short: "Visiting cards, letterheads, brochures, posters.",
    imagePrompt:
      "A realistic premium stationery set showing visiting cards and letterheads on a desk, clean lighting, 4k",
    items: [
      { name: "Visiting Card", note: "Multiple finishes" },
      { name: "Letter Head", note: "Office stationery" },
      { name: "Offset Printing", note: "Bulk printing" },
    ],
  },
];


export const HOME_PUNCHES = [
  "Timely Execution of Projects",
  "100% Satisfied Clients",
  "Quality Products Delivered",
  "Increased Brand Awareness",
];

export const WHAT_WE_PROVIDE = [
  "Roll-up Standee",
  "Luxury Roll-up Standee",
  "Canopy/Tent",
  "Easel Stand",
  "Garden Umbrella Metal Stand",
  "Garden Umbrella Tripod Stand",
  "Gazebo Tent",
  "LD Foam Banners",
  "Promo Table",
  "PVC Balloons",
  "Queue Manager",
  "Umbrella 2 Fold",
  "Umbrella - Golf",
  "Umbrella J-Handle",
];

export const HOME_PROGRESS = [
  { label: "Satisfied Clients", value: 100 },
  { label: "Promotional Work", value: 90 },
  { label: "Design Work", value: 80 },
];

/**
 * CLIENT LOGOS (you can place images in src/assets/clients/)
 * Use the same logo names for easy mapping.
 */
export const CLIENTS = [
  { name: "Asian", file: "asian.png" },
  { name: "HDFC", file: "hdfc.png" },
  { name: "HDFC 2", file: "hdfc-1.png" },
  { name: "IDFC", file: "ida.png" },
  { name: "IIFL", file: "iifl.png" },
  { name: "Kotak", file: "kotak.png" },
];
