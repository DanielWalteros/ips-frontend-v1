import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { InformationDetailComponent } from './information-detail.component';
import { InformationCardsService } from '../../shared/services/information-cards.service';
import { InformationCard } from '../../shared/models/information-card';

describe('InformationDetailComponent', () => {
  let component: InformationDetailComponent;
  let fixture: ComponentFixture<InformationDetailComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let mockInformationCardsService: jest.Mocked<InformationCardsService>;

  const mockInformationCard: InformationCard = {
    id: 'derechos-usuario',
    path: 'derechos',
    title: 'Derechos del usuario en Salud Bolívar IPS',
    breadcrumbTitle: 'Derechos del usuario',
    cardImage: 'https://example.com/image.jpg',
    description: 'Conozca sus derechos como usuario de nuestros servicios de salud.',
    routerLink: '/guia-para-el-usuario/derechos',
    detailTitle: 'Derechos del paciente en Salud Bolívar IPS',
    detailDescription: 'Aquí encontrará todo lo que debe tener en cuenta para hacer un buen uso de su IPS.',
    backgroundImage: 'https://example.com/background.jpg',
    contentItems: [
      { id: 'item-1', number: 1, text: 'Primer item de contenido de prueba.' },
      { id: 'item-2', number: 2, text: 'Segundo item de contenido de prueba.' }
    ]
  };

  beforeEach(async () => {
    mockInformationCardsService = {
      getAllInformationCards: jest.fn(),
      getInformationCardByPath: jest.fn(),
      getInformationCardById: jest.fn()
    } as jest.Mocked<InformationCardsService>;

    await TestBed.configureTestingModule({
      imports: [InformationDetailComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: InformationCardsService, useValue: mockInformationCardsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    
    // Mock the route params
    Object.defineProperty(activatedRoute, 'snapshot', {
      writable: true,
      value: {
        params: { path: 'derechos' }
      }
    });
    
    jest.spyOn(router, 'navigate').mockImplementation();
  });

  it('should create', () => {
    mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load information card successfully', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      
      component.ngOnInit();
      
      expect(mockInformationCardsService.getInformationCardByPath).toHaveBeenCalledWith('derechos');
      expect(component.informationCard).toEqual(mockInformationCard);
      expect(component.isLoading).toBe(false);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should redirect when information card is not found', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(undefined));
      
      component.ngOnInit();
      
      expect(mockInformationCardsService.getInformationCardByPath).toHaveBeenCalledWith('derechos');
      expect(component.informationCard).toBeUndefined();
      expect(component.isLoading).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/guia-para-el-usuario']);
    });

    it('should redirect on service error', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(throwError(() => new Error('Service error')));
      
      component.ngOnInit();
      
      expect(mockInformationCardsService.getInformationCardByPath).toHaveBeenCalledWith('derechos');
      expect(component.isLoading).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/guia-para-el-usuario']);
    });

    it('should use path from route params', () => {
      // Update the route params for this test
      Object.defineProperty(activatedRoute, 'snapshot', {
        writable: true,
        value: {
          params: { path: 'deberes' }
        }
      });
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      
      component.ngOnInit();
      
      expect(mockInformationCardsService.getInformationCardByPath).toHaveBeenCalledWith('deberes');
    });
  });

  describe('Template Rendering', () => {
    it('should show loading state initially', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      
      // Don't call detectChanges to keep isLoading = true
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Initial state should show loading
      expect(component.isLoading).toBe(true);
      
      fixture.detectChanges();
      
      // After service call, loading should be false
      expect(component.isLoading).toBe(false);
    });

    it('should render information card details when loaded', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check information header section
      const headerTitle = compiled.querySelector('.header-title');
      expect(headerTitle?.textContent?.trim()).toBe(mockInformationCard.detailTitle);
      
      // Check header description
      const headerIntro = compiled.querySelectorAll('.header-intro p');
      expect(headerIntro[0]?.textContent?.trim()).toBe(mockInformationCard.detailDescription);
      
      // Check breadcrumb
      const breadcrumb = compiled.querySelector('.breadcrumb-item.active');
      expect(breadcrumb?.textContent?.trim()).toBe(mockInformationCard.breadcrumbTitle);
    });

    it('should render information header section', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const headerSection = compiled.querySelector('.information-header');
      expect(headerSection).toBeTruthy();
      
      const headerContent = compiled.querySelector('.header-content');
      expect(headerContent).toBeTruthy();
    });

    it('should render information header content correctly', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check header title
      const headerTitle = compiled.querySelector('.header-title');
      expect(headerTitle?.textContent?.trim()).toBe(mockInformationCard.detailTitle);
      
      // Check header description
      const headerIntro = compiled.querySelectorAll('.header-intro p');
      expect(headerIntro[0]?.textContent?.trim()).toBe(mockInformationCard.detailDescription);
    });

    it('should use fallback title when detailTitle is not available', () => {
      const cardWithoutDetailTitle = { 
        ...mockInformationCard, 
        detailTitle: undefined 
      };
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(cardWithoutDetailTitle));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const headerTitle = compiled.querySelector('.header-title');
      expect(headerTitle?.textContent?.trim()).toBe(mockInformationCard.title);
    });

    it('should render breadcrumb component', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const breadcrumbComponent = compiled.querySelector('app-breadcrumb');
      
      expect(breadcrumbComponent).toBeTruthy();
      expect(component.breadcrumbConfig).toBeTruthy();
      expect(component.breadcrumbConfig?.items.length).toBe(2);
    });

    it('should render breadcrumb with correct titles', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check breadcrumb structure
      const breadcrumb = compiled.querySelector('.breadcrumb');
      expect(breadcrumb).toBeTruthy();
      
      // Check breadcrumb items
      const breadcrumbItems = compiled.querySelectorAll('.breadcrumb-item');
      expect(breadcrumbItems.length).toBe(2);
      
      // Check first breadcrumb item (link)
      const firstItem = breadcrumbItems[0];
      const link = firstItem.querySelector('a');
      expect(link?.textContent?.trim()).toBe('Guía del usuario');
      
      // Check second breadcrumb item (current page) - should use breadcrumbTitle
      const secondItem = breadcrumbItems[1];
      expect(secondItem.classList.contains('active')).toBe(true);
      expect(secondItem.getAttribute('aria-current')).toBe('page');
      expect(secondItem.textContent?.trim()).toBe(mockInformationCard.breadcrumbTitle);
      expect(secondItem.textContent?.trim()).not.toBe(mockInformationCard.title);
    });

    it('should not render content when information card is not available', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(undefined));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const informationDetail = compiled.querySelector('.information-detail');
      
      expect(informationDetail).toBeFalsy();
    });

    it('should handle loading state properly', () => {
      // Test the initial loading state
      expect(component.isLoading).toBe(true);
      
      // Mock service to complete loading
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      
      // Execute ngOnInit
      component.ngOnInit();
      
      // After service call, loading should be false
      expect(component.isLoading).toBe(false);
      expect(component.informationCard).toEqual(mockInformationCard);
    });

    it('should render main content section with three columns when backgroundImage and contentItems are available', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check main content section exists
      const mainContent = compiled.querySelector('.main-content');
      expect(mainContent).toBeTruthy();
      
      // Check three column layout
      const leftColumn = compiled.querySelector('.left-content');
      const centerColumn = compiled.querySelector('.content-image');
      const rightColumn = compiled.querySelector('.right-content');
      
      expect(leftColumn).toBeTruthy();
      expect(centerColumn).toBeTruthy();
      expect(rightColumn).toBeTruthy();
      
      // Check content image in center
      const contentImage = compiled.querySelector('.content-image img') as HTMLImageElement;
      expect(contentImage).toBeTruthy();
      expect(contentImage.src).toContain('background.jpg');
      expect(contentImage.alt).toBe(mockInformationCard.title);
      
      // Check content items are rendered in both columns
      const leftItems = compiled.querySelectorAll('.left-content .content-item');
      const rightItems = compiled.querySelectorAll('.right-content .content-item');
      
      // With 2 items, should have 1 in left and 1 in right
      expect(leftItems.length).toBe(1);
      expect(rightItems.length).toBe(1);
      
      // Check first item in left column
      const firstNumber = leftItems[0].querySelector('.item-number');
      const firstText = leftItems[0].querySelector('.item-text');
      expect(firstNumber?.textContent).toBe('1');
      expect(firstText?.textContent).toBe('Primer item de contenido de prueba.');
      
      // Check second item in right column
      const secondNumber = rightItems[0].querySelector('.item-number');
      const secondText = rightItems[0].querySelector('.item-text');
      expect(secondNumber?.textContent).toBe('2');
      expect(secondText?.textContent).toBe('Segundo item de contenido de prueba.');
    });

    it('should not render main content section when contentItems are not available', () => {
      const cardWithoutContent = { 
        ...mockInformationCard, 
        contentItems: undefined
      };
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(cardWithoutContent));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const mainContent = compiled.querySelector('.main-content');
      expect(mainContent).toBeFalsy();
    });

    it('should not render main content section when contentItems array is empty', () => {
      const cardWithEmptyContent = { 
        ...mockInformationCard, 
        contentItems: []
      };
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(cardWithEmptyContent));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const mainContent = compiled.querySelector('.main-content');
      expect(mainContent).toBeFalsy();
    });

    it('should render information header component', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const headerComponent = compiled.querySelector('app-information-header');
      
      expect(headerComponent).toBeTruthy();
    });

    it('should render information content component when contentItems exist', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const contentComponent = compiled.querySelector('app-information-content');
      
      expect(contentComponent).toBeTruthy();
    });












    it('should have proper semantic structure', () => {
      mockInformationCardsService.getInformationCardByPath.mockReturnValue(of(mockInformationCard));
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      
      // Check main components exist
      const breadcrumbComponent = compiled.querySelector('app-breadcrumb');
      expect(breadcrumbComponent).toBeTruthy();
      
      const headerComponent = compiled.querySelector('app-information-header');
      expect(headerComponent).toBeTruthy();
      
      const contentComponent = compiled.querySelector('app-information-content');
      expect(contentComponent).toBeTruthy();
      
      // Check breadcrumb configuration
      expect(component.breadcrumbConfig).toBeTruthy();
      expect(component.breadcrumbConfig?.items.length).toBe(2);
      
      // Check that information card is passed to components
      expect(component.informationCard).toBeTruthy();
    });
  });
});
