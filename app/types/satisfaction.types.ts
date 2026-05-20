export interface SatisfactionMetric {
  id: string;
  title: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
  color: "orange" | "yellow";
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
}

export type SatisfactionData = SatisfactionMetric[];
export type TestimonialsData = Testimonial[];
