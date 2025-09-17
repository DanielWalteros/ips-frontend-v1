import { TestBed } from '@angular/core/testing';

import { LocationsService } from './locations.service';
import { Location } from '../models/location';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllLocations', () => {
    it('should return all locations', () => {
      const locations = service.getAllLocations();
      expect(locations).toBeTruthy();
      expect(locations.length).toBe(4);
      expect(locations[0].id).toBe('el-dorado');
      expect(locations[1].id).toBe('calle-134');
      expect(locations[2].id).toBe('carrera-decima');
      expect(locations[3].id).toBe('metropolis');
    });

    it('should return a copy of locations array', () => {
      const locations1 = service.getAllLocations();
      const locations2 = service.getAllLocations();
      
      expect(locations1).not.toBe(locations2);
      expect(locations1).toEqual(locations2);
    });
  });

  describe('getLocationById', () => {
    it('should return location when valid id is provided', () => {
      const location = service.getLocationById('el-dorado');
      expect(location).toBeTruthy();
      expect(location?.name).toBe('Unidad de Atención Integral Avenida El Dorado');
    });

    it('should return undefined when invalid id is provided', () => {
      const location = service.getLocationById('invalid-id');
      expect(location).toBeUndefined();
    });
  });

  describe('getPremiumLocations', () => {
    it('should return only premium locations', () => {
      const premiumLocations = service.getPremiumLocations();
      expect(premiumLocations.length).toBe(1);
      expect(premiumLocations[0].id).toBe('metropolis');
      expect(premiumLocations[0].isPremium).toBe(true);
    });
  });

  describe('getRegularLocations', () => {
    it('should return only regular (non-premium) locations', () => {
      const regularLocations = service.getRegularLocations();
      expect(regularLocations.length).toBe(3);
      expect(regularLocations.every(location => !location.isPremium)).toBe(true);
    });
  });

  describe('getFooterDisplayName', () => {
    it('should return simplified name for footer display', () => {
      const locations = service.getAllLocations();
      
      const elDoradoName = service.getFooterDisplayName(locations[0]);
      expect(elDoradoName).toBe('Unidad de atención integral Av. El Dorado');
      
      const calle134Name = service.getFooterDisplayName(locations[1]);
      expect(calle134Name).toBe('Unidad de atención integral Calle 134');
      
      const carreraDecimaName = service.getFooterDisplayName(locations[2]);
      expect(carreraDecimaName).toBe('Unidad de atención integral Carrera décima');
      
      const metropolisName = service.getFooterDisplayName(locations[3]);
      expect(metropolisName).toBe('Unidad médica premium Metrópolis');
    });

    it('should return original name if no mapping exists', () => {
      const customLocation: Location = {
        id: 'custom',
        name: 'Custom Location Name',
        address: 'Custom Address',
        schedule: { weekdays: '9-5', saturday: '9-1', sunday: 'Closed' },
        services: ['General'],
        contact: { phone: '123', email: 'test@test.com' },
        isPremium: false
      };
      
      const displayName = service.getFooterDisplayName(customLocation);
      expect(displayName).toBe('Custom Location Name');
    });
  });

  describe('getFormattedScheduleForFooter', () => {
    it('should format schedule correctly for footer display', () => {
      const location = service.getLocationById('el-dorado')!;
      const formattedSchedule = service.getFormattedScheduleForFooter(location);
      
      expect(formattedSchedule.weekdays).toBe('Lunes a Viernes 7:00 a. m. a 7:00 p. m.');
      expect(formattedSchedule.saturday).toBe('Sábado 7:00 a. m. a 1:00 p. m.');
    });

    it('should handle different schedule formats', () => {
      const carreraDecimaLocation = service.getLocationById('carrera-decima')!;
      const formattedSchedule = service.getFormattedScheduleForFooter(carreraDecimaLocation);
      
      expect(formattedSchedule.weekdays).toBe('Lunes a Viernes 6:30 a. m. a 5:00 p. m.');
      expect(formattedSchedule.saturday).toBe('Sábado 7:00 a. m. a 1:00 p. m.');
    });
  });

  describe('data integrity', () => {
    it('should have all required properties for each location', () => {
      const locations = service.getAllLocations();
      
      locations.forEach(location => {
        expect(location.id).toBeTruthy();
        expect(location.name).toBeTruthy();
        expect(location.address).toBeTruthy();
        expect(location.schedule).toBeTruthy();
        expect(location.schedule.weekdays).toBeTruthy();
        expect(location.schedule.saturday).toBeTruthy();
        expect(location.services).toBeTruthy();
        expect(location.contact).toBeTruthy();
        expect(location.contact.phone).toBeTruthy();
        expect(location.contact.email).toBeTruthy();
        expect(typeof location.isPremium).toBe('boolean');
      });
    });

    it('should have unique ids for all locations', () => {
      const locations = service.getAllLocations();
      const ids = locations.map(location => location.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(ids.length).toBe(uniqueIds.length);
    });
  });

  describe('getMapUrl', () => {
    it('should generate Google Maps URL for location without building', () => {
      const locationWithoutBuilding: Location = {
        id: 'test-location',
        name: 'Test Location',
        address: 'Carrera 10 # 20-30',
        schedule: { weekdays: '8-6', saturday: '8-2', sunday: 'Closed' },
        services: ['General'],
        contact: { phone: '123', email: 'test@test.com' },
        isPremium: false
        // No building property
      };

      const mapUrl = service.getMapUrl(locationWithoutBuilding);
      
      expect(mapUrl).toBeDefined();
      expect(mapUrl).toContain('https://maps.google.com/maps?q=');
      expect(mapUrl).toContain('Carrera%2010%20%23%2020-30');
      expect(mapUrl).toContain('Bogot%C3%A1%2C%20Colombia');
      expect(mapUrl).toContain('&output=embed');
      // Should NOT contain building information since there's no building
      expect(mapUrl).not.toContain('%2C%20Torre');
      expect(mapUrl).not.toContain('%2C%20Edificio');
    });

    it('should generate Google Maps URL for location with building (covers line 374)', () => {
      const locationWithBuilding: Location = {
        id: 'test-location-building',
        name: 'Test Location with Building',
        address: 'Carrera 15 # 85-30',
        building: 'Torre Norte, Piso 5',
        schedule: { weekdays: '8-6', saturday: '8-2', sunday: 'Closed' },
        services: ['General'],
        contact: { phone: '123', email: 'test@test.com' },
        isPremium: false
      };

      const mapUrl = service.getMapUrl(locationWithBuilding);
      
      expect(mapUrl).toBeDefined();
      expect(mapUrl).toContain('https://maps.google.com/maps?q=');
      expect(mapUrl).toContain('Carrera%2015%20%23%2085-30');
      // ✅ This specifically tests line 374: searchQuery += `, ${location.building}`;
      expect(mapUrl).toContain('%2C%20Torre%20Norte%2C%20Piso%205');
      expect(mapUrl).toContain('Bogot%C3%A1%2C%20Colombia');
      expect(mapUrl).toContain('&output=embed');
    });

    it('should generate correct URL for real location with building from service data', () => {
      const metropolisLocation = service.getLocationById('metropolis');
      expect(metropolisLocation).toBeTruthy();
      expect(metropolisLocation!.building).toBeDefined(); // Metropolis should have building

      const mapUrl = service.getMapUrl(metropolisLocation!);
      
      expect(mapUrl).toBeDefined();
      expect(mapUrl).toContain('https://maps.google.com/maps?q=');
      expect(mapUrl).toContain('&output=embed');
      expect(mapUrl).toContain('Bogot%C3%A1%2C%20Colombia');
      // Should include building information from the actual data
      expect(mapUrl).toContain(encodeURIComponent(metropolisLocation!.building!));
    });

    it('should properly encode special characters in address and building', () => {
      const locationWithSpecialChars: Location = {
        id: 'special-chars',
        name: 'Location with Special Characters',
        address: 'Calle 72 # 10-34, Zona Rosa',
        building: 'Edificio El Nogal, Oficina 301-B',
        schedule: { weekdays: '8-6', saturday: '8-2', sunday: 'Closed' },
        services: ['General'],
        contact: { phone: '123', email: 'test@test.com' },
        isPremium: false
      };

      const mapUrl = service.getMapUrl(locationWithSpecialChars);
      
      expect(mapUrl).toBeDefined();
      expect(mapUrl).toContain('https://maps.google.com/maps?q=');
      
      // Verify proper encoding of special characters
      expect(mapUrl).toContain('Calle%2072%20%23%2010-34%2C%20Zona%20Rosa');
      expect(mapUrl).toContain('Edificio%20El%20Nogal%2C%20Oficina%20301-B');
      expect(mapUrl).toContain('Bogot%C3%A1%2C%20Colombia');
      expect(mapUrl).toContain('&output=embed');
    });

    it('should handle empty building string gracefully', () => {
      const locationWithEmptyBuilding: Location = {
        id: 'empty-building',
        name: 'Location with Empty Building',
        address: 'Carrera 20 # 50-40',
        building: '', // Empty string
        schedule: { weekdays: '8-6', saturday: '8-2', sunday: 'Closed' },
        services: ['General'],
        contact: { phone: '123', email: 'test@test.com' },
        isPremium: false
      };

      const mapUrl = service.getMapUrl(locationWithEmptyBuilding);
      
      expect(mapUrl).toBeDefined();
      expect(mapUrl).toContain('https://maps.google.com/maps?q=');
      expect(mapUrl).toContain('Carrera%2020%20%23%2050-40');
      expect(mapUrl).toContain('Bogot%C3%A1%2C%20Colombia');
      // Should not add empty building to the search query
      expect(mapUrl).not.toContain('%2C%20%2C'); // Double comma from empty building
    });

    it('should create valid embed URL format', () => {
      const testLocation = service.getLocationById('el-dorado')!;
      const mapUrl = service.getMapUrl(testLocation);
      
      expect(mapUrl).toMatch(/^https:\/\/maps\.google\.com\/maps\?q=.+&output=embed$/);
      
      // Verify URL structure
      const url = new URL(mapUrl);
      expect(url.hostname).toBe('maps.google.com');
      expect(url.pathname).toBe('/maps');
      expect(url.searchParams.get('q')).toBeTruthy();
      expect(url.searchParams.get('output')).toBe('embed');
    });

    it('should include all locations in address for complete search query', () => {
      const locationWithBuilding: Location = {
        id: 'complete-test',
        name: 'Complete Test Location',
        address: 'Avenida Caracas # 45-67',
        building: 'Centro Comercial Plaza',
        schedule: { weekdays: '8-6', saturday: '8-2', sunday: 'Closed' },
        services: ['General'],
        contact: { phone: '123', email: 'test@test.com' },
        isPremium: false
      };

      const mapUrl = service.getMapUrl(locationWithBuilding);
      const decodedUrl = decodeURIComponent(mapUrl);
      
      // Verify the complete search query includes all components
      expect(decodedUrl).toContain('Avenida Caracas # 45-67');
      expect(decodedUrl).toContain('Centro Comercial Plaza');
      expect(decodedUrl).toContain('Bogotá, Colombia');
      
      // Verify the order: address, building, city, country
      const queryParam = new URL(mapUrl).searchParams.get('q');
      const decodedQuery = decodeURIComponent(queryParam!);
      expect(decodedQuery).toBe('Avenida Caracas # 45-67, Centro Comercial Plaza, Bogotá, Colombia');
    });
  });

  describe('Observable methods for compatibility', () => {
    it('getLocations should return locations as Observable', (done) => {
      service.getLocations().subscribe(locations => {
        expect(locations).toBeTruthy();
        expect(locations.length).toBe(4);
        expect(locations[0].id).toBe('el-dorado');
        done();
      });
    });

    it('getSpecialties should return unique specialties as Observable', (done) => {
      service.getSpecialties().subscribe(specialties => {
        expect(specialties).toBeTruthy();
        expect(specialties.length).toBeGreaterThan(0);
        
        // Verificar que son objetos Specialty
        specialties.forEach(specialty => {
          expect(specialty.id).toBeTruthy();
          expect(specialty.name).toBeTruthy();
          expect(specialty.description).toBeTruthy();
          expect(specialty.availableAt).toBeTruthy();
          expect(Array.isArray(specialty.availableAt)).toBe(true);
        });
        
        // Verificar que incluye especialidades esperadas
        const specialtyNames = specialties.map(s => s.name);
        expect(specialtyNames).toContain('Medicina General');
        expect(specialtyNames).toContain('Especialidades');
        
        // Verificar que no hay duplicados
        const uniqueNames = [...new Set(specialtyNames)];
        expect(specialtyNames.length).toBe(uniqueNames.length);
        done();
      });
    });

    it('getSpecialties should include premium specialties', (done) => {
      service.getSpecialties().subscribe(specialties => {
        const specialtyNames = specialties.map(s => s.name);
        expect(specialtyNames).toContain('Especialidades Premium');
        done();
      });
    });

    it('getSpecialties should map specialties to correct locations', (done) => {
      service.getSpecialties().subscribe(specialties => {
        const premiumSpecialty = specialties.find(s => s.name === 'Especialidades Premium');
        expect(premiumSpecialty).toBeTruthy();
        expect(premiumSpecialty!.availableAt).toContain('metropolis');
        
        const generalSpecialty = specialties.find(s => s.name === 'Medicina General');
        expect(generalSpecialty).toBeTruthy();
        expect(generalSpecialty!.availableAt.length).toBe(4); // Disponible en todas las ubicaciones
        done();
      });
    });
  });

  describe('getSpecialtyDescription (testing line 387 second conditional)', () => {
    it('should return predefined description for known specialties (first conditional)', () => {
      // Access private method for direct testing
      const privateService = service as any;
      
      const medicinaGeneralDesc = privateService.getSpecialtyDescription('Medicina General');
      expect(medicinaGeneralDesc).toBe('Atención médica integral para consultas generales y seguimiento de salud.');
      
      const especialidadesDesc = privateService.getSpecialtyDescription('Especialidades');
      expect(especialidadesDesc).toBe('Atención médica especializada en diversas áreas de la salud.');
      
      const especialidadesPremiumDesc = privateService.getSpecialtyDescription('Especialidades Premium');
      expect(especialidadesPremiumDesc).toBe('Atención médica especializada premium con servicios diferenciados.');
    });

    it('should return default format for unknown specialties (covers line 387 second conditional)', () => {
      // Access private method for direct testing of line 387 second conditional
      const privateService = service as any;
      
      // Test with custom specialty not in descriptions object
      const customSpecialtyDesc = privateService.getSpecialtyDescription('Cardiología');
      expect(customSpecialtyDesc).toBe('Servicios de cardiología.');
      
      // Test with another custom specialty
      const dermatologyDesc = privateService.getSpecialtyDescription('Dermatología');
      expect(dermatologyDesc).toBe('Servicios de dermatología.');
      
      // Test with specialty with mixed case
      const orthopedicsDesc = privateService.getSpecialtyDescription('ORTOPEDIA');
      expect(orthopedicsDesc).toBe('Servicios de ortopedia.');
      
      // Test with specialty with spaces and special characters
      const plasticSurgeryDesc = privateService.getSpecialtyDescription('Cirugía Plástica y Estética');
      expect(plasticSurgeryDesc).toBe('Servicios de cirugía plástica y estética.');
    });

    it('should handle edge cases in specialty names for default format', () => {
      const privateService = service as any;
      
      // Test with empty string
      const emptyDesc = privateService.getSpecialtyDescription('');
      expect(emptyDesc).toBe('Servicios de .');
      
      // Test with single character
      const singleCharDesc = privateService.getSpecialtyDescription('A');
      expect(singleCharDesc).toBe('Servicios de a.');
      
      // Test with numbers
      const numbersDesc = privateService.getSpecialtyDescription('Especialidad123');
      expect(numbersDesc).toBe('Servicios de especialidad123.');
      
      // Test with special characters
      const specialCharsDesc = privateService.getSpecialtyDescription('Medicina-General & Urgencias');
      expect(specialCharsDesc).toBe('Servicios de medicina-general & urgencias.');
    });

    it('should test line 387 second conditional through getSpecialties with mock data', () => {
      // Create a spy on the private method to verify it's called
      const privateService = service as any;
      const getSpecialtyDescriptionSpy = jest.spyOn(privateService, 'getSpecialtyDescription');
      
      // Mock locations with custom specialty to trigger the second conditional
      const originalLocations = privateService.locations;
      privateService.locations = [
        ...originalLocations,
        {
          id: 'test-location',
          name: 'Test Location',
          address: 'Test Address',
          schedule: { weekdays: '8-6', saturday: '8-2', sunday: 'Closed' },
          services: ['Neurología'], // Custom specialty not in descriptions
          contact: { phone: '123', email: 'test@test.com' },
          isPremium: false
        }
      ];
      
      service.getSpecialties().subscribe(specialties => {
        // Find the custom specialty
        const neurologySpecialty = specialties.find(s => s.name === 'Neurología');
        expect(neurologySpecialty).toBeTruthy();
        
        // Verify the description uses the default format (line 387 second conditional)
        expect(neurologySpecialty!.description).toBe('Servicios de neurología.');
        
        // Verify the method was called
        expect(getSpecialtyDescriptionSpy).toHaveBeenCalledWith('Neurología');
        
        // Restore original locations
        privateService.locations = originalLocations;
        getSpecialtyDescriptionSpy.mockRestore();
      });
    });

    it('should ensure toLowerCase() is applied in line 387 second conditional', () => {
      const privateService = service as any;
      
      // Test that uppercase specialty names are converted to lowercase in default format
      const uppercaseResult = privateService.getSpecialtyDescription('PEDIATRÍA');
      expect(uppercaseResult).toBe('Servicios de pediatría.');
      
      // Test mixed case
      const mixedCaseResult = privateService.getSpecialtyDescription('GiNeCOlogÍa');
      expect(mixedCaseResult).toBe('Servicios de ginecología.');
      
      // Verify that toLowerCase() is specifically applied in the template literal
      const testSpecialty = 'ENDOCRINOLOGÍA';
      const result = privateService.getSpecialtyDescription(testSpecialty);
      expect(result).toContain(testSpecialty.toLowerCase());
      expect(result).not.toContain(testSpecialty.toUpperCase());
    });
  });
});
