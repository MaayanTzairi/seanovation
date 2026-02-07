import { Anchor, Zap, ShieldCheck, Plane } from 'lucide-react';
import { PlaygroundVertical, Partner } from './types';

export const VERTICALS: PlaygroundVertical[] = [
  {
    id: 'blue',
    title: 'Blue Playground',
    description: 'Maritime, Port of Eilat, and Aquaculture tech.',
    icon: Anchor,
    color: 'electric-teal',
    image: 'https://picsum.photos/id/16/800/600', // Sea/Water related
  },
  {
    id: 'energy',
    title: 'Energy & Agro',
    description: 'Renewable energy and desert agriculture.',
    icon: Zap,
    color: 'desert-gold',
    image: 'https://picsum.photos/id/53/800/600', // Nature/Sun related
  },
  {
    id: 'safe',
    title: 'Safe Playground',
    description: 'Cyber security and critical infrastructure protection.',
    icon: ShieldCheck,
    color: 'electric-teal',
    image: 'https://picsum.photos/id/60/800/600', // Tech/Abstract
  },
  {
    id: 'travel',
    title: 'Travel Tech',
    description: 'Smart tourism and aviation (Ramon Airport).',
    icon: Plane,
    color: 'desert-gold',
    image: 'https://picsum.photos/id/46/800/600', // Travel/Sky
  },
];

export const PARTNERS: Partner[] = [
  { name: "Port of Eilat", role: "Maritime Host", logoPlaceholder: "POE" },
  { name: "Israel Cyber Directorate", role: "Security Host", logoPlaceholder: "INCD" },
  { name: "Ramon Airport", role: "Aviation Host", logoPlaceholder: "RA" },
  { name: "Eilat Municipal", role: "City Host", logoPlaceholder: "EM" },
];
