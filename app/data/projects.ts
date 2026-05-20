import { UNSPLASH_IMAGES } from "@/app/lib/unsplash-images";

export const PROJECTS_DATA = [
  // Commercial Projects
  {
    id: "1",
    title: "SAB Innovation Hub",
    category: "commercial",
    type: "Commercial",
    location: "Riyadh, Saudi Arabia",
    year: "2024",
    status: "completed",
    value: "100M+",
    description:
      "State-of-the-art innovation hub for Saudi Arabian Bottling Company, featuring modern office spaces and collaborative work environments.",
    image: UNSPLASH_IMAGES.projects.sabInnovation[0],
    services: ["Project Management", "Construction Supervision"],
    highlights: [
      "Modern office design",
      "Sustainable building practices",
      "Advanced technology integration",
    ],
  },
  {
    id: "2",
    title: "Mirai Headquarters",
    category: "commercial",
    type: "Commercial",
    location: "Riyadh, Saudi Arabia",
    year: "2023",
    status: "completed",
    value: "80M+",
    description:
      "Contemporary headquarters building designed for optimal functionality and aesthetic appeal.",
    image: UNSPLASH_IMAGES.projects.miraiHQ[0],
    services: ["Project Management", "Design Validation"],
    highlights: [
      "Contemporary architecture",
      "Energy-efficient systems",
      "Smart building technology",
    ],
  },
  {
    id: "3",
    title: "Savvy Headquarters",
    category: "commercial",
    type: "Commercial",
    location: "Riyadh, Saudi Arabia",
    year: "2023",
    status: "completed",
    value: "90M+",
    description:
      "Modern headquarters facility featuring innovative workspace design and cutting-edge amenities.",
    image: UNSPLASH_IMAGES.projects.savvyHQ[0],
    services: ["Project Management", "Cost Management"],
    highlights: [
      "Innovative workspace",
      "Premium finishes",
      "Collaborative spaces",
    ],
  },

  // Residential Projects
  {
    id: "4",
    title: "KAFD Residential",
    category: "residential",
    type: "Residential",
    location: "KAFD, Riyadh",
    year: "2024",
    status: "completed",
    value: "150M+",
    description:
      "Luxury residential development in King Abdullah Financial District featuring premium apartments and amenities.",
    image: UNSPLASH_IMAGES.projects.kafdResidential[0],
    services: [
      "Project Management",
      "Construction Supervision",
      "Cost Management",
    ],
    highlights: [
      "Luxury living spaces",
      "Premium amenities",
      "Strategic location",
    ],
  },
  {
    id: "5",
    title: "Salwan Tourism Project",
    category: "residential",
    type: "Residential",
    location: "Saudi Arabia",
    year: "2023",
    status: "completed",
    value: "120M+",
    description:
      "Tourism-focused residential development combining comfort with scenic beauty.",
    image: UNSPLASH_IMAGES.projects.salwanTourism[0],
    services: ["Project Management", "Technical Due Diligence"],
    highlights: [
      "Tourist destination",
      "Scenic location",
      "Recreational facilities",
    ],
  },
  {
    id: "6",
    title: "Abunayyan Residential",
    category: "residential",
    type: "Residential",
    location: "Riyadh, Saudi Arabia",
    year: "2023",
    status: "completed",
    value: "110M+",
    description:
      "High-quality residential complex with modern architecture and comprehensive facilities.",
    image: UNSPLASH_IMAGES.projects.abunayyan[0],
    services: ["Project Management", "Contracts Management"],
    highlights: [
      "Modern architecture",
      "Family-friendly design",
      "Quality construction",
    ],
  },

  // Fit-Out Projects
  {
    id: "7",
    title: "NEOM Tonomus Hub",
    category: "fitout",
    type: "Fit-Out",
    location: "NEOM, Saudi Arabia",
    year: "2024",
    status: "completed",
    value: "60M+",
    description:
      "Advanced technology hub fit-out for NEOM Tonomus, featuring futuristic design and smart systems.",
    image: UNSPLASH_IMAGES.projects.neomTonomus[0],
    services: ["Project Management", "Design Validation"],
    highlights: [
      "Futuristic design",
      "Advanced technology",
      "Innovation-focused",
    ],
  },
  {
    id: "8",
    title: "EIF Offices",
    category: "fitout",
    type: "Fit-Out",
    location: "Riyadh, Saudi Arabia",
    year: "2023",
    status: "completed",
    value: "40M+",
    description:
      "Professional office fit-out designed for efficiency and employee wellbeing.",
    image: UNSPLASH_IMAGES.projects.eif[0],
    services: ["Project Management", "Construction Supervision"],
    highlights: [
      "Professional workspace",
      "Ergonomic design",
      "Modern facilities",
    ],
  },
  {
    id: "9",
    title: "JASARA Offices",
    category: "fitout",
    type: "Fit-Out",
    location: "Saudi Arabia",
    year: "2023",
    status: "completed",
    value: "50M+",
    description:
      "Contemporary office fit-out project delivering high-quality work environments.",
    image: UNSPLASH_IMAGES.projects.jasara[0],
    services: ["Project Management", "Cost Management"],
    highlights: [
      "Contemporary design",
      "Quality finishes",
      "Functional layout",
    ],
  },
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All Projects", count: 9 },
  { id: "commercial", label: "Commercial", count: 3 },
  { id: "residential", label: "Residential", count: 3 },
  { id: "fitout", label: "Fit-Out", count: 3 },
];
