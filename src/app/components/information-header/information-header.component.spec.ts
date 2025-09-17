import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationHeaderComponent } from './information-header.component';
import { InformationCard } from '../../shared/models/';

describe('InformationHeaderComponent', () => {
  let component: InformationHeaderComponent;
  let fixture: ComponentFixture<InformationHeaderComponent>;

  const mockInformationCard: InformationCard = {
    id: 'test-card',
    path: 'test',
    title: 'Test Information Card',
    breadcrumbTitle: 'Test Card',
    cardImage: 'https://example.com/card.jpg',
    description: 'Test description',
    routerLink: '/test',
    detailTitle: 'Detailed Test Title',
    detailDescription: 'Detailed test description',
    detailContent: 'Additional test content',
    backgroundImage: 'https://example.com/background.jpg',
    contentItems: [
      { id: 'item-1', number: 1, text: 'First item' },
      { id: 'item-2', number: 2, text: 'Second item' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header when informationCard is provided', () => {
    component.informationCard = mockInformationCard;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headerSection = compiled.querySelector('.information-header');
    
    expect(headerSection).toBeTruthy();
  });

  it('should display correct title from detailTitle or fallback to title', () => {
    component.informationCard = mockInformationCard;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.header-title');
    
    expect(titleElement?.textContent?.trim()).toBe('Detailed Test Title');
  });

  it('should fallback to title when detailTitle is not available', () => {
    const cardWithoutDetailTitle = { ...mockInformationCard, detailTitle: undefined };
    component.informationCard = cardWithoutDetailTitle;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.header-title');
    
    expect(titleElement?.textContent?.trim()).toBe('Test Information Card');
  });

  it('should display detail description when available', () => {
    component.informationCard = mockInformationCard;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const descriptionElement = compiled.querySelector('.header-intro p');
    
    expect(descriptionElement?.textContent?.trim()).toBe('Detailed test description');
  });

  it('should have shouldUseBackgroundInHeader method', () => {
    expect(component.shouldUseBackgroundInHeader).toBeDefined();
    expect(typeof component.shouldUseBackgroundInHeader).toBe('function');
  });

  it('should return true for shouldUseBackgroundInHeader when backgroundImage exists but no contentItems', () => {
    const cardWithBackgroundNoContent = { 
      ...mockInformationCard, 
      contentItems: undefined 
    };
    component.informationCard = cardWithBackgroundNoContent;
    
    const result = component.shouldUseBackgroundInHeader();
    expect(result).toBe(true);
  });

  it('should return false for shouldUseBackgroundInHeader when contentItems exist', () => {
    component.informationCard = mockInformationCard;
    
    const result = component.shouldUseBackgroundInHeader();
    expect(result).toBe(false);
  });

  it('should apply with-background class when shouldUseBackgroundInHeader returns true', () => {
    const cardWithBackgroundNoContent = { 
      ...mockInformationCard, 
      contentItems: undefined 
    };
    component.informationCard = cardWithBackgroundNoContent;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headerSection = compiled.querySelector('.information-header');
    
    expect(headerSection?.classList.contains('with-background')).toBe(true);
  });

  it('should apply background image style when shouldUseBackgroundInHeader returns true', () => {
    const cardWithBackgroundNoContent = { 
      ...mockInformationCard, 
      contentItems: undefined 
    };
    component.informationCard = cardWithBackgroundNoContent;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headerSection = compiled.querySelector('.information-header') as HTMLElement;
    
    expect(headerSection?.style.backgroundImage).toContain('background.jpg');
  });
});
