import type {
  SatisfactionMetric,
  Testimonial,
} from "@/app/types/satisfaction.types";

export const SATISFACTION_DATA: SatisfactionMetric[] = [
  {
    id: "1",
    title: "Client Satisfaction",
    value: 85,
    suffix: "%",
    description: "Of our clients are highly satisfied with our services",
    icon: "smile",
    color: "orange",
  },
  {
    id: "2",
    title: "Net Promoter Score",
    value: 44,
    suffix: "",
    description: "Strong recommendation rate from our clients",
    icon: "trendingUp",
    color: "yellow",
  },
  {
    id: "3",
    title: "On-Time Delivery",
    value: 79,
    suffix: "%",
    description: "Projects delivered on or before deadline",
    icon: "clock",
    color: "orange",
  },
  {
    id: "4",
    title: "Budget Accuracy",
    value: 42,
    suffix: "%",
    description: "Projects completed within budget variance",
    icon: "target",
    color: "yellow",
  },
  {
    id: "5",
    title: "Client Retention",
    value: 39,
    suffix: "%",
    description: "Clients who return for additional projects",
    icon: "repeat",
    color: "orange",
  },
];

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "SAB",
    company: "Saudi Arabian Bottling Company",
    quote: "Exceptional project management and attention to detail",
  },
  {
    id: "2",
    name: "KAFD",
    company: "King Abdullah Financial District",
    quote: "Professional service and timely delivery",
  },
  {
    id: "3",
    name: "NEOM",
    company: "NEOM Tonomus",
    quote: "Innovative approach and quality execution",
  },
];
