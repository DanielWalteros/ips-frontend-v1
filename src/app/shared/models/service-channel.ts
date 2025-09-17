export interface ServiceChannel {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  iconSrcSet?: string;
  iconDataSrcDesktop1x?: string;
  iconDataSrcDesktop2x?: string;
  iconDataSrcDesktop3x?: string;
  iconDataSrcMobile1x?: string;
  iconDataSrcMobile2x?: string;
  iconDataSrcMobile3x?: string;
  linkUrl?: string;
  linkText?: string;
  linkTarget?: '_blank' | '_self';
  linkType?: 'tel' | 'whatsapp' | 'external' | 'none';
}
