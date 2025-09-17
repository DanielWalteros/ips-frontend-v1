import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HeroSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.about-hero');
    expect(heroSection).toBeTruthy();

    const heroBackground = compiled.querySelector('.hero-background');
    expect(heroBackground).toBeTruthy();

    const heroOverlay = compiled.querySelector('.hero-overlay');
    expect(heroOverlay).toBeTruthy();

    const heroContent = compiled.querySelector('.hero-content');
    expect(heroContent).toBeTruthy();
  });

  it('should display hero title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroTitle = compiled.querySelector('.hero-title');
    expect(heroTitle).toBeTruthy();
    expect(heroTitle?.textContent?.trim()).toBe('Todo sobre nosotros y lo que queremos lograr');
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const containerRow = compiled.querySelector('.row.align-items-center.min-vh-75');
    expect(containerRow).toBeTruthy();

    const leftColumn = compiled.querySelector('.col-lg-6');
    expect(leftColumn).toBeTruthy();

    const rightColumn = compiled.querySelectorAll('.col-lg-6')[1];
    expect(rightColumn).toBeTruthy();
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.about-hero');
    expect(heroSection?.classList.contains('text-white')).toBeTruthy();

    const heroTitle = compiled.querySelector('.hero-title');
    expect(heroTitle?.classList.contains('display-3')).toBeTruthy();
    expect(heroTitle?.classList.contains('fw-bold')).toBeTruthy();
    expect(heroTitle?.classList.contains('mb-4')).toBeTruthy();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for proper heading hierarchy
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent?.trim()).toBe('Todo sobre nosotros y lo que queremos lograr');
    
    // Check for semantic section structure
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });
});
