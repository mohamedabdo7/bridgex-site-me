export interface Leadership {
  id: string;
  name: string;
  title: string;
  role: string;
  email: string;
  phone: string;
  experience: string;
  image: string;
  bio: string;
  detailedBio: string[];
  expertise: string[];
  linkedin: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  experience: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin: string;
}

export interface TeamCapability {
  id: string;
  title: string;
  description: string;
}

export interface TeamCapabilitiesData {
  title: string;
  image: string;
  capabilities: TeamCapability[];
}

export interface TeamStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export type TeamStatsData = TeamStat[];
