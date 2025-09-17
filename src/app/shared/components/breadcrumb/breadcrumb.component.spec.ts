import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbConfig } from '../../../shared/models/breadcrumb';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  const mockBreadcrumbConfig: BreadcrumbConfig = {
    items: [
      {
        label: 'Inicio',
        routerLink: '/inicio',
        isActive: false
      },
      {
        label: 'Sobre nuestra IPS',
        routerLink: '/sobre-nuestra-ips',
        isActive: false
      },
      {
        label: 'Política actual',
        isActive: true
      }
    ],
    ariaLabel: 'Navegación de prueba'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render breadcrumb when config is null', () => {
    component.breadcrumbConfig = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const breadcrumbContainer = compiled.querySelector('.container');
    expect(breadcrumbContainer).toBeFalsy();
  });

  it('should not render breadcrumb when config has no items', () => {
    component.breadcrumbConfig = { items: [], ariaLabel: 'test' };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const breadcrumbContainer = compiled.querySelector('.container');
    expect(breadcrumbContainer).toBeFalsy();
  });

  it('should render breadcrumb with correct structure when config is provided', () => {
    component.breadcrumbConfig = mockBreadcrumbConfig;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check container exists
    const breadcrumbContainer = compiled.querySelector('.container');
    expect(breadcrumbContainer).toBeTruthy();

    // Check nav with correct aria-label
    const nav = compiled.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav?.getAttribute('aria-label')).toBe('Navegación de prueba');

    // Check breadcrumb list
    const breadcrumbList = compiled.querySelector('.breadcrumb');
    expect(breadcrumbList).toBeTruthy();

    // Check breadcrumb items
    const breadcrumbItems = compiled.querySelectorAll('.breadcrumb-item');
    expect(breadcrumbItems.length).toBe(3);
  });

  it('should render non-active items as links', () => {
    component.breadcrumbConfig = mockBreadcrumbConfig;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const breadcrumbItems = compiled.querySelectorAll('.breadcrumb-item');

    // Check first item (non-active with link)
    const firstItem = breadcrumbItems[0];
    expect(firstItem.classList.contains('active')).toBe(false);
    
    const firstLink = firstItem.querySelector('a');
    expect(firstLink).toBeTruthy();
    expect(firstLink?.textContent?.trim()).toBe('Inicio');
    expect(firstLink?.getAttribute('ng-reflect-router-link')).toBe('/inicio');

    // Check second item (non-active with link)
    const secondItem = breadcrumbItems[1];
    expect(secondItem.classList.contains('active')).toBe(false);
    
    const secondLink = secondItem.querySelector('a');
    expect(secondLink).toBeTruthy();
    expect(secondLink?.textContent?.trim()).toBe('Sobre nuestra IPS');
    expect(secondLink?.getAttribute('ng-reflect-router-link')).toBe('/sobre-nuestra-ips');
  });

  it('should render active item as span without link', () => {
    component.breadcrumbConfig = mockBreadcrumbConfig;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const breadcrumbItems = compiled.querySelectorAll('.breadcrumb-item');

    // Check third item (active)
    const thirdItem = breadcrumbItems[2];
    expect(thirdItem.classList.contains('active')).toBe(true);
    expect(thirdItem.getAttribute('aria-current')).toBe('page');
    
    const thirdLink = thirdItem.querySelector('a');
    expect(thirdLink).toBeFalsy();
    
    const thirdSpan = thirdItem.querySelector('span');
    expect(thirdSpan).toBeTruthy();
    expect(thirdSpan?.textContent?.trim()).toBe('Política actual');
  });

  it('should use default aria-label when not provided', () => {
    const configWithoutAriaLabel: BreadcrumbConfig = {
      items: [
        { label: 'Test', isActive: true }
      ]
    };
    
    component.breadcrumbConfig = configWithoutAriaLabel;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nav = compiled.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('breadcrumb');
  });

  it('should have trackByItemLabel function', () => {
    expect(component.trackByItemLabel).toBeDefined();
    expect(typeof component.trackByItemLabel).toBe('function');

    const mockItem = { label: 'Test Label', isActive: false };
    const result = component.trackByItemLabel(0, mockItem);
    expect(result).toBe('Test Label');
  });

  it('should render items without router link as span', () => {
    const configWithoutLink: BreadcrumbConfig = {
      items: [
        { label: 'No Link Item', isActive: false }
      ]
    };
    
    component.breadcrumbConfig = configWithoutLink;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstItem = compiled.querySelector('.breadcrumb-item');
    
    const link = firstItem?.querySelector('a');
    expect(link).toBeFalsy();
    
    const span = firstItem?.querySelector('span');
    expect(span).toBeTruthy();
    expect(span?.textContent?.trim()).toBe('No Link Item');
  });
});
