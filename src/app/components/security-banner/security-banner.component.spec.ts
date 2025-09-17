import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SecurityBannerComponent } from './security-banner.component';

describe('SecurityBannerComponent', () => {
  let component: SecurityBannerComponent;
  let fixture: ComponentFixture<SecurityBannerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityBannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityBannerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Rendering', () => {
    it('should display security banner section', () => {
      const securityBanner = debugElement.query(By.css('.security-banner'));
      expect(securityBanner).toBeTruthy();
    });

    it('should display security title', () => {
      const securityTitle = debugElement.query(By.css('.security-title'));
      expect(securityTitle).toBeTruthy();
      expect(securityTitle.nativeElement.textContent).toContain('información está segura');
    });

    it('should display security subtitle', () => {
      const securitySubtitle = debugElement.query(By.css('.security-subtitle'));
      expect(securitySubtitle).toBeTruthy();
      expect(securitySubtitle.nativeElement.textContent).toContain('Política de Tratamiento');
    });

    it('should have security button', () => {
      const securityBtn = debugElement.query(By.css('.security-btn'));
      expect(securityBtn).toBeTruthy();
      expect(securityBtn.nativeElement.textContent).toContain('Conózcala aquí');
    });
  });

  describe('External Links', () => {
    it('should have correct policy link', () => {
      const securityBtn = debugElement.query(By.css('.security-btn'));
      expect(securityBtn.nativeElement.href).toContain('Politica-tratamiento-datos-Personales');
      expect(securityBtn.nativeElement.target).toBe('_blank');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const mainHeading = debugElement.query(By.css('.security-title'));
      expect(mainHeading.nativeElement.tagName).toBe('H1');
    });

    it('should have descriptive button text', () => {
      const securityBtn = debugElement.query(By.css('.security-btn'));
      const buttonText = securityBtn.nativeElement.textContent.trim();
      expect(buttonText.length).toBeGreaterThan(0);
      expect(buttonText).toContain('Conózcala');
    });
  });

  describe('Styling and Layout', () => {
    it('should have proper section styling', () => {
      const securityBanner = debugElement.query(By.css('.security-banner'));
      expect(securityBanner).toBeTruthy();
    });

    it('should have overlay container', () => {
      const securityOverlay = debugElement.query(By.css('.security-overlay'));
      expect(securityOverlay).toBeTruthy();
    });

    it('should have content container', () => {
      const securityContent = debugElement.query(By.css('.security-content'));
      expect(securityContent).toBeTruthy();
    });
  });
});
