import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { AboutUsSectionComponent } from './about-us-section.component';

describe('AboutUsSectionComponent', () => {
  let component: AboutUsSectionComponent;
  let fixture: ComponentFixture<AboutUsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AboutUsSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render about us section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutUsSection = compiled.querySelector('.about-us-section');
    expect(aboutUsSection).toBeTruthy();

    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();

    const row = compiled.querySelector('.row.align-items-center');
    expect(row).toBeTruthy();
  });

  it('should display about title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutTitle = compiled.querySelector('.about-title');
    expect(aboutTitle).toBeTruthy();
    expect(aboutTitle?.textContent?.trim()).toBe('Somos la IPS del grupo empresarial Bolívar');
  });

  it('should display about description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutDescription = compiled.querySelector('.about-description');
    expect(aboutDescription).toBeTruthy();
    expect(aboutDescription?.textContent).toContain('Estamos comprometidos con una atención de salud oportuna');
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const leftColumn = compiled.querySelector('.col-lg-5');
    expect(leftColumn).toBeTruthy();

    const rightColumn = compiled.querySelector('.col-lg-7');
    expect(rightColumn).toBeTruthy();
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutUsSection = compiled.querySelector('.about-us-section');
    expect(aboutUsSection?.classList.contains('py-5')).toBeTruthy();

    const aboutTitle = compiled.querySelector('.about-title');
    expect(aboutTitle?.classList.contains('text-dark')).toBeTruthy();
    expect(aboutTitle?.classList.contains('mb-4')).toBeTruthy();

    const aboutDescription = compiled.querySelector('.about-description');
    expect(aboutDescription?.classList.contains('text-muted')).toBeTruthy();
    expect(aboutDescription?.classList.contains('mb-0')).toBeTruthy();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for proper heading hierarchy
    const h2 = compiled.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2?.textContent?.trim()).toBe('Somos la IPS del grupo empresarial Bolívar');
    
    // Check for semantic section structure
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
    
    // Check for descriptive content
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toContain('atención de salud');
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });
});
