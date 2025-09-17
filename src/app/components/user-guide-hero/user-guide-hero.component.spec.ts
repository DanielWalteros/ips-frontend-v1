import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGuideHeroComponent } from './user-guide-hero.component';

describe('UserGuideHeroComponent', () => {
  let component: UserGuideHeroComponent;
  let fixture: ComponentFixture<UserGuideHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGuideHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGuideHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heroBackgroundImage property defined', () => {
    expect(component.heroBackgroundImage).toBeDefined();
    expect(component.heroBackgroundImage).toContain('https://');
    expect(component.heroBackgroundImage).toContain('usuarios_');
  });

  it('should render hero section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check hero section exists
    const heroSection = compiled.querySelector('.user-guide-hero');
    expect(heroSection).toBeTruthy();
    
    // Check hero overlay exists
    const heroOverlay = compiled.querySelector('.hero-overlay');
    expect(heroOverlay).toBeTruthy();
    
    // Check container exists
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
  });

  it('should apply background image from component property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.user-guide-hero') as HTMLElement;
    
    expect(heroSection).toBeTruthy();
    // Check that the style attribute contains the background image URL
    const style = heroSection.getAttribute('style');
    expect(style).toContain(component.heroBackgroundImage);
  });

  it('should render hero title text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check hero title exists
    const heroTitle = compiled.querySelector('.hero-title');
    expect(heroTitle).toBeTruthy();
    expect(heroTitle?.textContent?.trim()).toContain('Información relevante y');
    expect(heroTitle?.textContent?.trim()).toContain('a tener en cuenta para');
    expect(heroTitle?.textContent?.trim()).toContain('todos nuestros usuarios');
  });

  it('should have proper accessibility structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check heading hierarchy
    const h1 = compiled.querySelector('h1.hero-title');
    expect(h1).toBeTruthy();
    
    // Check text is white for contrast
    expect(h1?.classList.contains('text-white')).toBeTruthy();
  });

  it('should have Bootstrap grid classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check container class
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
    
    // Check row class
    const row = compiled.querySelector('.row');
    expect(row).toBeTruthy();
    
    // Check column class
    const col = compiled.querySelector('.col-12');
    expect(col).toBeTruthy();
  });

  it('should have text-box styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check hero text box exists
    const heroTextBox = compiled.querySelector('.hero-text-box');
    expect(heroTextBox).toBeTruthy();
    
    // Check hero content exists
    const heroContent = compiled.querySelector('.hero-content');
    expect(heroContent).toBeTruthy();
  });

  it('should handle background image URL updates', () => {
    const originalUrl = component.heroBackgroundImage;
    expect(originalUrl).toContain('usuarios_');
    
    // Update the background image
    const newImageUrl = 'https://example.com/different-image.jpg';
    component.heroBackgroundImage = newImageUrl;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.user-guide-hero') as HTMLElement;
    const style = heroSection.getAttribute('style');
    
    expect(style).toContain(newImageUrl);
  });
});
