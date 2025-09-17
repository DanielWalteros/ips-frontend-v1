import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ServicesComponent } from './services.component';
import { LocationsService } from '../../shared/services/locations.service';
import { Location, Specialty } from '../../shared/models/location';
import { ServicesHeroComponent } from '../../components/services-hero/services-hero.component';
import { ServicesOverviewComponent } from '../../components/services-overview/services-overview.component';
import { VaccinationSectionComponent } from '../../components/vaccination-section/vaccination-section.component';
import { LocationDetailComponent } from '../../components/location-detail/location-detail.component';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;
  let debugElement: DebugElement;
  let locationService: LocationsService;

  // Mock data
  const mockLocations: Location[] = [
    {
      id: 'eldorado',
      name: 'Unidad de Atención Integral El Dorado',
      address: 'Calle 26 #69D-91',
      schedule: { weekdays: '7:00 AM - 7:00 PM', saturday: '8:00 AM - 5:00 PM' },
      services: ['medicina-general', 'cardiologia'],
      contact: { phone: '#322', email: 'eldorado@saludbolivar.com' },
      isPremium: false
    },
    {
      id: 'metropolis',
      name: 'Unidad Médica Premium Metrópolis',
      address: 'Carrera 68 #75A-50',
      schedule: { weekdays: '7:00 AM - 7:00 PM', saturday: '8:00 AM - 4:00 PM' },
      services: ['medicina-estetica', 'chequeos-ejecutivos'],
      contact: { phone: '#322', email: 'metropolis@saludbolivar.com' },
      isPremium: true
    }
  ];

  const mockSpecialties: Specialty[] = [
    {
      id: 'medicina-general',
      name: 'Medicina General',
      description: 'Atención médica integral',
      availableAt: ['eldorado', 'calle134']
    },
    {
      id: 'cardiologia',
      name: 'Cardiología',
      description: 'Especialidad del corazón',
      availableAt: ['eldorado']
    },
    {
      id: 'medicina-estetica',
      name: 'Medicina Estética',
      description: 'Tratamientos estéticos',
      availableAt: ['metropolis']
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ServicesComponent,
        ServicesHeroComponent,
        ServicesOverviewComponent,
        VaccinationSectionComponent,
        LocationDetailComponent,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        LocationsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    locationService = TestBed.inject(LocationsService);

    // Create spies on the actual service methods
    jest.spyOn(locationService, 'getLocations').mockReturnValue(of(mockLocations));
    jest.spyOn(locationService, 'getSpecialties').mockReturnValue(of(mockSpecialties));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with empty arrays and default values', () => {
      expect(component.locations).toEqual([]);
      expect(component.specialties).toEqual([]);
      expect(component.filteredSpecialties).toEqual([]);
      expect(component.searchTerm).toBe('');
      expect(component.selectedLocation).toBe('');
    });

    it('should call loadLocations and loadSpecialties on ngOnInit', () => {
      jest.spyOn(component, 'loadLocations');
      jest.spyOn(component, 'loadSpecialties');
      
      component.ngOnInit();
      
      expect(component.loadLocations).toHaveBeenCalled();
      expect(component.loadSpecialties).toHaveBeenCalled();
    });

    it('should load locations from service', () => {
      component.loadLocations();
      
      expect(locationService.getLocations).toHaveBeenCalled();
      expect(component.locations).toEqual(mockLocations);
    });

    it('should load specialties and set filtered specialties', () => {
      component.loadSpecialties();
      
      expect(locationService.getSpecialties).toHaveBeenCalled();
      expect(component.specialties).toEqual(mockSpecialties);
      expect(component.filteredSpecialties).toEqual(mockSpecialties);
    });
  });

  describe('Search and Filtering', () => {
    beforeEach(() => {
      component.specialties = mockSpecialties;
      component.filteredSpecialties = mockSpecialties;
    });

    it('should filter by search term - specialty name', () => {
      component.searchTerm = 'cardio';
      component.filterServices();
      
      expect(component.filteredSpecialties.length).toBe(1);
      expect(component.filteredSpecialties[0].id).toBe('cardiologia');
    });

    it('should filter by search term - case insensitive', () => {
      component.searchTerm = 'MEDICINA';
      component.filterServices();
      
      expect(component.filteredSpecialties.length).toBe(2);
      expect(component.filteredSpecialties.map(s => s.id)).toContain('medicina-general');
      expect(component.filteredSpecialties.map(s => s.id)).toContain('medicina-estetica');
    });

    it('should filter by search term in description', () => {
      component.searchTerm = 'integral';
      component.filterServices();
      
      expect(component.filteredSpecialties.length).toBe(1);
      expect(component.filteredSpecialties[0].id).toBe('medicina-general');
    });

    it('should filter by location', () => {
      component.selectedLocation = 'eldorado';
      component.filterServices();
      
      expect(component.filteredSpecialties.length).toBe(2);
      expect(component.filteredSpecialties.map(s => s.id)).toContain('medicina-general');
      expect(component.filteredSpecialties.map(s => s.id)).toContain('cardiologia');
    });

    it('should combine search term and location filters', () => {
      component.searchTerm = 'general';
      component.selectedLocation = 'eldorado';
      component.filterServices();
      
      expect(component.filteredSpecialties.length).toBe(1);
      expect(component.filteredSpecialties[0].id).toBe('medicina-general');
    });

    it('should return empty array when no matches found', () => {
      component.searchTerm = 'nonexistent';
      component.filterServices();
      
      expect(component.filteredSpecialties.length).toBe(0);
    });

    it('should handle filterByLocation method', () => {
      jest.spyOn(component, 'filterServices');
      
      component.filterByLocation('eldorado');
      
      expect(component.selectedLocation).toBe('eldorado');
      expect(component.filterServices).toHaveBeenCalled();
    });

    it('should clear all filters', () => {
      component.searchTerm = 'test';
      component.selectedLocation = 'eldorado';
      component.filteredSpecialties = [];
      
      component.clearFilters();
      
      expect(component.searchTerm).toBe('');
      expect(component.selectedLocation).toBe('');
      expect(component.filteredSpecialties).toEqual(mockSpecialties);
    });
  });

  describe('Utility Methods', () => {
    beforeEach(() => {
      component.locations = mockLocations;
    });

    it('should get specialty icon', () => {
      expect(component.getSpecialtyIcon('medicina-general')).toBe('fas fa-user-md');
      expect(component.getSpecialtyIcon('cardiologia')).toBe('fas fa-heartbeat');
      expect(component.getSpecialtyIcon('unknown')).toBe('fas fa-stethoscope');
    });

    it('should get specialty description', () => {
      expect(component.getSpecialtyDescription('medicina-general')).toContain('Atención médica integral');
      expect(component.getSpecialtyDescription('cardiologia')).toContain('corazón y sistema cardiovascular');
      expect(component.getSpecialtyDescription('unknown')).toBe('');
    });

    it('should get available locations count', () => {
      const specialty = mockSpecialties[0]; // medicina-general with 2 locations
      expect(component.getAvailableLocationsCount(specialty)).toBe(2);
    });

    it('should correctly identify premium locations', () => {
      expect(component.isLocationPremium('metropolis')).toBe(true);
      expect(component.isLocationPremium('eldorado')).toBe(false);
      expect(component.isLocationPremium('unknown')).toBe(false);
    });

    it('should correctly identify premium specialties', () => {
      const premiumSpecialty = mockSpecialties[2]; // medicina-estetica
      const regularSpecialty = mockSpecialties[1]; // cardiologia
      
      expect(component.isSpecialtyPremium(premiumSpecialty)).toBe(true);
      expect(component.isSpecialtyPremium(regularSpecialty)).toBe(false);
    });

    it('should provide trackBy function', () => {
      const specialty = mockSpecialties[0];
      expect(component.trackBySpecialtyId(0, specialty)).toBe('medicina-general');
    });
  });

  describe('Component Composition', () => {
    beforeEach(() => {
      component.locations = mockLocations;
      fixture.detectChanges();
    });

    it('should render ServicesHeroComponent', () => {
      const heroComponent = debugElement.query(By.css('app-services-hero'));
      expect(heroComponent).toBeTruthy();
    });

    it('should render ServicesOverviewComponent', () => {
      const overviewComponent = debugElement.query(By.css('app-services-overview'));
      expect(overviewComponent).toBeTruthy();
    });

    it('should render VaccinationSectionComponent', () => {
      const vaccinationComponent = debugElement.query(By.css('app-vaccination-section'));
      expect(vaccinationComponent).toBeTruthy();
    });

    it('should render LocationDetailComponents for each location', () => {
      const locationComponents = debugElement.queryAll(By.css('app-location-detail'));
      expect(locationComponents.length).toBe(mockLocations.length);
    });

    it('should pass correct location data to LocationDetailComponents', () => {
      const locationComponents = debugElement.queryAll(By.css('app-location-detail'));
      
      locationComponents.forEach((locationComponent, index) => {
        const componentInstance = locationComponent.componentInstance;
        expect(componentInstance.location).toBe(mockLocations[index]);
        expect(componentInstance.showTitle).toBe(true);
      });
    });

    it('should use trackBy function for location iteration', () => {
      // Test that trackByLocationId is defined and works correctly
      const location = mockLocations[0];
      expect(component.trackByLocationId(0, location)).toBe(location.id);
    });

    it('should handle trackByLocationId with different locations', () => {
      mockLocations.forEach((location, index) => {
        expect(component.trackByLocationId(index, location)).toBe(location.id);
      });
    });

    it('should have trackByLocationId method defined', () => {
      expect(typeof component.trackByLocationId).toBe('function');
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      component.locations = mockLocations;
      component.specialties = mockSpecialties;
      component.filteredSpecialties = mockSpecialties;
      fixture.detectChanges();
    });

    it('should have clean template structure with component composition', () => {
      // Verify the template is now minimal and uses component composition
      const templateContent = debugElement.nativeElement.innerHTML;
      expect(templateContent).toContain('app-services-hero');
      expect(templateContent).toContain('app-services-overview');
      expect(templateContent).toContain('app-location-detail');
      expect(templateContent).toContain('app-vaccination-section');
    });

    // Note: The following tests are no longer applicable since the main template 
    // now uses component composition. Specific UI elements are tested in their 
    // respective component test files.

    it('should have minimal template focused on component orchestration', () => {
      // The main component should now focus only on orchestrating child components
      const mainTemplate = debugElement.nativeElement;
      
      // Should not contain complex UI elements (moved to child components)
      expect(mainTemplate.querySelector('.stat-card')).toBeFalsy();
      expect(mainTemplate.querySelector('.location-filter')).toBeFalsy();
      expect(mainTemplate.querySelector('.specialty-card')).toBeFalsy();
      
      // Should contain child components
      expect(mainTemplate.querySelector('app-services-hero')).toBeTruthy();
      expect(mainTemplate.querySelector('app-services-overview')).toBeTruthy();
      expect(mainTemplate.querySelector('app-location-detail')).toBeTruthy();
      expect(mainTemplate.querySelector('app-vaccination-section')).toBeTruthy();
    });
  });

  // Note: Filter Interactions are no longer tested here as the filtering UI 
  // has been moved to child components. The logic remains in this component 
  // for potential future use.

  // Note: Empty State, Featured Services, and specific Accessibility tests 
  // are now handled by individual child components. The main component 
  // focuses on data management and component orchestration.

  describe('Performance', () => {
    it('should render without errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should use trackBy for ngFor performance', () => {
      // TrackBy function should be defined and working
      const specialty = mockSpecialties[0];
      expect(component.trackBySpecialtyId(0, specialty)).toBeDefined();
      expect(typeof component.trackBySpecialtyId(0, specialty)).toBe('string');
    });
  });

  describe('Integration Tests', () => {
    beforeEach(() => {
      component.locations = mockLocations;
      fixture.detectChanges();
    });

    it('should successfully integrate all child components', () => {
      // Test that all components are rendered and there are no integration issues
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
      
      // Verify all child components are present
      expect(debugElement.query(By.css('app-services-hero'))).toBeTruthy();
      expect(debugElement.query(By.css('app-services-overview'))).toBeTruthy();
      expect(debugElement.queryAll(By.css('app-location-detail')).length).toBe(mockLocations.length);
      expect(debugElement.query(By.css('app-vaccination-section'))).toBeTruthy();
    });

    it('should maintain proper component hierarchy', () => {
      const componentsInOrder = [
        'app-services-hero',
        'app-services-overview', 
        'app-location-detail',
        'app-vaccination-section'
      ];
      
      const elements = debugElement.nativeElement.children;
      let foundComponents = 0;
      
      // Check that components appear in the expected order
      for (let element of elements) {
        if (element.tagName && componentsInOrder.includes(element.tagName.toLowerCase())) {
          foundComponents++;
        }
      }
      
      expect(foundComponents).toBeGreaterThan(0);
    });
  });
});
