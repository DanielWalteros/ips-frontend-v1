import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ServicesHeroComponent } from './services-hero.component';

describe('ServicesHeroComponent', () => {
  let component: ServicesHeroComponent;
  let fixture: ComponentFixture<ServicesHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ServicesHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component correctly', () => {
    expect(component).toBeInstanceOf(ServicesHeroComponent);
  });

  it('should have constructor defined', () => {
    expect(component.constructor).toBeDefined();
  });

  it('should render hero section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar que la sección hero existe
    const heroSection = compiled.querySelector('.services-hero');
    expect(heroSection).toBeTruthy();
  });

  it('should have hero background div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const heroBackground = compiled.querySelector('.hero-background');
    expect(heroBackground).toBeTruthy();
  });

  it('should have hero overlay div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const heroOverlay = compiled.querySelector('.hero-overlay');
    expect(heroOverlay).toBeTruthy();
  });

  it('should display hero title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const heroTitle = compiled.querySelector('.hero-title');
    expect(heroTitle).toBeTruthy();
    expect(heroTitle?.textContent?.trim()).toBe(
      'Somos especialistas en consulta externa y atención ambulatoria'
    );
  });

  it('should have hero content with proper classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const heroContent = compiled.querySelector('.hero-content');
    expect(heroContent).toBeTruthy();
    expect(heroContent?.classList.contains('text-white')).toBeTruthy();
  });

  it('should have container and row structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar estructura Bootstrap
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
    
    const row = compiled.querySelector('.row');
    expect(row).toBeTruthy();
    expect(row?.classList.contains('align-items-center')).toBeTruthy();
    expect(row?.classList.contains('min-vh-75')).toBeTruthy();
  });

  it('should have proper column layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const column = compiled.querySelector('.col-lg-8.col-xl-7');
    expect(column).toBeTruthy();
  });

  it('should have all required CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar clases principales
    const heroTitle = compiled.querySelector('.hero-title');
    expect(heroTitle?.classList.contains('display-4')).toBeTruthy();
    expect(heroTitle?.classList.contains('fw-bold')).toBeTruthy();
    expect(heroTitle?.classList.contains('mb-4')).toBeTruthy();
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar que hay un heading principal
    const heading = compiled.querySelector('h1');
    expect(heading).toBeTruthy();
  });
});
