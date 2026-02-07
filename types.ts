import { LucideIcon } from 'lucide-react';

export interface PlaygroundVertical {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // Tailwind color class stub
  image: string;
}

export interface Partner {
  name: string;
  role: string;
  logoPlaceholder: string;
}
