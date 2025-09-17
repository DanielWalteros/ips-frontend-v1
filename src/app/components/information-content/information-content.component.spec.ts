import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationContentComponent } from './information-content.component';
import { InformationCard } from '../../shared/models/';

describe('InformationContentComponent', () => {
  let component: InformationContentComponent;
  let fixture: ComponentFixture<InformationContentComponent>;

  const mockInformationCard: InformationCard = {
    id: 'test-card',
    path: 'test',
    title: 'Test Information Card',
    breadcrumbTitle: 'Test Card',
    cardImage: 'https://example.com/card.jpg',
    description: 'Test description',
    routerLink: '/test',
    backgroundImage: 'https://example.com/background.jpg',
    contentItems: [
      { id: 'item-1', number: 1, text: 'First item' },
      { id: 'item-2', number: 2, text: 'Second item' },
      { id: 'item-3', number: 3, text: 'Third item' },
      { id: 'item-4', number: 4, text: 'Fourth item' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content section when informationCard has contentItems', () => {
    component.informationCard = mockInformationCard;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const contentSection = compiled.querySelector('.main-content');
    
    expect(contentSection).toBeTruthy();
  });

  it('should not render content section when informationCard has no contentItems', () => {
    const cardWithoutContent = { ...mockInformationCard, contentItems: undefined };
    component.informationCard = cardWithoutContent;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const contentSection = compiled.querySelector('.main-content');
    
    expect(contentSection).toBeFalsy();
  });

  it('should not render content section when contentItems array is empty', () => {
    const cardWithEmptyContent = { ...mockInformationCard, contentItems: [] };
    component.informationCard = cardWithEmptyContent;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const contentSection = compiled.querySelector('.main-content');
    
    expect(contentSection).toBeFalsy();
  });

  it('should have trackByContentItem method', () => {
    expect(component.trackByContentItem).toBeDefined();
    expect(typeof component.trackByContentItem).toBe('function');

    const mockItem = { id: 'test-id', number: 1, text: 'Test text' };
    const result = component.trackByContentItem(0, mockItem);
    expect(result).toBe('test-id');
  });

  it('should have getLeftContentItems method', () => {
    expect(component.getLeftContentItems).toBeDefined();
    expect(typeof component.getLeftContentItems).toBe('function');
  });

  it('should have getRightContentItems method', () => {
    expect(component.getRightContentItems).toBeDefined();
    expect(typeof component.getRightContentItems).toBe('function');
  });

  it('should split content items correctly between left and right columns', () => {
    component.informationCard = mockInformationCard;
    
    const leftItems = component.getLeftContentItems();
    const rightItems = component.getRightContentItems();
    
    // With 4 items, left should have 2, right should have 2
    expect(leftItems.length).toBe(2);
    expect(rightItems.length).toBe(2);
    
    expect(leftItems[0].number).toBe(1);
    expect(leftItems[1].number).toBe(2);
    expect(rightItems[0].number).toBe(3);
    expect(rightItems[1].number).toBe(4);
  });

  it('should handle odd number of content items correctly', () => {
    const cardWithOddItems = {
      ...mockInformationCard,
      contentItems: [
        { id: 'item-1', number: 1, text: 'First item' },
        { id: 'item-2', number: 2, text: 'Second item' },
        { id: 'item-3', number: 3, text: 'Third item' }
      ]
    };
    component.informationCard = cardWithOddItems;
    
    const leftItems = component.getLeftContentItems();
    const rightItems = component.getRightContentItems();
    
    // With 3 items, left should have 2, right should have 1
    expect(leftItems.length).toBe(2);
    expect(rightItems.length).toBe(1);
    
    expect(leftItems[0].number).toBe(1);
    expect(leftItems[1].number).toBe(2);
    expect(rightItems[0].number).toBe(3);
  });

  it('should return empty arrays when no content items exist', () => {
    const cardWithoutItems = { ...mockInformationCard, contentItems: undefined };
    component.informationCard = cardWithoutItems;
    
    const leftItems = component.getLeftContentItems();
    const rightItems = component.getRightContentItems();
    
    expect(leftItems).toEqual([]);
    expect(rightItems).toEqual([]);
  });

  it('should render three column layout with content items', () => {
    component.informationCard = mockInformationCard;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check left column
    const leftColumn = compiled.querySelector('.left-content');
    expect(leftColumn).toBeTruthy();
    
    // Check center image column
    const centerColumn = compiled.querySelector('.content-image');
    expect(centerColumn).toBeTruthy();
    
    // Check right column
    const rightColumn = compiled.querySelector('.right-content');
    expect(rightColumn).toBeTruthy();
    
    // Check that image is rendered correctly
    const contentImage = compiled.querySelector('.content-image img') as HTMLImageElement;
    expect(contentImage).toBeTruthy();
    expect(contentImage.src).toContain('background.jpg');
    expect(contentImage.alt).toBe(mockInformationCard.title);
  });

  it('should render content items with correct numbers and text', () => {
    component.informationCard = mockInformationCard;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that content items are rendered
    const contentItems = compiled.querySelectorAll('.content-item');
    expect(contentItems.length).toBe(4);
    
    // Check first item
    const firstNumber = contentItems[0].querySelector('.item-number');
    const firstText = contentItems[0].querySelector('.item-text');
    expect(firstNumber?.textContent?.trim()).toBe('1');
    expect(firstText?.textContent?.trim()).toBe('First item');
  });
});
