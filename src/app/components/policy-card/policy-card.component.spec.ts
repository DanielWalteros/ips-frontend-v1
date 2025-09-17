import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { PolicyCardComponent } from './policy-card.component';
import { Policy } from '../../shared/models/policy';

describe('PolicyCardComponent', () => {
  let component: PolicyCardComponent;
  let fixture: ComponentFixture<PolicyCardComponent>;
  
  const mockPolicy: Policy = {
    id: 'test-policy',
    title: 'Test Policy',
    imageUrl: 'https://example.com/test-image.svg',
    routerLink: '/test-policy',
    imageAlt: 'Test Policy Image',
    dataSrcDesktop1x: 'https://example.com/test-image-desktop.svg',
    dataSrcMobile1x: 'https://example.com/test-image-mobile.svg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, PolicyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyCardComponent);
    component = fixture.componentInstance;
    
    // Set the required input
    component.policy = mockPolicy;
    
    // Trigger change detection after setting the input
    fixture.detectChanges();
    
    // Additional change detection cycle to ensure bindings are processed
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required policy input', () => {
    expect(component.policy).toBeDefined();
    expect(component.policy).toEqual(mockPolicy);
  });

  it('should render policy title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const policyTitle = compiled.querySelector('.policy-title');
    
    expect(policyTitle).toBeTruthy();
    expect(policyTitle?.textContent?.trim()).toBe('Test Policy');
  });

  it('should render policy image with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const policyImage = compiled.querySelector('.policy-icon-container img') as HTMLImageElement;
    
    expect(policyImage).toBeTruthy();
    expect(policyImage.src).toBe('https://example.com/test-image.svg');
    expect(policyImage.alt).toBe('Test Policy Image');
    expect(policyImage.getAttribute('data-src-desktop-1x')).toBe('https://example.com/test-image-desktop.svg');
    expect(policyImage.getAttribute('data-src-mobile-1x')).toBe('https://example.com/test-image-mobile.svg');
  });

  it('should have router link with correct path', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const routerLink = compiled.querySelector('.policy-title');
    
    expect(routerLink).toBeTruthy();
    // In test environment, Angular transforms routerLink to ng-reflect-router-link
    const reflectedLink = routerLink?.getAttribute('ng-reflect-router-link');
    expect(reflectedLink).toBe('/test-policy');
  });

  it('should have proper CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const policyCard = compiled.querySelector('.policy-card');
    expect(policyCard).toBeTruthy();
    expect(policyCard?.classList.contains('h-100')).toBeTruthy();
    expect(policyCard?.classList.contains('text-center')).toBeTruthy();
    expect(policyCard?.classList.contains('p-4')).toBeTruthy();
    
    const iconContainer = compiled.querySelector('.policy-icon-container');
    expect(iconContainer).toBeTruthy();
    expect(iconContainer?.classList.contains('mb-3')).toBeTruthy();
    
    const policyTitle = compiled.querySelector('.policy-title');
    expect(policyTitle).toBeTruthy();
    expect(policyTitle?.classList.contains('text-decoration-underline')).toBeTruthy();
  });

  it('should have policy card structure without column classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const policyCardDiv = compiled.querySelector('.policy-card');
    
    expect(policyCardDiv).toBeTruthy();
    expect(policyCardDiv?.classList.contains('policy-card')).toBeTruthy();
    expect(policyCardDiv?.classList.contains('h-100')).toBeTruthy();
    expect(policyCardDiv?.classList.contains('text-center')).toBeTruthy();
    expect(policyCardDiv?.classList.contains('p-4')).toBeTruthy();
  });

  it('should handle missing optional imageAlt', () => {
    const policyWithoutAlt: Policy = {
      ...mockPolicy,
      imageAlt: undefined
    };
    
    component.policy = policyWithoutAlt;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const policyImage = compiled.querySelector('.policy-icon-container img') as HTMLImageElement;
    
    expect(policyImage).toBeTruthy();
    expect(policyImage.alt).toBe('');
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for semantic structure
    const heading = compiled.querySelector('h3');
    expect(heading).toBeTruthy();
    expect(heading?.textContent?.trim()).toBe('Test Policy');
    
    // Check for image with alt text
    const image = compiled.querySelector('img');
    expect(image).toBeTruthy();
    expect(image?.alt).toBeDefined();
    
    // Check for interactive element (router link)
    const link = compiled.querySelector('.policy-title');
    expect(link).toBeTruthy();
    // Check that it has router link functionality (reflected attribute in tests)
    const reflectedLink = link?.getAttribute('ng-reflect-router-link');
    expect(reflectedLink).toBeDefined();
    expect(reflectedLink).toBe('/test-policy');
  });
});
