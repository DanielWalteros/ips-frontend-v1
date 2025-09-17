import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { InstitutionalPoliciesSectionComponent } from './institutional-policies-section.component';
import { PolicyCardComponent } from '../policy-card/policy-card.component';
import { Policy } from '../../shared/models/policy';
import { PolicyService } from '../../shared/services/policy.service';

describe('InstitutionalPoliciesSectionComponent', () => {
  let component: InstitutionalPoliciesSectionComponent;
  let fixture: ComponentFixture<InstitutionalPoliciesSectionComponent>;
  let mockPolicyService: jest.Mocked<PolicyService>;

  const mockPolicies: Policy[] = [
    {
      id: 'quality-policy',
      path: 'politica-de-calidad',
      title: 'Política de calidad',
      imageUrl: 'https://example.com/quality.svg',
      routerLink: '/sobre-nuestra-ips/politica-de-calidad',
      imageAlt: 'Política de calidad',
      dataSrcDesktop1x: 'https://example.com/quality-desktop.svg',
      dataSrcMobile1x: 'https://example.com/quality-mobile.svg',
      heroTitle: 'Política de Calidad IPS Salud Bolívar',
      heroBackgroundImage: 'https://example.com/quality-hero-bg.jpg',
      subtitle: 'Compromiso con la excelencia en servicios de salud',
      code: 'POL-CAL-001',
      version: '2.0',
      revisionDate: '2024-01-15',
      contentTitle: 'Nuestra Política de Calidad',
      contentDescription: 'Descripción detallada de nuestra política de calidad',
      contentIntroText: 'En IPS Salud Bolívar nos comprometemos a brindar servicios de salud con los más altos estándares de calidad',
      contentItems: [
        {
          id: 'quality-item-1',
          title: 'Mejora continua',
          description: 'Implementamos procesos de mejora continua en todos nuestros servicios'
        }
      ],
      listStyle: 'checkmarks'
    },
    {
      id: 'humanization-policy',
      path: 'politica-de-humanizacion',
      title: 'Política de humanización',
      imageUrl: 'https://example.com/humanization.svg',
      routerLink: '/sobre-nuestra-ips/politica-de-humanizacion',
      imageAlt: 'Política de humanización',
      dataSrcDesktop1x: 'https://example.com/humanization-desktop.svg',
      dataSrcMobile1x: 'https://example.com/humanization-mobile.svg',
      heroTitle: 'Política de Humanización IPS Salud Bolívar',
      heroBackgroundImage: 'https://example.com/humanization-hero-bg.jpg',
      subtitle: 'Atención centrada en el ser humano',
      code: 'POL-HUM-001',
      version: '1.5',
      revisionDate: '2024-02-10',
      contentTitle: 'Nuestra Política de Humanización',
      contentDescription: 'Descripción detallada de nuestra política de humanización',
      contentIntroText: 'Promovemos un trato digno y humano en todos nuestros servicios de salud',
      contentItems: [
        {
          id: 'humanization-item-1',
          title: 'Trato digno',
          description: 'Garantizamos un trato digno y respetuoso a todos nuestros pacientes'
        }
      ],
      listStyle: 'checkmarks'
    },
    {
      id: 'environmental-policy',
      path: 'politica-ambiental',
      title: 'Política ambiental',
      imageUrl: 'https://example.com/environmental.svg',
      routerLink: '/sobre-nuestra-ips/politica-ambiental',
      imageAlt: 'Política ambiental',
      dataSrcDesktop1x: 'https://example.com/environmental-desktop.svg',
      dataSrcMobile1x: 'https://example.com/environmental-mobile.svg',
      heroTitle: 'Política Ambiental IPS Salud Bolívar',
      heroBackgroundImage: 'https://example.com/environmental-hero-bg.jpg',
      subtitle: 'Compromiso con el medio ambiente',
      code: 'POL-AMB-001',
      version: '1.0',
      revisionDate: '2024-03-05',
      contentTitle: 'Nuestra Política Ambiental',
      contentDescription: 'Descripción detallada de nuestra política ambiental',
      contentIntroText: 'Nos comprometemos con la protección y preservación del medio ambiente',
      contentItems: [
        {
          id: 'environmental-item-1',
          title: 'Gestión sostenible',
          description: 'Implementamos prácticas de gestión sostenible en nuestras operaciones'
        }
      ],
      listStyle: 'checkmarks'
    },
    {
      id: 'patient-safety-policy',
      path: 'politica-de-seguridad-de-paciente',
      title: 'Política de seguridad del paciente',
      imageUrl: 'https://example.com/safety.svg',
      routerLink: '/sobre-nuestra-ips/politica-de-seguridad-de-paciente',
      imageAlt: 'Política de seguridad del paciente',
      dataSrcDesktop1x: 'https://example.com/safety-desktop.svg',
      dataSrcMobile1x: 'https://example.com/safety-mobile.svg',
      heroTitle: 'Política de Seguridad del Paciente IPS Salud Bolívar',
      heroBackgroundImage: 'https://example.com/safety-hero-bg.jpg',
      subtitle: 'Seguridad en primer lugar',
      code: 'POL-SEG-001',
      version: '3.0',
      revisionDate: '2024-01-20',
      contentTitle: 'Nuestra Política de Seguridad del Paciente',
      contentDescription: 'Descripción detallada de nuestra política de seguridad del paciente',
      contentIntroText: 'La seguridad del paciente es nuestra máxima prioridad en todos los procesos asistenciales',
      contentItems: [
        {
          id: 'safety-item-1',
          title: 'Prevención de errores',
          description: 'Implementamos sistemas de prevención de errores médicos'
        }
      ],
      listStyle: 'traditional',
      contentSections: [
        {
          id: 'safety-section-1',
          introText: 'Metas internacionales de seguridad del paciente',
          items: [
            {
              id: 'safety-section-item-1',
              title: 'Identificación correcta',
              description: 'Identificar correctamente a los pacientes'
            }
          ]
        }
      ]
    }
  ];

  beforeEach(async () => {
    mockPolicyService = {
      getAllPolicies: jest.fn().mockReturnValue(of(mockPolicies)),
      getPolicyByPath: jest.fn(),
      getPolicyById: jest.fn(),
      policyExists: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, InstitutionalPoliciesSectionComponent, PolicyCardComponent],
      providers: [
        { provide: PolicyService, useValue: mockPolicyService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionalPoliciesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load institutional policies from service', () => {
    expect(mockPolicyService.getAllPolicies).toHaveBeenCalled();
    expect(component.institutionalPolicies).toBeDefined();
    expect(component.institutionalPolicies).toEqual(mockPolicies);
    expect(component.institutionalPolicies.length).toBe(4);
    expect(component.isLoading).toBe(false);
  });

  it('should render institutional policies section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const institutionalPoliciesSection = compiled.querySelector('.institutional-policies-section');
    expect(institutionalPoliciesSection).toBeTruthy();

    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();

    const row = compiled.querySelector('.row');
    expect(row).toBeTruthy();
  });

  it('should display policies title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const policiesTitle = compiled.querySelector('.policies-title');
    expect(policiesTitle).toBeTruthy();
    expect(policiesTitle?.textContent?.trim()).toBe('Políticas institucionales');
  });

  it('should display policies description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const policiesDescription = compiled.querySelector('.policies-description');
    expect(policiesDescription).toBeTruthy();
    expect(policiesDescription?.textContent).toContain('Nuestras políticas institucionales fundamentan');
    expect(policiesDescription?.textContent).toContain('haga clic en cada una para conocerla');
  });

  it('should render policy cards for each institutional policy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const policyCards = compiled.querySelectorAll('app-policy-card');
    expect(policyCards.length).toBe(4);
    expect(policyCards.length).toBe(component.institutionalPolicies.length);
  });

  it('should have valid institutional policy data', () => {
    component.institutionalPolicies.forEach(policy => {
      expect(policy.id).toBeDefined();
      expect(policy.title).toBeDefined();
      expect(policy.imageUrl).toBeDefined();
      expect(policy.routerLink).toBeDefined();
      expect(policy.routerLink.startsWith('/sobre-nuestra-ips/')).toBeTruthy();
    });
  });

  it('should display all four institutional policies', () => {
    const policyIds = component.institutionalPolicies.map(policy => policy.id);
    
    expect(policyIds).toContain('quality-policy');
    expect(policyIds).toContain('humanization-policy');
    expect(policyIds).toContain('environmental-policy');
    expect(policyIds).toContain('patient-safety-policy');
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardContainer = compiled.querySelector('.row.g-4');
    expect(cardContainer).toBeTruthy();

    const policyCards = compiled.querySelectorAll('app-policy-card');
    expect(policyCards.length).toBe(4); // Four policy cards
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const institutionalPoliciesSection = compiled.querySelector('.institutional-policies-section');
    expect(institutionalPoliciesSection?.classList.contains('py-5')).toBeTruthy();

    const policiesTitle = compiled.querySelector('.policies-title');
    expect(policiesTitle?.classList.contains('text-center')).toBeTruthy();
    expect(policiesTitle?.classList.contains('mb-3')).toBeTruthy();

    const policiesDescription = compiled.querySelector('.policies-description');
    expect(policiesDescription?.classList.contains('text-center')).toBeTruthy();
    expect(policiesDescription?.classList.contains('mb-5')).toBeTruthy();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for proper heading hierarchy
    const h2 = compiled.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2?.textContent?.trim()).toBe('Políticas institucionales');
    
    // Check for semantic section structure
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
    
    // Check for descriptive content
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toContain('políticas institucionales');
  });

  it('should display policies with meaningful titles', () => {
    component.institutionalPolicies.forEach(policy => {
      expect(policy.title).toContain('Política');
      expect(policy.title.length).toBeGreaterThan(15);
    });
  });

  it('should have valid router links for policies', () => {
    component.institutionalPolicies.forEach(policy => {
      expect(policy.routerLink).toMatch(/^\/sobre-nuestra-ips\/[\w-]+$/);
    });
  });

  it('should have image URLs for all policies', () => {
    component.institutionalPolicies.forEach(policy => {
      expect(policy.imageUrl).toBeDefined();
      expect(policy.imageUrl.startsWith('https://')).toBeTruthy();
      expect(policy.imageUrl.includes('.svg')).toBeTruthy();
    });
  });

  it('should display comprehensive information about institutional policies', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('.policies-description');
    
    // Check for key institutional policy keywords
    const descriptionText = description?.textContent?.toLowerCase() || '';
    expect(descriptionText).toContain('políticas institucionales');
    expect(descriptionText).toContain('valores');
    expect(descriptionText).toContain('fundamentan');
    expect(descriptionText).toContain('reflejan');
  });

  it('should show loading state initially', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingElement = compiled.querySelector('.spinner-border');
    const policyCards = compiled.querySelectorAll('app-policy-card');
    
    expect(loadingElement).toBeTruthy();
    expect(policyCards.length).toBe(0); // No policy cards should be shown during loading
  });

  it('should handle service error gracefully', () => {
    // Create a spy to track console errors
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock the service to return an error
    mockPolicyService.getAllPolicies.mockReturnValue(throwError(() => new Error('Service error')));
    
    // Create a new component with the error service
    const newFixture = TestBed.createComponent(InstitutionalPoliciesSectionComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.institutionalPolicies.length).toBe(0);
    expect(newComponent.isLoading).toBe(false);
    
    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('should handle empty policies response', () => {
    // Create a separate test with empty policies array
    mockPolicyService.getAllPolicies.mockReturnValue(of([]));
    
    // Create a new component with the modified service
    const newFixture = TestBed.createComponent(InstitutionalPoliciesSectionComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.institutionalPolicies.length).toBe(0);
    expect(newComponent.isLoading).toBe(false);
  });

  describe('Error handling', () => {
    it('should set isLoading to false when service returns error', () => {
      // Reset the component to initial state
      component.isLoading = true;
      component.institutionalPolicies = [];
      
      // Mock the service to throw an error
      mockPolicyService.getAllPolicies.mockReturnValue(throwError(() => new Error('Network error')));
      
      // Call loadPolicies method directly
      component.ngOnInit();
      
      expect(component.isLoading).toBe(false);
      expect(component.institutionalPolicies.length).toBe(0);
    });

    it('should handle network timeout errors', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      mockPolicyService.getAllPolicies.mockReturnValue(throwError(() => new Error('Timeout')));
      
      const newFixture = TestBed.createComponent(InstitutionalPoliciesSectionComponent);
      const newComponent = newFixture.componentInstance;
      newFixture.detectChanges();

      expect(newComponent.isLoading).toBe(false);
      expect(newComponent.institutionalPolicies).toEqual([]);
      
      consoleSpy.mockRestore();
    });
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });

  describe('Mock data validation', () => {
    it('should have complete Policy interface data for all mock policies', () => {
      // Verify all required properties are present in mock data
      mockPolicies.forEach((policy, index) => {
        expect(policy.id).toBeDefined();
        expect(policy.path).toBeDefined();
        expect(policy.title).toBeDefined();
        expect(policy.imageUrl).toBeDefined();
        expect(policy.routerLink).toBeDefined();
        expect(policy.imageAlt).toBeDefined();
        expect(policy.dataSrcDesktop1x).toBeDefined();
        expect(policy.dataSrcMobile1x).toBeDefined();
        
        // Hero section properties
        expect(policy.heroTitle).toBeDefined();
        expect(policy.heroBackgroundImage).toBeDefined();
        expect(policy.subtitle).toBeDefined();
        expect(policy.code).toBeDefined();
        expect(policy.version).toBeDefined();
        expect(policy.revisionDate).toBeDefined();
        
        // Content section properties
        expect(policy.contentTitle).toBeDefined();
        expect(policy.contentDescription).toBeDefined();
        expect(policy.contentIntroText).toBeDefined();
        expect(policy.contentItems).toBeDefined();
        expect(Array.isArray(policy.contentItems)).toBeTruthy();
        expect(policy.contentItems.length).toBeGreaterThan(0);
        expect(policy.listStyle).toBeDefined();
        expect(['checkmarks', 'traditional']).toContain(policy.listStyle);
        
        // Verify contentItems structure
        policy.contentItems.forEach(item => {
          expect(item.id).toBeDefined();
          expect(item.description).toBeDefined();
          // title is optional in PolicyContentItem
        });
      });
    });

    it('should have patient safety policy with contentSections', () => {
      const patientSafetyPolicy = mockPolicies.find(p => p.id === 'patient-safety-policy');
      
      expect(patientSafetyPolicy).toBeDefined();
      expect(patientSafetyPolicy?.contentSections).toBeDefined();
      expect(Array.isArray(patientSafetyPolicy?.contentSections)).toBeTruthy();
      expect(patientSafetyPolicy?.contentSections?.length).toBeGreaterThan(0);
      
      // Verify contentSections structure
      patientSafetyPolicy?.contentSections?.forEach(section => {
        expect(section.id).toBeDefined();
        expect(section.items).toBeDefined();
        expect(Array.isArray(section.items)).toBeTruthy();
        
        section.items.forEach(item => {
          expect(item.id).toBeDefined();
          expect(item.description).toBeDefined();
        });
      });
    });

    it('should have different listStyle values in mock data', () => {
      const checkmarksStyles = mockPolicies.filter(p => p.listStyle === 'checkmarks');
      const traditionalStyles = mockPolicies.filter(p => p.listStyle === 'traditional');
      
      expect(checkmarksStyles.length).toBeGreaterThan(0);
      expect(traditionalStyles.length).toBeGreaterThan(0);
    });

    it('should have unique IDs and codes for all policies', () => {
      const ids = mockPolicies.map(p => p.id);
      const codes = mockPolicies.map(p => p.code);
      const paths = mockPolicies.map(p => p.path);
      
      // Check for uniqueness
      expect(new Set(ids).size).toBe(mockPolicies.length);
      expect(new Set(codes).size).toBe(mockPolicies.length);
      expect(new Set(paths).size).toBe(mockPolicies.length);
    });

    it('should have realistic version and date formats', () => {
      mockPolicies.forEach(policy => {
        // Version should follow semantic versioning pattern
        expect(policy.version).toMatch(/^\d+\.\d+$/);
        
        // Revision date should be in YYYY-MM-DD format
        expect(policy.revisionDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        
        // Code should follow POL-XXX-001 pattern
        expect(policy.code).toMatch(/^POL-[A-Z]{3}-\d{3}$/);
      });
    });
  });

  describe('Component lifecycle and dependencies', () => {
    it('should call PolicyService.getAllPolicies on initialization', () => {
      expect(mockPolicyService.getAllPolicies).toHaveBeenCalledTimes(1);
    });

    it('should have proper dependency injection', () => {
      expect(component['policyService']).toBeDefined();
      expect(component['policyService']).toBe(mockPolicyService);
    });

    it('should implement OnInit interface correctly', () => {
      expect(component.ngOnInit).toBeDefined();
      expect(typeof component.ngOnInit).toBe('function');
    });
  });
});
