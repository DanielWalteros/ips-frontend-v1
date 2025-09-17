export interface InformationCardContentItem {
  id: string;
  number: number;
  text: string;
}

export interface InformationCard {
  id: string;
  path: string;
  title: string;
  breadcrumbTitle: string;
  cardImage: string;
  description?: string;
  routerLink: string;
  // Contenido detallado para la página individual
  detailTitle?: string;
  detailDescription?: string;
  detailContent?: string;
  // Imagen de fondo para la sección de contenido
  backgroundImage: string;
  // Lista de elementos de contenido numerados
  contentItems?: InformationCardContentItem[];
}
