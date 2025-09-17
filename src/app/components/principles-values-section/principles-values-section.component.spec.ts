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

    const valuesContainers = compiled.querySelectorAll('.values-container');
    expect(valuesContainers.length).toBe(2); // Two columns
  });

  it('should display principles title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const principlesTitle = compiled.querySelector('.principles-title');
    expect(principlesTitle).toBeTruthy();
    expect(principlesTitle?.textContent?.trim()).toBe('Principios y valores');
  });

  it('should display all five corporate values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const valueItems = compiled.querySelectorAll('.value-item');
    expect(valueItems.length).toBe(5); // Respeto, Honestidad, Entusiasmo, Equidad, Disciplina

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
      expect(subtitle.textContent).toContain('Enriquecemos la Vida con integridad porque:');
    });

    const valueDescriptions = compiled.querySelectorAll('.value-description');
    expect(valueDescriptions.length).toBe(5);

    // Check that each description has list items
    valueDescriptions.forEach(description => {
      const listItems = description.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  it('should display corporate values image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const valuesImage = compiled.querySelector('.values-image');
    expect(valuesImage).toBeTruthy();
    expect(valuesImage?.getAttribute('alt')).toBe('Valores corporativos');
    expect(valuesImage?.getAttribute('src')).toContain('mesa-de-trabajo');
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const leftColumn = compiled.querySelector('.col-lg-6');
    expect(leftColumn).toBeTruthy();

    const rightColumns = compiled.querySelectorAll('.col-lg-6');
    expect(rightColumns.length).toBe(2); // Two responsive columns
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const principlesSection = compiled.querySelector('.principles-values-section');
    expect(principlesSection?.classList.contains('py-5')).toBeTruthy();

    const principlesTitle = compiled.querySelector('.principles-title');
    expect(principlesTitle?.classList.contains('text-center')).toBeTruthy();
    expect(principlesTitle?.classList.contains('mb-5')).toBeTruthy();

    const valuesImage = compiled.querySelector('.values-image');
    expect(valuesImage?.classList.contains('img-fluid')).toBeTruthy();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for proper heading hierarchy
    const h2 = compiled.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2?.textContent?.trim()).toBe('Principios y valores');
    
    const h3Elements = compiled.querySelectorAll('h3');
    expect(h3Elements.length).toBe(5); // Five value titles
    
    // Check for semantic section structure
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
    
    // Check for proper list structure
    const unorderedLists = compiled.querySelectorAll('ul.value-description');
    expect(unorderedLists.length).toBe(5);
    
    // Check image alt text
    const image = compiled.querySelector('img');
    expect(image?.getAttribute('alt')).toBeTruthy();
  });

  it('should have meaningful content for each value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check specific content for some values
    const respectSection = Array.from(compiled.querySelectorAll('.value-item'))
      .find(item => item.querySelector('.value-title')?.textContent?.includes('Respeto'));
    expect(respectSection).toBeTruthy();
    
    const respectDescription = respectSection?.querySelector('.value-description');
    expect(respectDescription?.textContent).toContain('dignidad humana');
    
    const honestySection = Array.from(compiled.querySelectorAll('.value-item'))
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
