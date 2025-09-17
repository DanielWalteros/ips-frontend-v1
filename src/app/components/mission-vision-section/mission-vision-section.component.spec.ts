import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MissionVisionSectionComponent } from './mission-vision-section.component';

describe('MissionVisionSectionComponent', () => {
  let component: MissionVisionSectionComponent;
  let fixture: ComponentFixture<MissionVisionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MissionVisionSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MissionVisionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mission and vision section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const missionVisionSection = compiled.querySelector('.mission-vision-section');
    expect(missionVisionSection).toBeTruthy();

    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();

    const row = compiled.querySelector('.row');
    expect(row).toBeTruthy();
  });

  it('should display section title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionTitle = compiled.querySelector('.section-title');
    expect(sectionTitle).toBeTruthy();
    expect(sectionTitle?.textContent?.trim()).toBe('Salud Bolívar IPS');
  });

  it('should display mission and vision cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const missionVisionCards = compiled.querySelectorAll('.mission-vision-card');
    expect(missionVisionCards.length).toBe(2); // Mission and Vision cards

    // Check for mission card
    const cardTitles = compiled.querySelectorAll('.card-title');
    const titleTexts = Array.from(cardTitles).map(title => title.textContent?.trim());
    
    expect(titleTexts).toContain('Nuestra Misión');
    expect(titleTexts).toContain('Nuestra Visión');
  });

  it('should display mission content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTexts = compiled.querySelectorAll('.card-text');
    
    const missionText = Array.from(cardTexts).find(text => 
      text.textContent?.includes('Enriquecemos la vida de nuestros usuarios')
    );
    expect(missionText).toBeTruthy();
    expect(missionText?.textContent).toContain('integridad');
    expect(missionText?.textContent).toContain('servicios de bienestar y salud');
  });

  it('should display vision content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTexts = compiled.querySelectorAll('.card-text');
    
    const visionText = Array.from(cardTexts).find(text => 
      text.textContent?.includes('Para el 2026')
    );
    expect(visionText).toBeTruthy();
    expect(visionText?.textContent).toContain('BOLÍVAR SALUD IPS S.A.S.');
    expect(visionText?.textContent).toContain('líder en la prestación');
    expect(visionText?.textContent).toContain('experiencia memorable');
  });

  it('should display mission and vision icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const iconContainers = compiled.querySelectorAll('.icon-container');
    expect(iconContainers.length).toBe(2); // Mission and Vision icons

    const images = compiled.querySelectorAll('.icon-container img');
    expect(images.length).toBe(2);
    
    // Check for mission icon
    const missionIcon = Array.from(images).find(img => 
      img.getAttribute('src')?.includes('goal_')
    );
    expect(missionIcon).toBeTruthy();
    
    // Check for vision icon
    const visionIcon = Array.from(images).find(img => 
      img.getAttribute('src')?.includes('care-of-heart')
    );
    expect(visionIcon).toBeTruthy();
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardContainer = compiled.querySelector('.row.g-4');
    expect(cardContainer).toBeTruthy();

    const columnElements = compiled.querySelectorAll('.col-lg-6');
    expect(columnElements.length).toBe(2); // Two responsive columns for mission and vision
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const missionVisionSection = compiled.querySelector('.mission-vision-section');
    expect(missionVisionSection?.classList.contains('py-5')).toBeTruthy();

    const sectionTitle = compiled.querySelector('.section-title');
    expect(sectionTitle?.classList.contains('text-center')).toBeTruthy();
    expect(sectionTitle?.classList.contains('mb-5')).toBeTruthy();

    const cards = compiled.querySelectorAll('.mission-vision-card');
    cards.forEach(card => {
      expect(card.classList.contains('h-100')).toBeTruthy();
      expect(card.classList.contains('p-4')).toBeTruthy();
    });
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for proper heading hierarchy
    const h2 = compiled.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2?.textContent?.trim()).toBe('Salud Bolívar IPS');
    
    const h3Elements = compiled.querySelectorAll('h3');
    expect(h3Elements.length).toBe(2); // Mission and Vision titles
    
    // Check for semantic section structure
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
    
    // Check for descriptive content
    const paragraphs = compiled.querySelectorAll('p.card-text');
    expect(paragraphs.length).toBe(2);
    paragraphs.forEach(paragraph => {
      expect(paragraph.textContent?.length).toBeGreaterThan(50);
    });
  });

  it('should have meaningful and detailed content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check mission content quality
    const cardTexts = compiled.querySelectorAll('.card-text');
    expect(cardTexts.length).toBe(2);
    
    cardTexts.forEach(text => {
      expect(text.textContent?.length).toBeGreaterThan(100); // Substantial content
    });
    
    // Check for specific corporate terms
    const allText = compiled.textContent || '';
    expect(allText).toContain('usuarios');
    expect(allText).toContain('integridad');
    expect(allText).toContain('calidad de vida');
    expect(allText).toContain('atención segura');
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });
});
