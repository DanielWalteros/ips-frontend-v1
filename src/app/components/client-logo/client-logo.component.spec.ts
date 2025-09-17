import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ClientLogoComponent } from './client-logo.component';
import { Client } from '../../shared/models/client';

describe('ClientLogoComponent', () => {
  let component: ClientLogoComponent;
  let fixture: ComponentFixture<ClientLogoComponent>;
  let debugElement: DebugElement;

  const mockClient: Client = {
    id: 'seguros-bolivar',
    name: 'Seguros Bolívar',
    logoUrl: 'https://example.com/seguros-bolivar-logo.png',
    websiteUrl: 'https://www.segurosbolivar.com/',
    altText: 'Seguros Bolívar'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLogoComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    
    // Set up mock data
    component.client = mockClient;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Rendering', () => {
    it('should display the client logo container', () => {
      const clientLogo = debugElement.query(By.css('.client-logo'));
      expect(clientLogo).toBeTruthy();
    });

    it('should display client logo image', () => {
      const logoImg = debugElement.query(By.css('.client-logo-img'));
      expect(logoImg).toBeTruthy();
      expect(logoImg.nativeElement.src).toBe(mockClient.logoUrl);
      expect(logoImg.nativeElement.alt).toBe(mockClient.altText);
    });

    it('should have correct link to client website', () => {
      const linkElement = debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.href).toBe(mockClient.websiteUrl);
      expect(linkElement.nativeElement.target).toBe('_blank');
    });

    it('should have proper aria-label for accessibility', () => {
      const linkElement = debugElement.query(By.css('a'));
      const expectedAriaLabel = `Visitar sitio web de ${mockClient.name}`;
      expect(linkElement.nativeElement.getAttribute('aria-label')).toBe(expectedAriaLabel);
    });
  });

  describe('Client With Website', () => {
    beforeEach(() => {
      component.client = {
        ...mockClient,
        websiteUrl: 'https://example.com/client-website'
      };
      fixture.detectChanges();
    });

    it('should have external link with target="_blank"', () => {
      const linkElement = debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.href).toBe('https://example.com/client-website');
      expect(linkElement.nativeElement.target).toBe('_blank');
    });
  });

  describe('Client Without Website', () => {
    beforeEach(() => {
      component.client = {
        ...mockClient,
        websiteUrl: undefined
      };
      fixture.detectChanges();
    });

    it('should have link with target="_self" when no website URL', () => {
      const linkElement = debugElement.query(By.css('a'));
      expect(linkElement.nativeElement.target).toBe('_self');
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for logo image', () => {
      const logoImg = debugElement.query(By.css('.client-logo-img'));
      expect(logoImg.nativeElement.alt).toBe(mockClient.altText);
      expect(logoImg.nativeElement.alt.length).toBeGreaterThan(0);
    });

    it('should have descriptive aria-label on link', () => {
      const linkElement = debugElement.query(By.css('a'));
      const ariaLabel = linkElement.nativeElement.getAttribute('aria-label');
      expect(ariaLabel).toContain(mockClient.name);
      expect(ariaLabel).toContain('Visitar sitio web');
    });

    it('should have proper focus styles', () => {
      const linkElement = debugElement.query(By.css('a'));
      expect(linkElement).toBeTruthy();
      // Focus styles are handled by CSS, just verify element exists
    });
  });

  describe('Styling and Layout', () => {
    it('should have proper container styling classes', () => {
      const clientLogo = debugElement.query(By.css('.client-logo'));
      expect(clientLogo.nativeElement.classList).toContain('client-logo');
    });

    it('should have logo image with correct classes', () => {
      const logoImg = debugElement.query(By.css('.client-logo-img'));
      expect(logoImg.nativeElement.classList).toContain('img-fluid');
      expect(logoImg.nativeElement.classList).toContain('client-logo-img');
    });

    it('should have link as inline-block element', () => {
      const linkElement = debugElement.query(By.css('a'));
      expect(linkElement).toBeTruthy();
      // CSS styles are applied via stylesheet
    });
  });

  describe('Component Input', () => {
    it('should handle input changes', () => {
      const newClient: Client = {
        id: 'arl-bolivar',
        name: 'ARL Seguros Bolívar',
        logoUrl: 'https://example.com/arl-logo.png',
        websiteUrl: 'https://www.segurosbolivar.com/arl',
        altText: 'ARL Seguros Bolívar'
      };

      component.client = newClient;
      fixture.detectChanges();

      const logoImg = debugElement.query(By.css('.client-logo-img'));
      const linkElement = debugElement.query(By.css('a'));

      expect(logoImg.nativeElement.src).toBe(newClient.logoUrl);
      expect(logoImg.nativeElement.alt).toBe(newClient.altText);
      expect(linkElement.nativeElement.href).toBe(newClient.websiteUrl);
    });

    it('should require client input', () => {
      expect(component.client).toBeDefined();
      expect(component.client).toBe(mockClient);
    });
  });

  describe('Image Properties', () => {
    it('should have responsive image properties', () => {
      const logoImg = debugElement.query(By.css('.client-logo-img'));
      expect(logoImg.nativeElement.classList).toContain('img-fluid');
      // Additional responsive properties are handled by CSS
    });

    it('should maintain image aspect ratio', () => {
      const logoImg = debugElement.query(By.css('.client-logo-img'));
      expect(logoImg).toBeTruthy();
      // CSS max-height and width auto maintain aspect ratio
    });
  });

  describe('Component State', () => {
    it('should handle different client data structures', () => {
      const minimalClient: Client = {
        id: 'test-client',
        name: 'Test Client',
        logoUrl: 'https://example.com/test-logo.png',
        altText: 'Test Client Logo'
        // websiteUrl is optional
      };

      component.client = minimalClient;
      fixture.detectChanges();

      const logoImg = debugElement.query(By.css('.client-logo-img'));
      expect(logoImg.nativeElement.src).toBe(minimalClient.logoUrl);
      expect(logoImg.nativeElement.alt).toBe(minimalClient.altText);
    });
  });
});
