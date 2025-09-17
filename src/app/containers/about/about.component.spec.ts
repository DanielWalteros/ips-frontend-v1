import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AboutComponent } from './about.component';
import { DocumentSectionComponent } from '../../shared/components/document-section/document-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { AboutUsSectionComponent } from '../../components/about-us-section/about-us-section.component';
import { MissionVisionSectionComponent } from '../../components/mission-vision-section/mission-vision-section.component';
import { PrinciplesValuesSectionComponent } from '../../components/principles-values-section/principles-values-section.component';
import { InstitutionalPoliciesSectionComponent } from '../../components/institutional-policies-section/institutional-policies-section.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, AboutComponent, DocumentSectionComponent, HeroSectionComponent, AboutUsSectionComponent, MissionVisionSectionComponent, PrinciplesValuesSectionComponent, InstitutionalPoliciesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component correctly', () => {
    expect(component).toBeInstanceOf(AboutComponent);
  });

  it('should have constructor defined', () => {
    expect(component.constructor).toBeDefined();
  });

  it('should render hero section with correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const heroSection = compiled.querySelector('.about-hero');
    expect(heroSection).toBeTruthy();
    
    const title = compiled.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Todo sobre nosotros y lo que queremos lograr');
  });

  it('should render about us section with correct content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const aboutSection = compiled.querySelector('.about-us-section');
    expect(aboutSection).toBeTruthy();
    
    const aboutTitle = compiled.querySelector('.about-title');
    expect(aboutTitle).toBeTruthy();
    expect(aboutTitle?.textContent?.trim()).toBe('Somos la IPS del grupo empresarial Bolívar');
    
    const aboutDescription = compiled.querySelector('.about-description');
    expect(aboutDescription).toBeTruthy();
    expect(aboutDescription?.textContent).toContain('Estamos comprometidos con una atención de salud oportuna');
  });

  it('should have proper Bootstrap structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check container and grid classes
    const containers = compiled.querySelectorAll('.container');
    expect(containers.length).toBeGreaterThan(0);
    
    const rows = compiled.querySelectorAll('.row');
    expect(rows.length).toBeGreaterThan(0);
    
    const columns = compiled.querySelectorAll('[class*="col-"]');
    expect(columns.length).toBeGreaterThan(0);
  });

  it('should render mission and vision section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const missionVisionSection = compiled.querySelector('.mission-vision-section');
    expect(missionVisionSection).toBeTruthy();
    
    const sectionTitle = compiled.querySelector('.section-title');
    expect(sectionTitle).toBeTruthy();
    expect(sectionTitle?.textContent?.trim()).toBe('Salud Bolívar IPS');
    
    // Check for mission and vision cards
    const missionVisionCards = compiled.querySelectorAll('.mission-vision-card');
    expect(missionVisionCards.length).toBe(2);
    
    // Check mission content
    const missionTitle = compiled.querySelector('h3');
    expect(missionTitle?.textContent?.trim()).toBe('Nuestra Misión');
    
    // Check vision content (second h3)
    const allH3 = compiled.querySelectorAll('h3');
    expect(allH3.length).toBeGreaterThanOrEqual(11); // 2 mission/vision + 5 values + 4 policies (document cards now use h6)
    expect(allH3[1]?.textContent?.trim()).toBe('Nuestra Visión');
  });

  it('should display mission and vision images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const iconContainers = compiled.querySelectorAll('.icon-container img');
    expect(iconContainers.length).toBe(2);
    
    // Check mission image
    const missionImage = iconContainers[0] as HTMLImageElement;
    expect(missionImage.src).toContain('goal_1000000000000000000028.png');
    
    // Check vision image  
    const visionImage = iconContainers[1] as HTMLImageElement;
    expect(visionImage.src).toContain('care-of-heart.svg');
  });

  it('should render principles and values section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const principlesSection = compiled.querySelector('.principles-values-section');
    expect(principlesSection).toBeTruthy();
    
    const principlesTitle = compiled.querySelector('.principles-title');
    expect(principlesTitle).toBeTruthy();
    expect(principlesTitle?.textContent?.trim()).toBe('Principios y valores');
    
    // Check for value items
    const valueItems = compiled.querySelectorAll('.value-item');
    expect(valueItems.length).toBe(5); // Respeto, Honestidad, Entusiasmo, Equidad, Disciplina
    
    // Check value titles
    const valueTitles = compiled.querySelectorAll('.value-title');
    expect(valueTitles.length).toBe(5);
    
    const titleTexts = Array.from(valueTitles).map(title => title.textContent?.trim());
    expect(titleTexts).toContain('Respeto');
    expect(titleTexts).toContain('Equidad');
    expect(titleTexts).toContain('Honestidad');
    expect(titleTexts).toContain('Disciplina');
    expect(titleTexts).toContain('Entusiasmo, Alegría y Buen Humor');
  });

  it('should display values image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const valuesImage = compiled.querySelector('.values-image');
    expect(valuesImage).toBeTruthy();
    
    const imgElement = valuesImage as HTMLImageElement;
    expect(imgElement.src).toContain('mesa-de-trabajo-1-1_109e09h000000000000028.png');
    expect(imgElement.alt).toBe('Valores corporativos');
  });

  it('should render institutional policies section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const policiesSection = compiled.querySelector('.institutional-policies-section');
    expect(policiesSection).toBeTruthy();
    
    // Note: Policies section content is tested in InstitutionalPoliciesSectionComponent
  });

  // Note: Policy card components are now tested in InstitutionalPoliciesSectionComponent

  it('should have proper section structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for all sections
    const heroSection = compiled.querySelector('.about-hero');
    const aboutSection = compiled.querySelector('.about-us-section');
    const missionVisionSection = compiled.querySelector('.mission-vision-section');
    const principlesSection = compiled.querySelector('.principles-values-section');
    const policiesSection = compiled.querySelector('.institutional-policies-section');
    const documentSections = compiled.querySelectorAll('.document-section'); // Document sections (transparency, epidemiological, and financial)
    const epidemiologicalSection = compiled.querySelector('.document-section');
    
    expect(heroSection).toBeTruthy();
    expect(aboutSection).toBeTruthy();
    expect(missionVisionSection).toBeTruthy();
    expect(principlesSection).toBeTruthy();
    expect(policiesSection).toBeTruthy();
    expect(documentSections.length).toBe(3); // Transparency, epidemiological, and financial sections
    expect(epidemiologicalSection).toBeTruthy();
    
    // Check heading hierarchy
    const h1 = compiled.querySelector('h1');
    const h2Elements = compiled.querySelectorAll('h2');
    const h3Elements = compiled.querySelectorAll('h3');
    
    expect(h1).toBeTruthy();
    expect(h2Elements.length).toBe(7); // about-title, section-title, principles-title, policies-title, document-title (x3)
    expect(h3Elements.length).toBeGreaterThanOrEqual(11); // mission, vision, 5 values titles, 4 policy titles (document cards now use h6)
  });

  it('should have semantic HTML structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for semantic component structure (all sections are now in individual components)
    const components = compiled.querySelectorAll('app-hero-section, app-about-us-section, app-mission-vision-section, app-principles-values-section, app-institutional-policies-section, app-document-section');
    expect(components.length).toBe(8); // All section components (including 3 document sections)
    
    // Check for all sections (including those rendered by child components)
    const allSections = compiled.querySelectorAll('section');
    expect(allSections.length).toBeGreaterThanOrEqual(8); // At least one section per component
    
    // Check that all section components are present
    expect(components.length).toBe(8); // All section components (including 3 document sections)
    
    // Component content is tested in individual component specs
  });

  // Note: Individual section content tests are now in their respective component test files

  it('should render financial reports section as document section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const documentSections = compiled.querySelectorAll('app-document-section');
    expect(documentSections.length).toBe(3); // Transparency, epidemiological, and financial sections
    
    // Verify financial data properties are defined
    expect(component.financialTitle).toBe('Estados financieros e informes de gestión');
    expect(component.financialSubtitle).toContain('Conozca todos los informes financieros');
    expect(component.financialDocuments).toBeDefined();
    expect(component.financialDocuments.length).toBeGreaterThan(0);
  });

  it('should render hero section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('app-hero-section');
    expect(heroSection).toBeTruthy();
  });

  it('should render about us section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutUsSection = compiled.querySelector('app-about-us-section');
    expect(aboutUsSection).toBeTruthy();
  });

  it('should render mission vision section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const missionVisionSection = compiled.querySelector('app-mission-vision-section');
    expect(missionVisionSection).toBeTruthy();
  });

  it('should render principles values section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const principlesValuesSection = compiled.querySelector('app-principles-values-section');
    expect(principlesValuesSection).toBeTruthy();
  });

  it('should render transparency section as document section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const documentSections = compiled.querySelectorAll('app-document-section');
    expect(documentSections.length).toBe(3); // Transparency, epidemiological, and financial sections
    
    // Verify transparency data properties are defined
    expect(component.transparencyTitle).toBe('Ruta hacia la Transparencia');
    expect(component.transparencySubtitle).toContain('Conozca cómo en Bolívar Salud IPS estamos comprometidos');
    expect(component.transparencyDocuments).toBeDefined();
    expect(component.transparencyDocuments.length).toBeGreaterThan(0);
  });

  it('should render epidemiological section as document section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const documentSection = compiled.querySelector('app-document-section');
    expect(documentSection).toBeTruthy();
    
    // Verify epidemiological data properties are defined
    expect(component.epidemiologicalTitle).toBe('Boletín Epidemiológico');
    expect(component.epidemiologicalSubtitle).toContain('Aquí podrá mantenerse informado');
    expect(component.epidemiologicalDocuments).toBeDefined();
    expect(component.epidemiologicalDocuments.length).toBeGreaterThan(0);
  });

  it('should render institutional policies section component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const institutionalPoliciesSection = compiled.querySelector('app-institutional-policies-section');
    expect(institutionalPoliciesSection).toBeTruthy();
  });

  // Note: Institutional policies data is now managed by InstitutionalPoliciesSectionComponent

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for main heading
    const mainHeading = compiled.querySelector('h1');
    expect(mainHeading).toBeTruthy();
    
    // Check for secondary headings
    const h2Elements = compiled.querySelectorAll('h2');
    const h3Elements = compiled.querySelectorAll('h3');
    expect(h2Elements.length).toBe(7); // about-title, section-title, principles-title, policies-title, document-title (x3)
    expect(h3Elements.length).toBeGreaterThanOrEqual(11); // mission, vision, 5 values titles, 4 policy titles (document cards now use h6)
    
    // Check text content is meaningful
    const textContent = compiled.textContent;
    expect(textContent).toContain('Todo sobre nosotros');
    expect(textContent).toContain('Somos la IPS del grupo empresarial Bolívar');
    expect(textContent).toContain('Salud Bolívar IPS');
    expect(textContent).toContain('Nuestra Misión');
    expect(textContent).toContain('Nuestra Visión');
    expect(textContent).toContain('Principios y valores');
    expect(textContent).toContain('Respeto');
    expect(textContent).toContain('Equidad');
    expect(textContent).toContain('Políticas institucionales');
    expect(textContent).toContain('Política de calidad');
    expect(textContent).toContain('Política ambiental');
    
    // Check for images with alt attributes
    const images = compiled.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Check values image has proper alt text
    const valuesImage = compiled.querySelector('.values-image') as HTMLImageElement;
    expect(valuesImage?.alt).toBe('Valores corporativos');
    
    // Note: Policy card accessibility is tested in InstitutionalPoliciesSectionComponent
  });
});
