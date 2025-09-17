import { Injectable } from '@angular/core';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  // Lista unificada de todos los documentos - fuente única de verdad
  private readonly documents: Document[] = [
    // Documentos de Transparencia
    {
      id: 'salud-transparente-2025',
      title: 'Salud Transparente Salud Bolívar IPS Junio 2025',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2025/07/04110028/Periodico-SALUD-TRANSPARENTE-JUNIO-IPS1-min.pdf',
      type: 'transparency',
      isAvailable: true
    },
    
    // Boletines Epidemiológicos
    {
      id: 'boletin-epidemiologico-primer-semestre-2024',
      title: 'Boletín Epidemiológico Primer Semestre 2024',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2024/08/27103626/Boletin-Epidemiologico-Primer-Semestre-2024.pdf',
      type: 'epidemiological',
      isAvailable: true
    },
    {
      id: 'boletin-epidemiologico-segundo-semestre-2024',
      title: 'Boletín Epidemiológico Segundo Semestre 2024',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2024/12/23091405/boletin-epidemiologico-II-semestre-2024.pdf',
      type: 'epidemiological',
      isAvailable: true
    },
    
    // Documentos Financieros
    {
      id: 'report-2024',
      title: 'Informe de Gestión y Estados Financieros • Salud Bolívar IPS 2024',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2025/04/01083926/Informe-Gestion-Estados-Financieros_Salud-Bolivar-IPS-2024-min.pdf',
      type: 'financial',
      isAvailable: true
    },
    {
      id: 'report-2023',
      title: 'Informe de Gestión y Estados Financieros • Salud Bolívar IPS 2023',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2025/01/28154027/Estados-Financieros-de-Publicacion-IPS-Dic-2023-2022.pdf',
      type: 'financial',
      isAvailable: true
    },
    {
      id: 'report-2022',
      title: 'Informe de Gestión y Estados Financieros • Salud Bolívar IPS 2022',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2023/03/31105805/Estados-Financieros-de-Publicacion-IPS-Dic2022-2021.pdf',
      type: 'financial',
      isAvailable: true
    },
    {
      id: 'report-2021',
      title: 'Informe de Gestión y Estados Financieros • Salud Bolívar IPS 2021',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2022/04/05112605/Estados-Financieros-de-Publicacion-IPS-Dic2021-2020.pdf',
      type: 'financial',
      isAvailable: true
    },
    {
      id: 'report-2020',
      title: 'Informe de Gestión y Estados Financieros • Salud Bolívar IPS 2020',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2021/04/23110033/2_EstadosFinancieros-Publicacion_IPS-2020-2019.pdf',
      type: 'financial',
      isAvailable: true
    },
    {
      id: 'report-2019',
      title: 'Informe de Gestión y Estados Financieros • Salud Bolívar IPS 2019',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2020/04/30122546/EstadosFinancieros2019_SaludBolivar-IPS.pdf',
      type: 'financial',
      isAvailable: true
    },
    
    // Documentos de Manejo de Datos y Privacidad
    {
      id: 'politicas-proteccion-datos',
      title: 'Políticas para Protección de datos personales - Salud Bolívar IPS',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2021/04/09151806/MANUAL-POLITICAS-PARA-LA-PROTECCION-DATOS-PERSONALES.pdf',
      type: 'privacy',
      isAvailable: true
    },
    {
      id: 'aviso-privacidad',
      title: 'Aviso de Privacidad - Salud Bolívar IPS',
      downloadUrl: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2021/04/09151816/AVISO-DE-PRIVACIDAD.pdf',
      type: 'privacy',
      isAvailable: true
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los documentos financieros
   * @returns Array de documentos financieros
   */
  getFinancialDocuments(): Document[] {
    return this.getDocumentsByType('financial');
  }

  /**
   * Obtiene todos los documentos de transparencia
   * @returns Array de documentos de transparencia
   */
  getTransparencyDocuments(): Document[] {
    return this.getDocumentsByType('transparency');
  }

  /**
   * Obtiene todos los boletines epidemiológicos
   * @returns Array de boletines epidemiológicos
   */
  getEpidemiologicalBulletins(): Document[] {
    return this.getDocumentsByType('epidemiological');
  }

  /**
   * Obtiene todos los documentos de manejo de datos
   * @returns Array de documentos de privacidad y protección de datos
   */
  getDataManagementDocuments(): Document[] {
    return this.getDocumentsByType('privacy');
  }

  /**
   * Obtiene todos los documentos por tipo
   * @param type Tipo de documento a filtrar
   * @returns Array de documentos del tipo especificado
   */
  getDocumentsByType(type: Document['type']): Document[] {
    return this.documents.filter(document => document.type === type);
  }

  /**
   * Obtiene todos los documentos disponibles
   * @returns Array con todos los documentos
   */
  getAllDocuments(): Document[] {
    return [...this.documents];
  }

  /**
   * Obtiene solo los documentos disponibles
   * @returns Array de documentos que están disponibles para descarga
   */
  getAvailableDocuments(): Document[] {
    return this.documents.filter(document => document.isAvailable);
  }

  /**
   * Busca un documento por su ID
   * @param id ID del documento a buscar
   * @returns Documento encontrado o undefined si no existe
   */
  getDocumentById(id: string): Document | undefined {
    return this.documents.find(document => document.id === id);
  }

  // ========== MÉTODOS DE FILTRADO AVANZADOS ==========

  /**
   * Filtra documentos por múltiples tipos
   * @param types Array de tipos de documentos a incluir
   * @returns Array de documentos que coinciden con los tipos especificados
   */
  getDocumentsByTypes(types: Document['type'][]): Document[] {
    return this.documents.filter(document => types.includes(document.type));
  }

  /**
   * Filtra documentos por disponibilidad y tipo
   * @param type Tipo de documento
   * @param isAvailable Estado de disponibilidad (opcional)
   * @returns Array de documentos filtrados
   */
  filterDocuments(type?: Document['type'], isAvailable?: boolean): Document[] {
    let documents = [...this.documents];

    if (type !== undefined) {
      documents = documents.filter(doc => doc.type === type);
    }

    if (isAvailable !== undefined) {
      documents = documents.filter(doc => doc.isAvailable === isAvailable);
    }

    return documents;
  }

  /**
   * Busca documentos por título (búsqueda parcial, insensible a mayúsculas)
   * @param searchTerm Término de búsqueda
   * @returns Array de documentos que coinciden con el término de búsqueda
   */
  searchDocumentsByTitle(searchTerm: string): Document[] {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    if (!normalizedSearch) {
      return [];
    }

    return this.documents.filter(document => 
      document.title.toLowerCase().includes(normalizedSearch)
    );
  }

  /**
   * Obtiene documentos recientes basados en el año en el título
   * @param years Número de años hacia atrás (por defecto 2)
   * @returns Array de documentos de años recientes
   */
  getRecentDocuments(years: number = 2): Document[] {
    const currentYear = new Date().getFullYear();
    const fromYear = currentYear - years;

    return this.documents.filter(document => {
      // Buscar años en el título usando regex
      const yearMatch = document.title.match(/(\d{4})/);
      if (yearMatch) {
        const docYear = parseInt(yearMatch[1]);
        return docYear >= fromYear;
      }
      return false;
    });
  }

  /**
   * Obtiene estadísticas de los documentos
   * @returns Objeto con estadísticas de documentos por tipo y disponibilidad
   */
  getDocumentsStats(): {
    total: number;
    available: number;
    byType: Record<Document['type'], number>;
    availableByType: Record<Document['type'], number>;
  } {
    const availableDocs = this.documents.filter(doc => doc.isAvailable);

    const byType: Record<Document['type'], number> = {
      financial: 0,
      transparency: 0,
      epidemiological: 0,
      privacy: 0
    };

    const availableByType: Record<Document['type'], number> = {
      financial: 0,
      transparency: 0,
      epidemiological: 0,
      privacy: 0
    };

    this.documents.forEach(doc => {
      byType[doc.type]++;
      if (doc.isAvailable) {
        availableByType[doc.type]++;
      }
    });

    return {
      total: this.documents.length,
      available: availableDocs.length,
      byType,
      availableByType
    };
  }

  /**
   * Ordena documentos por criterio específico
   * @param documents Array de documentos a ordenar
   * @param sortBy Criterio de ordenación
   * @param order Orden ascendente o descendente
   * @returns Array de documentos ordenados
   */
  sortDocuments(
    documents: Document[], 
    sortBy: 'title' | 'type' | 'year' = 'title', 
    order: 'asc' | 'desc' = 'asc'
  ): Document[] {
    const sortedDocs = [...documents];

    sortedDocs.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'year':
          const yearA = this.extractYearFromTitle(a.title);
          const yearB = this.extractYearFromTitle(b.title);
          comparison = yearA - yearB;
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });

    return sortedDocs;
  }

  /**
   * Extrae el año del título de un documento
   * @param title Título del documento
   * @returns Año extraído o 0 si no se encuentra
   */
  private extractYearFromTitle(title: string): number {
    const yearMatch = title.match(/(\d{4})/);
    return yearMatch ? parseInt(yearMatch[1]) : 0;
  }
}
