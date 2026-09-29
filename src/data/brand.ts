export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  handle: string;
  email: string;
  address: string;
  neighborhood: string;
}

export const DEFAULT_BRAND: BrandConfig = {
  name: 'Udaya Coffee Roasters',
  shortName: 'Udaya Coffee',
  tagline: 'Slow Mornings • Single Origin • Artisanal Roastery',
  subTagline: 'Coffee • Craft • Community',
  handle: '@udayacoffee',
  email: 'hello@udayacoffee.com',
  address: '428 Blossom Alley, San Francisco, CA',
  neighborhood: 'South Park / SOMA',
};

export const BRAND_PRESETS = [
  {
    name: 'Udaya Coffee Roasters',
    desc: 'Artisanal roastery & sensory cupping lab founded by Udaya Sree',
  },
  {
    name: 'Udaya Coffee Co.',
    desc: 'Minimalist neighborhood sanctuary & direct-trade coffee',
  },
  {
    name: 'Udaya & Sree Roasters',
    desc: 'Boutique single-origin roasters & botanical cafe',
  },
  {
    name: 'Sree Specialty Coffee',
    desc: 'Third-wave precision espresso & slow bar brew sanctuary',
  },
];
