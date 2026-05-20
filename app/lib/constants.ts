export const COMPANY_INFO = {
  name: "BridgeX",
  tagline: "Building Futures with Precision",
  description:
    "A specialized Project Management Consultancy firm delivering expert PMC, PMO, and Supervision services across the Kingdom of Saudi Arabia.",
  email: "ali.saleh@BridgeXsa.com",
  phone: "+966 537 522 537",
  phone2: "+966 53 209 1728",
  website: "www.BridgeXsa.com",
  location: "Riyadh, Saudi Arabia",
} as const;

export const BRAND_COLORS = {
  primary: "#FF6B35",
  secondary: "#FCB206",
  black: "#0A0A0A",
  white: "#FFFFFF",
} as const;

export const COLORS = {
  primary: "#FF6B35", // Orange - 30% usage
  secondary: "#FCB206", // Yellow - 10% usage (accents only)
  black: "#0A0A0A",
  white: "#FFFFFF",
} as const;

export const STATS = [
  {
    id: "1",
    value: "500+",
    label: "Million Of Constructed Value",
    suffix: "M",
  },
  {
    id: "2",
    value: "90+",
    label: "Combined Years Of Experience",
    suffix: "Years",
  },
  { id: "3", value: "30+", label: "Professionals", suffix: "" },
  { id: "4", value: "15+", label: "Delivered Projects", suffix: "Projects" },
  { id: "5", value: "10+", label: "Clients", suffix: "" },
  { id: "6", value: "6+", label: "Services", suffix: "" },
  { id: "7", value: "3+", label: "Countries", suffix: "" },
  { id: "8", value: "2+", label: "Partnerships", suffix: "" },
] as const;

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES_LIST = [
  "Project Management",
  "Cost Management",
  "Contracts Management",
  "Construction Supervision",
  "Design Validation",
  "Technical Due Diligence",
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
