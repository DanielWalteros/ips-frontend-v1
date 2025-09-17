export interface BreadcrumbItem {
  label: string;
  routerLink?: string;
  isActive?: boolean;
}

export interface BreadcrumbConfig {
  items: BreadcrumbItem[];
  ariaLabel?: string;
}
