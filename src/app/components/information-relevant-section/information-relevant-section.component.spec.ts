import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InformationRelevantSectionComponent } from './information-relevant-section.component';
import { InformationCardsService } from '../../shared/services/information-cards.service';
import { InformationCard } from '../../shared/models/information-card';
import { of } from 'rxjs';

describe('InformationRelevantSectionComponent', () => {
  let component: InformationRelevantSectionComponent;
  let fixture: ComponentFixture<InformationRelevantSectionComponent>;
  let mockInformationCardsService: jest.Mocked<InformationCardsService>;

  const mockInformationCards: InformationCard[] = [
    {
      id: 'derechos-usuario',
      path: 'derechos',
      title: 'Derechos del usuario en Salud Bolívar IPS',
      cardImage: 'https://example.com/image1.jpg',
      description: 'Conozca sus derechos como usuario de nuestros servicios de salud.',
      routerLink: '/guia-para-el-usuario/derechos'
    },
    {
      id: 'deberes-usuario',
      path: 'deberes',
      title: 'Deberes del usuario en Salud Bolívar IPS',
      cardImage: 'https://example.com/image2.jpg',
      description: 'Conozca sus responsabilidades como usuario de nuestros servicios.',
      routerLink: '/guia-para-el-usuario/deberes'
    }
  ];

  beforeEach(async () => {
    mockInformationCardsService = {
      getAllInformationCards: jest.fn(),
      getInformationCardByPath: jest.fn(),
      getInformationCardById: jest.fn()
    } as jest.Mocked<InformationCardsService>;

    mockInformationCardsService.getAllInformationCards.mockReturnValue(of(mockInformationCards));

    await TestBed.configureTestingModule({
      imports: [InformationRelevantSectionComponent, RouterTestingModule],
      providers: [
        { provide: InformationCardsService, useValue: mockInformationCardsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationRelevantSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load information cards from service on init', () => {
    expect(mockInformationCardsService.getAllInformationCards).toHaveBeenCalled();
    expect(component.informationCards).toBeDefined();
    expect(component.informationCards.length).toBe(2);
  });

  it('should render information section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check information section exists
    const informationSection = compiled.querySelector('.information-section');
    expect(informationSection).toBeTruthy();
    
    // Check section title
    const sectionTitle = compiled.querySelector('.section-title');
    expect(sectionTitle).toBeTruthy();
    expect(sectionTitle?.textContent?.trim()).toBe('Información relevante');
    
    // Check section subtitle
    const sectionSubtitle = compiled.querySelector('.section-subtitle');
    expect(sectionSubtitle).toBeTruthy();
    expect(sectionSubtitle?.textContent?.trim()).toContain('Todos los usuarios deben tener en cuenta esta información');
  });

  it('should render information cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that information cards are rendered
    const informationCards = compiled.querySelectorAll('.information-card');
    expect(informationCards.length).toBe(2);
    
    // Check card structure
    informationCards.forEach((card, index) => {
      // Check card overlay exists
      const cardOverlay = card.querySelector('.card-overlay');
      expect(cardOverlay).toBeTruthy();
      
      // Check card content exists
      const cardContent = card.querySelector('.card-content');
      expect(cardContent).toBeTruthy();
      
      // Check card title exists
      const cardTitle = card.querySelector('.card-title');
      expect(cardTitle).toBeTruthy();
      expect(cardTitle?.textContent?.trim()).toBe(component.informationCards[index].title);
      
      // Check data attribute
      expect(card.getAttribute('data-card-id')).toBe(component.informationCards[index].id);
    });
  });

  it('should render information cards as navigable links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that information cards are anchor elements with routerLink
    const informationCards = compiled.querySelectorAll('a.information-card');
    expect(informationCards.length).toBe(2);
    
    // Check each card has correct routerLink
    informationCards.forEach((card, index) => {
      // Verify it's an anchor element
      expect(card.tagName.toLowerCase()).toBe('a');

      // Verify routerLink attribute matches expected value
      const expectedRouterLink = component.informationCards[index].routerLink;
      expect(card.getAttribute('ng-reflect-router-link')).toBe(expectedRouterLink);

      // Verify card has information-card class
      expect(card.classList.contains('information-card')).toBeTruthy();
      
      // Verify data attribute is preserved
      expect(card.getAttribute('data-card-id')).toBe(component.informationCards[index].id);
    });
  });

  it('should have proper navigation accessibility', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that all information cards are anchor elements (navigable)
    const informationCards = compiled.querySelectorAll('a.information-card');
    expect(informationCards.length).toBe(2);
    
    informationCards.forEach((card) => {
      // Should be an anchor tag
      expect(card.tagName.toLowerCase()).toBe('a');
      
      // Should have the information-card class for styling
      expect(card.classList.contains('information-card')).toBeTruthy();
    });
  });

  it('should have proper semantic structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check semantic section element
    const section = compiled.querySelector('section.information-section');
    expect(section).toBeTruthy();
    
    // Check heading hierarchy
    const mainTitle = compiled.querySelector('h2.section-title');
    expect(mainTitle).toBeTruthy();
    
    const cardTitles = compiled.querySelectorAll('h3.card-title');
    expect(cardTitles.length).toBe(2);
  });

  it('should use Bootstrap grid classes for responsive layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check container structure
    const container = compiled.querySelector('.information-section .container');
    expect(container).toBeTruthy();
    
    // Check row structure
    const rows = compiled.querySelectorAll('.information-section .row');
    expect(rows.length).toBe(2); // Title row + cards row
    
    // Check card columns in information section
    const cardColumns = compiled.querySelectorAll('.information-section .col-lg-4.col-md-6');
    expect(cardColumns.length).toBe(2);
  });

  it('should apply background images to cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const informationCards = compiled.querySelectorAll('.information-card') as NodeListOf<HTMLElement>;
    
    informationCards.forEach((card, index) => {
      const style = card.getAttribute('style');
      expect(style).toContain(component.informationCards[index].cardImage);
    });
  });
});
