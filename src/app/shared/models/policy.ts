export interface PolicyContentItem {
  id: string;
  title?: string;
  description: string;
  icon?: string;
}

export interface PolicyContentSection {
  id: string;
  introText?: string;
  items: PolicyContentItem[];
}

export interface Policy {
  id: string;
  path: string;
  title: string;
  imageUrl: string;
  routerLink: string;
  imageAlt?: string;
  dataSrcDesktop1x: string;
  dataSrcMobile1x: string;
  // Hero section configuration
  heroTitle: string;
  heroBackgroundImage: string;
  subtitle?: string;
  code: string;
  version: string;
  revisionDate: string;
  // Content section configuration
  contentTitle: string;
  contentDescription: string;
  contentIntroText?: string;
  contentItems: PolicyContentItem[];
  // List style for contentItems ('checkmarks' by default, 'traditional' for patient safety)
  listStyle?: 'checkmarks' | 'traditional';
  // Advanced content sections (for complex policies like patient safety)
  contentSections?: PolicyContentSection[];
}
