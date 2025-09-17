import { TestBed } from '@angular/core/testing';
import { ClientsService } from './clients.service';
import { Client } from '../shared/models/client';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllClients', () => {
    it('should return all clients', () => {
      const result = service.getAllClients();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(client => client.id && client.name && client.logoUrl && client.altText)).toBeTruthy();
    });

    it('should return a copy of the array', () => {
      const result1 = service.getAllClients();
      const result2 = service.getAllClients();
      expect(result1).not.toBe(result2); // Different references
      expect(result1).toEqual(result2); // Same content
    });

    it('should return clients with required properties', () => {
      const result = service.getAllClients();
      result.forEach(client => {
        expect(client.id).toBeDefined();
        expect(client.name).toBeDefined();
        expect(client.logoUrl).toBeDefined();
        expect(client.altText).toBeDefined();
        expect(typeof client.id).toBe('string');
        expect(typeof client.name).toBe('string');
        expect(typeof client.logoUrl).toBe('string');
        expect(typeof client.altText).toBe('string');
      });
    });
  });

  describe('getClientById', () => {
    it('should return client when found', () => {
      const allClients = service.getAllClients();
      const firstClient = allClients[0];
      const result = service.getClientById(firstClient.id);
      expect(result).toEqual(firstClient);
    });

    it('should return undefined when client not found', () => {
      const result = service.getClientById('non-existent-id');
      expect(result).toBeUndefined();
    });

    it('should find specific known clients', () => {
      const segurosBolivar = service.getClientById('seguros-bolivar');
      const arlSegurosBolivar = service.getClientById('arl-seguros-bolivar');
      
      expect(segurosBolivar).toBeDefined();
      expect(segurosBolivar?.name).toBe('Seguros Bolívar');
      
      expect(arlSegurosBolivar).toBeDefined();
      expect(arlSegurosBolivar?.name).toBe('ARL Seguros Bolívar');
    });
  });

  describe('getClientsWithWebsite', () => {
    it('should return only clients with website', () => {
      const result = service.getClientsWithWebsite();
      expect(result.every(client => client.websiteUrl && client.websiteUrl.trim() !== '')).toBeTruthy();
    });

    it('should not return clients without website', () => {
      // Mock a client without website for testing
      jest.spyOn(service, 'getAllClients').mockReturnValue([
        ...service.getAllClients(),
        { 
          id: 'test-no-website', 
          name: 'Test Client', 
          logoUrl: 'test-url', 
          altText: 'Test Client',
          websiteUrl: undefined
        }
      ]);

      const result = service.getClientsWithWebsite();
      expect(result.find(client => client.id === 'test-no-website')).toBeUndefined();
    });

    it('should not return clients with empty website', () => {
      // Mock a client with empty website for testing
      jest.spyOn(service, 'getAllClients').mockReturnValue([
        ...service.getAllClients(),
        { 
          id: 'test-empty-website', 
          name: 'Test Client', 
          logoUrl: 'test-url', 
          altText: 'Test Client',
          websiteUrl: '   '
        }
      ]);

      const result = service.getClientsWithWebsite();
      expect(result.find(client => client.id === 'test-empty-website')).toBeUndefined();
    });
  });

  describe('searchClientsByName', () => {
    it('should find clients by partial name match', () => {
      const result = service.searchClientsByName('Bolívar');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(client => client.name.toLowerCase().includes('bolívar'))).toBeTruthy();
    });

    it('should be case insensitive', () => {
      const result1 = service.searchClientsByName('SEGUROS');
      const result2 = service.searchClientsByName('seguros');
      const result3 = service.searchClientsByName('Seguros');
      
      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
      expect(result1.length).toBeGreaterThan(0);
    });

    it('should return empty array for empty search term', () => {
      const result = service.searchClientsByName('');
      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace-only search term', () => {
      const result = service.searchClientsByName('   ');
      expect(result).toEqual([]);
    });

    it('should return empty array for non-matching search term', () => {
      const result = service.searchClientsByName('NonExistentClient');
      expect(result).toEqual([]);
    });

    it('should find ARL clients', () => {
      const result = service.searchClientsByName('ARL');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(client => client.name.includes('ARL'))).toBeTruthy();
    });
  });

  describe('getClientsCount', () => {
    it('should return correct count of clients', () => {
      const allClients = service.getAllClients();
      const count = service.getClientsCount();
      expect(count).toBe(allClients.length);
    });

    it('should return a positive number', () => {
      const count = service.getClientsCount();
      expect(count).toBeGreaterThan(0);
    });

    it('should return expected number of clients for current data', () => {
      const count = service.getClientsCount();
      expect(count).toBe(2); // Seguros Bolívar + ARL Seguros Bolívar
    });
  });

  describe('data integrity', () => {
    it('should have unique client IDs', () => {
      const clients = service.getAllClients();
      const ids = clients.map(client => client.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid URLs', () => {
      const clients = service.getAllClients();
      clients.forEach(client => {
        if (client.websiteUrl) {
          expect(client.websiteUrl).toMatch(/^https?:\/\/.+/);
        }
        expect(client.logoUrl).toMatch(/^https?:\/\/.+/);
      });
    });

    it('should have non-empty required fields', () => {
      const clients = service.getAllClients();
      clients.forEach(client => {
        expect(client.id.trim()).not.toBe('');
        expect(client.name.trim()).not.toBe('');
        expect(client.logoUrl.trim()).not.toBe('');
        expect(client.altText.trim()).not.toBe('');
      });
    });
  });
});
