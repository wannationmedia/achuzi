import {
  Landmark,
  Scale,
  HeartPulse,
  Briefcase,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Music2,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export type Pillar = {
  id: string;
  label: string;
  tagline: string;
  blurb: string;
  icon: LucideIcon;
  href: string;
};

export const pillars: Pillar[] = [
  {
    id: "civic",
    label: "Civic",
    tagline: "Government made simple",
    blurb:
      "Plain-language help with IDs, permits, municipal services and your rights as a citizen.",
    icon: Landmark,
    href: "/chat?topic=civic",
  },
  {
    id: "legal",
    label: "Legal",
    tagline: "Know your rights",
    blurb: "Understand your rights, documents and next steps — in your own language.",
    icon: Scale,
    href: "/chat?topic=legal",
  },
  {
    id: "health",
    label: "Health",
    tagline: "Guidance for a healthier you",
    blurb: "Everyday health guidance, clinic info and gentle reminders. Not a diagnosis.",
    icon: HeartPulse,
    href: "/chat?topic=health",
  },
  {
    id: "work",
    label: "Work",
    tagline: "Productivity for real life",
    blurb: "CVs, job search, daily planning and getting things done.",
    icon: Briefcase,
    href: "/chat?topic=work",
  },
  {
    id: "learn",
    label: "Learn",
    tagline: "Knowledge without limits",
    blurb: "Explain anything simply — school work, new skills, exam prep.",
    icon: GraduationCap,
    href: "/chat?topic=learn",
  },
  {
    id: "create",
    label: "Create",
    tagline: "Turn ideas into impact",
    blurb: "Turn an idea into a plan, a post, a track, a pitch — in minutes.",
    icon: Sparkles,
    href: "/chat?topic=create",
  },
  {
    id: "capital",
    label: "Capital",
    tagline: "Financial literacy and growth",
    blurb: "Budgeting, saving, stokvels and understanding money better.",
    icon: TrendingUp,
    href: "/chat?topic=capital",
  },
  {
    id: "play",
    label: "Play",
    tagline: "Culture, music and entertainment",
    blurb: "Music, culture, stories and entertainment rooted in Venda heritage.",
    icon: Music2,
    href: "/chat?topic=play",
  },
  {
    id: "safety",
    label: "Safety",
    tagline: "Always with you, one step ahead",
    blurb: "Protection Mode: live guidance, evidence and emergency contacts.",
    icon: ShieldAlert,
    href: "/protection",
  },
];
