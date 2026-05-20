import { LucideIcon } from "lucide-react";

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: "orange" | "yellow";
}

export type StatsData = readonly Stat[];
