import { ServiceItem, PricingPackage } from './types';
import { 
  BarChart3, 
  Search, 
  Users, 
  Monitor, 
  Megaphone, 
  PenTool, 
  Globe 
} from 'lucide-react';

export const LOGO_URL = "https://api.dicebear.com/9.x/initials/svg?seed=MM&backgroundColor=A3E635&textColor=0B1120";

export const SERVICES: ServiceItem[] = [
  {
    id: 'perf-marketing',
    title: 'Performance Marketing',
    description: 'Data-driven campaigns focused on ROI and measurable results across all channels.',
    iconName: 'BarChart3'
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Rank higher on search engines and drive organic traffic with technical and content SEO.',
    iconName: 'Search'
  },
  {
    id: 'lead-gen',
    title: 'Lead Generation',
    description: 'High-quality lead acquisition strategies to fuel your sales pipeline.',
    iconName: 'Users'
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Premium, responsive, and conversion-optimized websites that represent your brand.',
    iconName: 'Monitor'
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads',
    description: 'Targeted advertising on Facebook and Instagram to reach your ideal audience.',
    iconName: 'Megaphone'
  },
  {
    id: 'google-ads',
    title: 'Google Ads',
    description: 'Capture intent with precision-targeted Search, Display, and Video campaigns.',
    iconName: 'Globe'
  },
  {
    id: 'content',
    title: 'Content Creation',
    description: 'Engaging storytelling and visual content that connects with your customers.',
    iconName: 'PenTool'
  }
];

export const PACKAGES: PricingPackage[] = [
  {
    id: 'pkg-1',
    title: 'Starter Momentum',
    price: '₹10,000',
    features: [
      '6 Ad Sets & Creatives',
      'Complete Account Setup',
      'GMB Setup & Optimization',
      'Monthly Performance Report',
      'Basic Support'
    ]
  },
  {
    id: 'pkg-2',
    title: 'Growth Accelerator',
    price: '₹20,000',
    recommended: true,
    features: [
      '8 Ad Sets & Creatives',
      'SEO Optimization (Basic)',
      'Advanced Audience Targeting',
      'Bi-Weekly Reporting',
      'Priority Support'
    ]
  },
  {
    id: 'pkg-3',
    title: 'Market Dominator',
    price: '₹30,000',
    features: [
      '12 Ad Sets & Creatives',
      'Full SEO Optimization',
      'Lead Generation Funnel',
      'Weekly Strategy Calls',
      'Dedicated Account Manager'
    ]
  }
];

export const MARQUEE_ITEMS = [
  "SEO", "Content Marketing", "Meta Ads", "Google Ads", "Web Design", 
  "Lead Generation", "Brand Strategy", "Email Marketing", "Analytics"
];