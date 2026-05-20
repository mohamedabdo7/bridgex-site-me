import { UNSPLASH_IMAGES } from "@/app/lib/unsplash-images";

export const TEAM_CAPABILITIES = {
  title: "Our Team",
  image:
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
  capabilities: [
    {
      id: "1",
      title: "Experienced & Mobile Team",
      description:
        "BridgeX's Riyadh office is powered by a dedicated team of professionals specialized in project supervision, coordination, and quality control. Our team is fully mobilized across sites and office environments, ensuring real-time presence and responsiveness.",
    },
    {
      id: "2",
      title: "A Century of Site Expertise at Your Service",
      description:
        "BridgeX's team each with a minimum of 5 years of experience, collectively offering more than 100 years of site expertise. With senior architect, electrical, mechanical, operations, cost estimator/QS, and project managers backgrounds—our team covers every critical scope—providing clients with a full coordinated package.",
    },
    {
      id: "3",
      title: "Reliable Communication & Control",
      description:
        "With dedicated project managers and technical leads always accessible, communication remains clear, structured, and proactive. This seamless integration between site and office keeps the project on track—with complete visibility and peace of mind.",
    },
  ],
};

export const LEADERSHIP = {
  id: "1",
  name: "Ali Saleh",
  title: "Eng.",
  role: "General Manager - BridgeX",
  email: "ali.saleh@BridgeXsa.com",
  phone: "+966 537 522 537",
  experience: "15+ years",
  image: UNSPLASH_IMAGES.team.aliSaleh,
  bio: "Having more than 15 years of experience in the market, leading and managing complex developments with a background in Architecture.",
  detailedBio: [
    "Known for his structured leadership and client-focused approach, Eng. Ali has built a reputation for bridging the gap between design intent and construction reality. His deep understanding of PMO systems, risk management strategies, and stakeholder management has positioned BridgeX as a trusted advisor to the clients.",
    "Under his management BridgeX's team acquired full expertise in different sectors of construction, delivered well - coordinated services, and high-quality technical standards.",
  ],
  expertise: [
    "Strategic Leadership",
    "PMO Systems",
    "Risk Management",
    "Stakeholder Management",
    "Architecture Background",
    "Complex Developments",
  ],
  linkedin: "#",
};

export const TEAM_STATS = [
  {
    id: "1",
    value: "30+",
    label: "Team Members",
    icon: "users",
  },
  {
    id: "2",
    value: "90+",
    label: "Years Combined Experience",
    icon: "award",
  },
  {
    id: "3",
    value: "100%",
    label: "Professional Certification",
    icon: "checkCircle",
  },
];
