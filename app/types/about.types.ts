export interface AboutOverview {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface MissionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Mission {
  title: string;
  items: MissionItem[];
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  overview: AboutOverview;
  mission: Mission;
  values: Value[];
}
