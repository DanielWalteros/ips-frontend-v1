import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { PolicyDetailComponent } from './policy-detail.component';
import { PolicyService } from '../../shared/services/policy.service';
import { Policy } from '../../shared/models/policy';

describe('PolicyDetailComponent', () => {
  let component: PolicyDetailComponent;
  let fixture: ComponentFixture<PolicyDetailComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockPolicyService: any;
  let mockRouter: any;

  const mockPolicy: Policy = {
    id: 'quality-policy',
    path: 'politica-de-calidad',
    title: 'Política de calidad',
    imageUrl: 'https://example.com/image.svg',
    routerLink: '/sobre-nuestra-ips/politica-de-calidad',
    imageAlt: 'Política de calidad',
    dataSrcDesktop1x: 'https://example.com/image-desktop.svg',
    dataSrcMobile1x: 'https://example.com/image-mobile.svg',
    heroTitle: 'Direccionamiento y Gerencia Planeación Estratégica',
    heroBackgroundImage: 'https://example.com/hero-bg.jpg',
    subtitle: 'Sistema de Gestión de Calidad',
    code: 'DG-PE-010',
    version: '002',
    revisionDate: 'Enero 2021',
    contentTitle: 'Política de Calidad',
    contentDescription: 'En Salud Bolívar IPS estamos comprometidos con una atención de salud accesible, oportuna, pertinente, segura.',
    contentIntroText: 'Para asumir este compromiso realizamos mejora continua a través de:',
    contentItems: [
      {
        id: 'human-team',
        title: 'Equipo Humano:',
        description: 'Idóneo, amable, comprometido, y fortalecido en cultura de Seguridad del Paciente'
      },
      {
        id: 'environment',
        title: 'Ambiente:',
        description: 'Con desarrollo de un clima organizacional amigable, disciplinado y respetuoso'
      }
    ]
  };

  beforeEach(async () => {
    const policyServiceSpy = {
      getPolicyByPath: jest.fn().mockReturnValue(of(mockPolicy))
    };
    
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('politica-de-calidad')
        }
      } as any
    };

    await TestBed.configureTestingModule({
      imports: [PolicyDetailComponent, RouterTestingModule],
      providers: [
        { provide: PolicyService, useValue: policyServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyDetailComponent);
    component = fixture.componentInstance;
    mockPolicyService = TestBed.inject(PolicyService) as any;
    mockRouter = TestBed.inject(Router) as any;
    
    // Mock router.navigate
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', () => {
    expect(component.isLoading).toBe(true);
    expect(component.policy).toBeNull();
  });

  it('should load policy on init when policyPath is provided', () => {
    component.ngOnInit();
    
    expect(mockPolicyService.getPolicyByPath).toHaveBeenCalledWith('politica-de-calidad');
    expect(component.policy).toEqual(mockPolicy);
    expect(component.isLoading).toBe(false);
  });

  it('should redirect to home when policyPath is not provided', () => {
    (mockActivatedRoute.snapshot!.paramMap.get as any).mockReturnValue(null);
    
    component.ngOnInit();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to home when policy is not found', () => {
    mockPolicyService.getPolicyByPath.mockReturnValue(of(null));
    
    component.ngOnInit();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to home when service throws error', () => {
    mockPolicyService.getPolicyByPath.mockReturnValue(throwError('Service error'));
    
    component.ngOnInit();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should render policy components when policy is loaded', () => {
    component.policy = mockPolicy;
    component.isLoading = false;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that policy components are present
    expect(compiled.querySelector('app-breadcrumb')).toBeTruthy();
    expect(compiled.querySelector('app-policy-hero')).toBeTruthy();
    expect(compiled.querySelector('app-policy-content')).toBeTruthy();
    expect(compiled.querySelector('app-policy-additional-sections')).toBeTruthy();
  });

  it('should handle component states correctly', () => {
    // Test that the component can be set to different states
    component.isLoading = true;
    component.policy = null;
    expect(component.isLoading).toBe(true);
    expect(component.policy).toBeNull();
    
    component.isLoading = false;
    component.policy = mockPolicy;
    expect(component.isLoading).toBe(false);
    expect(component.policy).toEqual(mockPolicy);
  });

});
