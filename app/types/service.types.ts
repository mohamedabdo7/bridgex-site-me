export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export type ServicesData = readonly Service[];
