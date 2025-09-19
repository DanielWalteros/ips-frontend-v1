import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { PrinciplesValuesSectionComponent } from './principles-values-section.component';

describe('PrinciplesValuesSectionComponent', () => {
  let component: PrinciplesValuesSectionComponent;
  let fixture: ComponentFixture<PrinciplesValuesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PrinciplesValuesSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrinciplesValuesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render principles and values section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const principlesSection = compiled.querySelector('.principles-values-section');
    expect(principlesSection).toBeTruthy();

    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();

    const valueCards = compiled.querySelectorAll('.value-card');
    expect(valueCards.length).toBe(5); // Five value cards
  });

  it('should display value cards without main title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // No main title in the new design
    const principlesTitle = compiled.querySelector('.principles-title');
    expect(principlesTitle).toBeFalsy();
    
    // Should have 5 value cards instead
    const valueCards = compiled.querySelectorAll('.value-card');
    expect(valueCards.length).toBe(5);
  });

  it('should display all five corporate values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const valueCards = compiled.querySelectorAll('.value-card');
    expect(valueCards.length).toBe(5); // Respeto, Honestidad, Entusiasmo, Equidad, Disciplina

    // Check for specific value titles
    const valueTitles = compiled.querySelectorAll('.value-title');
    const titleTexts = Array.from(valueTitles).map(title => title.textContent?.trim());
    
    expect(titleTexts).toContain('Respeto');
    expect(titleTexts).toContain('Honestidad');
    expect(titleTexts).toContain('Entusiasmo, Alegría y Buen Humor');
    expect(titleTexts).toContain('Equidad');
    expect(titleTexts).toContain('Disciplina');
  });

  it('should display value descriptions with proper structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const valueSubtitles = compiled.querySelectorAll('.value-subtitle');
    expect(valueSubtitles.length).toBe(5);

    // Check that each subtitle contains the key phrase
    valueSubtitles.forEach(subtitle => {
      expect(subtitle.textContent).toContain('Enriquecemos la Vida con Integridad porque');
    });

    const valueDescriptions = compiled.querySelectorAll('.value-description');
    expect(valueDescriptions.length).toBe(5);

    // Check that each description has list items
    valueDescriptions.forEach(description => {
      const listItems = description.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  it('should display value cards with correct classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check specific value card classes
    const respectoCard = compiled.querySelector('.value-card.respeto');
    expect(respectoCard).toBeTruthy();
    
    const equidadCard = compiled.querySelector('.value-card.equidad');
    expect(equidadCard).toBeTruthy();
    
    const honestidadCard = compiled.querySelector('.value-card.honestidad');
    expect(honestidadCard).toBeTruthy();
    
    const disciplinaCard = compiled.querySelector('.value-card.disciplina');
    expect(disciplinaCard).toBeTruthy();
    
    const entusiastmoCard = compiled.querySelector('.value-card.entusiasmo');
    expect(entusiastmoCard).toBeTruthy();
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lg6Columns = compiled.querySelectorAll('.col-lg-6');
    expect(lg6Columns.length).toBe(2); // Two lg-6 columns in first row
    
    const lg4Columns = compiled.querySelectorAll('.col-lg-4');
    expect(lg4Columns.length).toBe(3); // Three lg-4 columns in second row
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const principlesSection = compiled.querySelector('.principles-values-section');
    expect(principlesSection?.classList.contains('py-5')).toBeTruthy();

    // Check value cards have proper structure
    const valueCards = compiled.querySelectorAll('.value-card');
    expect(valueCards.length).toBe(5);
    
    valueCards.forEach(card => {
      expect(card.classList.contains('value-card')).toBeTruthy();
    });
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for proper heading hierarchy (no h2 in new design)
    const h3Elements = compiled.querySelectorAll('h3');
    expect(h3Elements.length).toBe(5); // Five value titles

    // Check for semantic section structure
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();

    // Check for descriptive content
    const lists = compiled.querySelectorAll('.value-description');
    expect(lists.length).toBe(5); // Five value descriptions
    
    // Check each list has proper list items
    lists.forEach(list => {
      const listItems = list.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  it('should have meaningful content for each value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check specific content for some values
    const respectSection = Array.from(compiled.querySelectorAll('.value-card'))
      .find(item => item.querySelector('.value-title')?.textContent?.includes('Respeto'));
    expect(respectSection).toBeTruthy();
    
    const respectDescription = respectSection?.querySelector('.value-description');
    expect(respectDescription?.textContent).toContain('dignidad humana');
    
    const honestySection = Array.from(compiled.querySelectorAll('.value-card'))
      .find(item => item.querySelector('.value-title')?.textContent?.includes('Honestidad'));
    expect(honestySection).toBeTruthy();
    
    const honestyDescription = honestySection?.querySelector('.value-description');
    expect(honestyDescription?.textContent).toContain('transparentes');
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });
});
