import { TestBed } from '@angular/core/testing';
import { DocumentsService } from './documents.service';
import { Document } from '../models/document';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFinancialDocuments', () => {
    it('should return financial documents', () => {
      const result = service.getFinancialDocuments();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(doc => doc.type === 'financial')).toBeTruthy();
      expect(result.every(doc => doc.id && doc.title && doc.downloadUrl)).toBeTruthy();
    });

    it('should return a copy of the array', () => {
      const result1 = service.getFinancialDocuments();
      const result2 = service.getFinancialDocuments();
      expect(result1).not.toBe(result2); // Different references
      expect(result1).toEqual(result2); // Same content
    });
  });

  describe('getTransparencyDocuments', () => {
    it('should return transparency documents', () => {
      const result = service.getTransparencyDocuments();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(doc => doc.type === 'transparency')).toBeTruthy();
      expect(result.every(doc => doc.id && doc.title && doc.downloadUrl)).toBeTruthy();
    });
  });

  describe('getEpidemiologicalBulletins', () => {
    it('should return epidemiological bulletins', () => {
      const result = service.getEpidemiologicalBulletins();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(doc => doc.type === 'epidemiological')).toBeTruthy();
      expect(result.every(doc => doc.id && doc.title && doc.downloadUrl)).toBeTruthy();
    });
  });

  describe('getDataManagementDocuments', () => {
    it('should return data management documents', () => {
      const result = service.getDataManagementDocuments();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(doc => doc.type === 'privacy')).toBeTruthy();
      expect(result.every(doc => doc.id && doc.title && doc.downloadUrl)).toBeTruthy();
    });
  });

  describe('getDocumentsByType', () => {
    it('should return financial documents when type is financial', () => {
      const result = service.getDocumentsByType('financial');
      const expected = service.getFinancialDocuments();
      expect(result).toEqual(expected);
    });

    it('should return transparency documents when type is transparency', () => {
      const result = service.getDocumentsByType('transparency');
      const expected = service.getTransparencyDocuments();
      expect(result).toEqual(expected);
    });

    it('should return epidemiological documents when type is epidemiological', () => {
      const result = service.getDocumentsByType('epidemiological');
      const expected = service.getEpidemiologicalBulletins();
      expect(result).toEqual(expected);
    });

    it('should return privacy documents when type is privacy', () => {
      const result = service.getDocumentsByType('privacy');
      const expected = service.getDataManagementDocuments();
      expect(result).toEqual(expected);
    });

    it('should return empty array for invalid type', () => {
      const result = service.getDocumentsByType('invalid' as Document['type']);
      expect(result).toEqual([]);
    });
  });

  describe('getAllDocuments', () => {
    it('should return all documents combined', () => {
      const result = service.getAllDocuments();
      const expectedLength = 
        service.getFinancialDocuments().length + 
        service.getTransparencyDocuments().length + 
        service.getEpidemiologicalBulletins().length + 
        service.getDataManagementDocuments().length;
      
      expect(result.length).toBe(expectedLength);
    });

    it('should include documents from all types', () => {
      const result = service.getAllDocuments();
      const types = result.map(doc => doc.type);
      expect(types).toContain('financial');
      expect(types).toContain('transparency');
      expect(types).toContain('epidemiological');
      expect(types).toContain('privacy');
    });
  });

  describe('getAvailableDocuments', () => {
    it('should return only available documents', () => {
      const result = service.getAvailableDocuments();
      expect(result.every(doc => doc.isAvailable)).toBeTruthy();
    });

    it('should filter out unavailable documents', () => {
      // Mock a document as unavailable for testing
      jest.spyOn(service, 'getAllDocuments').mockReturnValue([
        ...service.getFinancialDocuments(),
        { 
          id: 'test-unavailable', 
          title: 'Test Document', 
          downloadUrl: 'test-url', 
          type: 'financial', 
          isAvailable: false 
        }
      ]);

      const result = service.getAvailableDocuments();
      expect(result.every(doc => doc.isAvailable)).toBeTruthy();
      expect(result.find(doc => doc.id === 'test-unavailable')).toBeUndefined();
    });
  });

  describe('getDocumentById', () => {
    it('should return document when found', () => {
      const allDocs = service.getAllDocuments();
      const firstDoc = allDocs[0];
      const result = service.getDocumentById(firstDoc.id);
      expect(result).toEqual(firstDoc);
    });

    it('should return undefined when document not found', () => {
      const result = service.getDocumentById('non-existent-id');
      expect(result).toBeUndefined();
    });

    it('should find documents across all types', () => {
      const transparencyDocs = service.getTransparencyDocuments();
      const epidemiologicalDocs = service.getEpidemiologicalBulletins();
      const privacyDocs = service.getDataManagementDocuments();

      if (transparencyDocs.length > 0) {
        expect(service.getDocumentById(transparencyDocs[0].id)).toEqual(transparencyDocs[0]);
      }
      if (epidemiologicalDocs.length > 0) {
        expect(service.getDocumentById(epidemiologicalDocs[0].id)).toEqual(epidemiologicalDocs[0]);
      }
      if (privacyDocs.length > 0) {
        expect(service.getDocumentById(privacyDocs[0].id)).toEqual(privacyDocs[0]);
      }
    });
  });

  // ========== NUEVAS PRUEBAS PARA MÉTODOS DE FILTRADO AVANZADOS ==========

  describe('getDocumentsByTypes', () => {
    it('should return documents of specified types', () => {
      const result = service.getDocumentsByTypes(['financial', 'transparency']);
      expect(result.every(doc => doc.type === 'financial' || doc.type === 'transparency')).toBeTruthy();
    });

    it('should return empty array when no types specified', () => {
      const result = service.getDocumentsByTypes([]);
      expect(result).toEqual([]);
    });
  });

  describe('filterDocuments', () => {
    it('should filter by type only', () => {
      const result = service.filterDocuments('financial');
      expect(result.every(doc => doc.type === 'financial')).toBeTruthy();
    });

    it('should filter by availability only', () => {
      const result = service.filterDocuments(undefined, true);
      expect(result.every(doc => doc.isAvailable === true)).toBeTruthy();
    });

    it('should filter by both type and availability', () => {
      const result = service.filterDocuments('financial', true);
      expect(result.every(doc => doc.type === 'financial' && doc.isAvailable === true)).toBeTruthy();
    });

    it('should return all documents when no filters specified', () => {
      const result = service.filterDocuments();
      const allDocs = service.getAllDocuments();
      expect(result).toEqual(allDocs);
    });
  });

  describe('searchDocumentsByTitle', () => {
    it('should find documents by partial title match', () => {
      const result = service.searchDocumentsByTitle('2024');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(doc => doc.title.toLowerCase().includes('2024'))).toBeTruthy();
    });

    it('should be case insensitive', () => {
      const result = service.searchDocumentsByTitle('SALUD');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(doc => doc.title.toLowerCase().includes('salud'))).toBeTruthy();
    });

    it('should return empty array for empty search term', () => {
      const result = service.searchDocumentsByTitle('');
      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace-only search term', () => {
      const result = service.searchDocumentsByTitle('   ');
      expect(result).toEqual([]);
    });
  });

  describe('getRecentDocuments', () => {
    it('should return documents from recent years', () => {
      const result = service.getRecentDocuments(2);
      const currentYear = new Date().getFullYear();
      expect(result.length).toBeGreaterThan(0);
      // Verificar que los documentos contienen años recientes en el título
      expect(result.some(doc => doc.title.includes(currentYear.toString()) || 
                              doc.title.includes((currentYear-1).toString()) ||
                              doc.title.includes((currentYear-2).toString()))).toBeTruthy();
    });

    it('should use default 2 years when no parameter provided', () => {
      const result1 = service.getRecentDocuments();
      const result2 = service.getRecentDocuments(2);
      expect(result1).toEqual(result2);
    });
  });

  describe('getDocumentsStats', () => {
    it('should return correct statistics', () => {
      const stats = service.getDocumentsStats();
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.available).toBeGreaterThanOrEqual(0);
      expect(stats.available).toBeLessThanOrEqual(stats.total);
      expect(Object.keys(stats.byType)).toEqual(['financial', 'transparency', 'epidemiological', 'privacy']);
      expect(Object.keys(stats.availableByType)).toEqual(['financial', 'transparency', 'epidemiological', 'privacy']);
    });

    it('should have consistent counts', () => {
      const stats = service.getDocumentsStats();
      const totalByType = Object.values(stats.byType).reduce((sum, count) => sum + count, 0);
      const totalAvailableByType = Object.values(stats.availableByType).reduce((sum, count) => sum + count, 0);
      
      expect(totalByType).toBe(stats.total);
      expect(totalAvailableByType).toBe(stats.available);
    });
  });

  describe('sortDocuments', () => {
    it('should sort by title ascending by default', () => {
      const docs = service.getAllDocuments();
      const result = service.sortDocuments(docs);
      for (let i = 1; i < result.length; i++) {
        expect(result[i-1].title.localeCompare(result[i].title)).toBeLessThanOrEqual(0);
      }
    });

    it('should sort by title descending', () => {
      const docs = service.getAllDocuments();
      const result = service.sortDocuments(docs, 'title', 'desc');
      for (let i = 1; i < result.length; i++) {
        expect(result[i-1].title.localeCompare(result[i].title)).toBeGreaterThanOrEqual(0);
      }
    });

    it('should sort by type', () => {
      const docs = service.getAllDocuments();
      const result = service.sortDocuments(docs, 'type');
      for (let i = 1; i < result.length; i++) {
        expect(result[i-1].type.localeCompare(result[i].type)).toBeLessThanOrEqual(0);
      }
    });

    it('should not modify original array', () => {
      const docs = service.getAllDocuments();
      const originalOrder = [...docs];
      service.sortDocuments(docs, 'title');
      expect(docs).toEqual(originalOrder);
    });

    it('should sort by year ascending', () => {
      // Create test documents with different years in titles
      const testDocs: Document[] = [
        {
          id: 'doc1',
          title: 'Documento Plan 2023',
          downloadUrl: 'test1.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc2', 
          title: 'Informe Anual 2021',
          downloadUrl: 'test2.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc3',
          title: 'Reporte de Gestión 2024',
          downloadUrl: 'test3.pdf',
          type: 'transparency',
          isAvailable: true
        },
        {
          id: 'doc4',
          title: 'Balance General 2022',
          downloadUrl: 'test4.pdf',
          type: 'financial',
          isAvailable: true
        }
      ];

      const result = service.sortDocuments(testDocs, 'year', 'asc');
      
      // Extract years for verification
      const extractedYears = result.map(doc => {
        const match = doc.title.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      });

      // Verify ascending order: 2021, 2022, 2023, 2024
      expect(extractedYears).toEqual([2021, 2022, 2023, 2024]);
      expect(result[0].title).toContain('2021');
      expect(result[1].title).toContain('2022');
      expect(result[2].title).toContain('2023');
      expect(result[3].title).toContain('2024');
    });

    it('should sort by year descending', () => {
      const testDocs: Document[] = [
        {
          id: 'doc1',
          title: 'Estados Financieros 2020',
          downloadUrl: 'test1.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc2',
          title: 'Informe de Sostenibilidad 2023',
          downloadUrl: 'test2.pdf',
          type: 'transparency',
          isAvailable: true
        },
        {
          id: 'doc3',
          title: 'Plan Estratégico 2022',
          downloadUrl: 'test3.pdf',
          type: 'transparency',
          isAvailable: true
        }
      ];

      const result = service.sortDocuments(testDocs, 'year', 'desc');
      
      // Extract years for verification
      const extractedYears = result.map(doc => {
        const match = doc.title.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      });

      // Verify descending order: 2023, 2022, 2020
      expect(extractedYears).toEqual([2023, 2022, 2020]);
      expect(result[0].title).toContain('2023');
      expect(result[1].title).toContain('2022');
      expect(result[2].title).toContain('2020');
    });

    it('should handle documents without years in title when sorting by year', () => {
      const testDocs: Document[] = [
        {
          id: 'doc1',
          title: 'Documento con año 2023',
          downloadUrl: 'test1.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc2',
          title: 'Documento sin año',
          downloadUrl: 'test2.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc3',
          title: 'Otro documento 2021',
          downloadUrl: 'test3.pdf',
          type: 'transparency',
          isAvailable: true
        },
        {
          id: 'doc4',
          title: 'También sin año',
          downloadUrl: 'test4.pdf',
          type: 'transparency',
          isAvailable: true
        }
      ];

      const result = service.sortDocuments(testDocs, 'year', 'asc');
      
      // Documents without years should have year 0 and appear first
      const extractedYears = result.map(doc => {
        const match = doc.title.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      });

      // Verify order: 0, 0, 2021, 2023 (documents without years first)
      expect(extractedYears).toEqual([0, 0, 2021, 2023]);
      expect(result[0].title).toBe('Documento sin año');
      expect(result[1].title).toBe('También sin año');
      expect(result[2].title).toContain('2021');
      expect(result[3].title).toContain('2023');
    });

    it('should handle multiple years in title by extracting the first one', () => {
      const testDocs: Document[] = [
        {
          id: 'doc1',
          title: 'Comparativo 2020 vs 2021',
          downloadUrl: 'test1.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc2',
          title: 'Plan 2022-2025 Estratégico',
          downloadUrl: 'test2.pdf',
          type: 'transparency',
          isAvailable: true
        },
        {
          id: 'doc3',
          title: 'Informe único 2019',
          downloadUrl: 'test3.pdf',
          type: 'financial',
          isAvailable: true
        }
      ];

      const result = service.sortDocuments(testDocs, 'year', 'asc');
      
      // Should extract first year found in each title
      const extractedYears = result.map(doc => {
        const match = doc.title.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      });

      // Verify order: 2019, 2020 (from "2020 vs 2021"), 2022 (from "2022-2025")
      expect(extractedYears).toEqual([2019, 2020, 2022]);
      expect(result[0].title).toContain('2019');
      expect(result[1].title).toContain('2020');
      expect(result[2].title).toContain('2022');
    });

    it('should handle edge cases in year extraction', () => {
      const testDocs: Document[] = [
        {
          id: 'doc1',
          title: 'Doc con número corto 123',
          downloadUrl: 'test1.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc2',
          title: 'Doc con año válido 2023',
          downloadUrl: 'test2.pdf',
          type: 'financial',
          isAvailable: true
        },
        {
          id: 'doc3',
          title: 'Doc con número largo 12345',
          downloadUrl: 'test3.pdf',
          type: 'transparency',
          isAvailable: true
        },
        {
          id: 'doc4',
          title: 'Doc solo texto sin números',
          downloadUrl: 'test4.pdf',
          type: 'transparency',
          isAvailable: true
        }
      ];

      const result = service.sortDocuments(testDocs, 'year', 'asc');
      
      // Extract years using the same logic as the service
      const extractedYears = result.map(doc => {
        const match = doc.title.match(/(\d{4})/);
        return match ? parseInt(match[1]) : 0;
      });

      // Note: /(\d{4})/ extracts any 4 consecutive digits
      // So "12345" extracts "1234", not 0
      // Order should be: 0, 0, 1234, 2023
      expect(extractedYears).toEqual([0, 0, 1234, 2023]);
      
      // Documents ordered by extracted year
      expect(result[0].title).toBe('Doc con número corto 123'); // No 4-digit sequence
      expect(result[1].title).toBe('Doc solo texto sin números'); // No numbers
      expect(result[2].title).toBe('Doc con número largo 12345'); // Extracts 1234
      expect(result[3].title).toContain('2023'); // Extracts 2023
    });
  });

  describe('extractYearFromTitle (private method testing)', () => {
    it('should extract year from title correctly', () => {
      // Access private method for direct testing
      const privateService = service as any;
      
      expect(privateService.extractYearFromTitle('Documento 2023')).toBe(2023);
      expect(privateService.extractYearFromTitle('Plan 2020-2025')).toBe(2020);
      expect(privateService.extractYearFromTitle('Informe sin año')).toBe(0);
      expect(privateService.extractYearFromTitle('Doc con 123 números')).toBe(0);
      expect(privateService.extractYearFromTitle('Año 2022 en el medio')).toBe(2022);
      expect(privateService.extractYearFromTitle('')).toBe(0);
      expect(privateService.extractYearFromTitle('Número largo 12345')).toBe(1234); // Extracts first 4 digits
      expect(privateService.extractYearFromTitle('Código 98765')).toBe(9876); // Extracts first 4 digits
      expect(privateService.extractYearFromTitle('ID: 1995 - Versión 2024')).toBe(1995); // Extracts first match
    });
  });
});
