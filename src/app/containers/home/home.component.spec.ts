import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { LocationCardComponent } from '../../components/location-card/location-card.component';
import { DocumentCardComponent } from '../../shared/components/document-card/document-card.component';
import { ClientLogoComponent } from '../../components/client-logo/client-logo.component';
import { ServiceChannelCardComponent } from '../../components/service-channel-card/service-channel-card.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        LocationCardComponent,
        DocumentCardComponent,
        ClientLogoComponent,
        ServiceChannelCardComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Security Banner Section', () => {
    it('should display security banner with main title', () => {
      const securityBanner = debugElement.query(By.css('.security-banner'));
      expect(securityBanner).toBeTruthy();

      const mainTitle = debugElement.query(By.css('.security-title'));
      expect(mainTitle).toBeTruthy();
      expect(mainTitle.nativeElement.textContent).toContain('¡Tranquilo! Su información está segura con nosotros');
    });

    it('should have call-to-action button', () => {
      const ctaButton = debugElement.query(By.css('.security-btn'));
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.nativeElement.textContent).toContain('Conózcala aquí');
    });

    it('should mention data protection or security', () => {
      const securityText = debugElement.nativeElement.textContent.toLowerCase();
      
      expect(
        securityText.includes('segur') ||
        securityText.includes('protec') ||
        securityText.includes('confiden') ||
        securityText.includes('datos')
      ).toBeTruthy();
    });
  });

  describe('Welcome Section', () => {
    it('should display welcome section with main title', () => {
      const welcomeSection = debugElement.query(By.css('.welcome-section'));
      expect(welcomeSection).toBeTruthy();

      const mainTitle = debugElement.query(By.css('.welcome-title'));
      expect(mainTitle).toBeTruthy();
      expect(mainTitle.nativeElement.textContent).toContain('¡Bienvenido!');
    });

    it('should have primary call-to-action button', () => {
      const ctaButton = debugElement.query(By.css('.welcome-btn'));
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.nativeElement.textContent).toContain('Agendar cita');
    });

    it('should display welcome message', () => {
      const welcomeText = debugElement.query(By.css('.welcome-text'));
      expect(welcomeText).toBeTruthy();
      expect(welcomeText.nativeElement.textContent).toContain('Brindamos atención médica');
    });
  });

  describe('Channels Section', () => {
    it('should display channels section', () => {
      const channelsSection = debugElement.query(By.css('.channels-section'));
      expect(channelsSection).toBeTruthy();
    });

    it('should include channels section component', () => {
      const channelsSectionComponent = debugElement.query(By.css('app-channels-section'));
      expect(channelsSectionComponent).toBeTruthy();
    });

    it('should render channels section properly in page layout', () => {
      const allSections = debugElement.queryAll(By.css('app-security-banner, app-welcome-section, app-channels-section, app-locations-section, app-clients-section, app-document-section'));
      expect(allSections.length).toBe(6); // Should have all 6 main sections
      
      const channelsSection = allSections.find(section => section.nativeElement.tagName.toLowerCase() === 'app-channels-section');
      expect(channelsSection).toBeTruthy();
    });

    it('should include communication channels', () => {
      const channelsText = debugElement.nativeElement.textContent.toLowerCase();
      
      expect(
        channelsText.includes('teléfono') ||
        channelsText.includes('whatsapp') ||
        channelsText.includes('presencial') ||
        channelsText.includes('autoagendamiento')
      ).toBeTruthy();
    });
  });

  describe('Locations Section', () => {
    it('should display locations section', () => {
      const locationsSection = debugElement.query(By.css('.locations-section'));
      expect(locationsSection).toBeTruthy();
    });

    it('should display locations title', () => {
      const locationsTitle = debugElement.query(By.css('.locations-title'));
      expect(locationsTitle).toBeTruthy();
      expect(locationsTitle.nativeElement.textContent).toContain('Conozca nuestras sedes de atención');
    });

    it('should show location cards using LocationCardComponent', () => {
      const locationCards = debugElement.queryAll(By.css('app-location-card'));
      expect(locationCards.length).toBeGreaterThan(0);
      expect(locationCards.length).toBe(component.locations.length);
    });

    it('should have links to services page from location cards', () => {
      const serviceLinks = debugElement.queryAll(By.css('a[routerLink="/nuestros-servicios"]'));
      expect(serviceLinks.length).toBeGreaterThan(0);
    });

    it('should display location information', () => {
      const locationsText = debugElement.nativeElement.textContent.toLowerCase();
      
      expect(
        locationsText.includes('unidad') ||
        locationsText.includes('atención') ||
        locationsText.includes('horario') ||
        locationsText.includes('sede')
      ).toBeTruthy();
    });

    it('should render location data from component', () => {
      expect(component.locations).toBeDefined();
      expect(component.locations.length).toBeGreaterThan(0);
      
      // Verificar que cada ubicación tiene las propiedades necesarias
      component.locations.forEach(location => {
        expect(location.name).toBeDefined();
        expect(location.imageUrl).toBeDefined();
        expect(location.schedule).toBeDefined();
      });
    });
  });

  describe('Clients Section', () => {
    it('should display clients section', () => {
      const clientsSection = debugElement.query(By.css('.clients-section'));
      expect(clientsSection).toBeTruthy();
    });

    it('should display clients title', () => {
      const clientsTitle = debugElement.query(By.css('.clients-title'));
      expect(clientsTitle).toBeTruthy();
      expect(clientsTitle.nativeElement.textContent).toContain('Nuestros clientes');
    });

    it('should show client logos using ClientLogoComponent', () => {
      const clientLogos = debugElement.queryAll(By.css('app-client-logo'));
      expect(clientLogos.length).toBe(2);
      expect(clientLogos.length).toBe(component.clients.length);
    });

    it('should display client logo images', () => {
      const clientLogos = debugElement.queryAll(By.css('.client-logo-img'));
      expect(clientLogos.length).toBe(2);
      
      // Verificar que los logos tienen alt text apropiado
      const altTexts = clientLogos.map(logo => logo.nativeElement.alt);
      expect(altTexts).toContain('Seguros Bolívar');
      expect(altTexts).toContain('ARL Seguros Bolívar');
    });

    it('should render client data from component', () => {
      expect(component.clients).toBeDefined();
      expect(component.clients.length).toBeGreaterThan(0);
      
      // Verificar que cada cliente tiene las propiedades necesarias
      component.clients.forEach(client => {
        expect(client.name).toBeDefined();
        expect(client.logoUrl).toBeDefined();
        expect(client.altText).toBeDefined();
        expect(client.websiteUrl).toBeDefined();
      });
    });

    it('should have logo separator for desktop', () => {
      const logoSeparator = debugElement.query(By.css('.logo-separator'));
      expect(logoSeparator).toBeTruthy();
    });

    it('should have mobile separator for mobile view', () => {
      const mobileSeparator = debugElement.query(By.css('.logo-separator-mobile'));
      expect(mobileSeparator).toBeTruthy();
    });

    it('should have appropriate styling and layout', () => {
      const clientsSection = debugElement.query(By.css('.clients-section'));
      expect(clientsSection.nativeElement.classList).toContain('clients-section');
      
      const clientComponents = debugElement.queryAll(By.css('app-client-logo'));
      expect(clientComponents.length).toBe(2);
    });
  });

  describe('Financial Reports Section', () => {
    it('should display financial reports section', () => {
      const financialSection = debugElement.query(By.css('.financial-reports-section'));
      expect(financialSection).toBeTruthy();
    });

    it('should display financial reports title', () => {
      const financialTitle = debugElement.query(By.css('.financial-title'));
      expect(financialTitle).toBeTruthy();
      expect(financialTitle.nativeElement.textContent).toContain('Estados financieros e informes de gestión');
    });

    it('should display financial reports subtitle', () => {
      const financialSubtitle = debugElement.query(By.css('.financial-subtitle'));
      expect(financialSubtitle).toBeTruthy();
      expect(financialSubtitle.nativeElement.textContent).toContain('Conozca todos los informes financieros');
    });

    it('should show financial report cards using DocumentCardComponent', () => {
      const financialCards = debugElement.queryAll(By.css('app-document-card'));
      expect(financialCards.length).toBe(6); // 2024, 2023, 2022, 2021, 2020, 2019
    });

    it('should display PDF icons in each card', () => {
      const pdfIcons = debugElement.queryAll(By.css('.pdf-icon img'));
      expect(pdfIcons.length).toBe(6);
      
      // Verificar que todas las imágenes tienen alt text
      pdfIcons.forEach(icon => {
        expect(icon.nativeElement.alt).toBe('PDF');
      });
    });

    it('should have downloadable links for each report', () => {
      const reportLinks = debugElement.queryAll(By.css('.financial-card-title a'));
      expect(reportLinks.length).toBe(6);
      
      // Verificar que los enlaces tienen target="_blank" para reportes disponibles
      reportLinks.forEach(link => {
        expect(link.nativeElement.target).toBe('_blank');
      });
    });

    it('should display correct year information in titles', () => {
      const cardTitles = debugElement.queryAll(By.css('.financial-card-title a'));
      const titleTexts = cardTitles.map(title => title.nativeElement.textContent);
      
      expect(titleTexts.some(text => text.includes('2024'))).toBeTruthy();
      expect(titleTexts.some(text => text.includes('2023'))).toBeTruthy();
      expect(titleTexts.some(text => text.includes('2022'))).toBeTruthy();
      expect(titleTexts.some(text => text.includes('2021'))).toBeTruthy();
      expect(titleTexts.some(text => text.includes('2020'))).toBeTruthy();
      expect(titleTexts.some(text => text.includes('2019'))).toBeTruthy();
    });


    it('should have appropriate styling and responsive layout', () => {
      const financialSection = debugElement.query(By.css('.financial-reports-section'));
      expect(financialSection).toBeTruthy();
      
      const financialCards = debugElement.queryAll(By.css('app-document-card'));
      expect(financialCards.length).toBeGreaterThan(0);
      
      // Verificar que las tarjetas están organizadas correctamente
      const cardRows = debugElement.queryAll(By.css('.row.g-4.justify-content-center'));
      expect(cardRows.length).toBeGreaterThan(0);
    });
  });


  describe('Navigation and Links', () => {
    it('should have proper router links', () => {
      const routerLinks = debugElement.queryAll(By.css('a[routerLink]'));
      expect(routerLinks.length).toBeGreaterThan(0);

      // Verificar que los links principales están presentes
      const linkPaths = routerLinks.map(link => link.nativeElement.getAttribute('routerLink'));
      expect(linkPaths).toContain('/nuestros-servicios');
    });

    it('should have external contact links', () => {
      const phoneLinks = debugElement.queryAll(By.css('a[href^="tel:"]'));
      const whatsappLinks = debugElement.queryAll(By.css('a[href*="wa.me"], a[href*="whatsapp"]'));
      
      expect(phoneLinks.length + whatsappLinks.length).toBeGreaterThan(0);
    });

    it('should have external policy link', () => {
      const policyLinks = debugElement.queryAll(By.css('a[href*="pdf"]'));
      expect(policyLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive containers', () => {
      const containers = debugElement.queryAll(By.css('.container, .container-fluid'));
      expect(containers.length).toBeGreaterThan(0);
    });

    it('should use Bootstrap grid classes', () => {
      const gridElements = debugElement.queryAll(By.css('[class*="col-"], .row'));
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const h1Elements = debugElement.queryAll(By.css('h1'));
      const h2Elements = debugElement.queryAll(By.css('h2'));
      
      expect(h1Elements.length).toBeGreaterThan(0);
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('should have alt text for images', () => {
      const images = debugElement.queryAll(By.css('img'));
      
      // Solo verificar si hay imágenes presentes
      if (images.length > 0) {
        images.forEach(img => {
          expect(img.nativeElement.alt).toBeDefined();
          // Permitir alt vacío para imágenes decorativas
          expect(img.nativeElement.hasAttribute('alt')).toBeTruthy();
        });
      } else {
        // Si no hay imágenes, el test pasa
        expect(true).toBeTruthy();
      }
    });

    it('should have descriptive link text', () => {
      const links = debugElement.queryAll(By.css('a'));
      
      links.forEach(link => {
        const linkText = link.nativeElement.textContent.trim();
        const hasAriaLabel = link.nativeElement.getAttribute('aria-label');
        const hasImg = link.query(By.css('img'));
        
        // Cada link debe tener texto descriptivo, aria-label, o contener una imagen con alt
        const hasDescriptiveText = linkText.length > 0;
        const hasAccessibleImage = hasImg && hasImg.nativeElement.alt.length > 0;
        
        expect(hasDescriptiveText || hasAriaLabel || hasAccessibleImage).toBeTruthy();
      });
    });
  });

  describe('Performance', () => {
    it('should render without errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should have reasonable DOM depth for performance', () => {
      const deepElements = debugElement.queryAll(By.css('div div div div div div'));
      
      // Con la nueva estructura de componentes, permitir más anidación
      expect(deepElements.length).toBeLessThan(25);
    });
  });

  describe('Brand Consistency', () => {
    it('should use brand styling and buttons', () => {
      const brandElements = debugElement.queryAll(By.css('.welcome-btn, .security-btn, .location-btn, .btn-agendar'));
      expect(brandElements.length).toBeGreaterThan(0);
    });

    it('should mention Salud Bolívar IPS branding', () => {
      const pageText = debugElement.nativeElement.textContent;
      expect(pageText).toContain('Bolívar');
    });

    it('should use brand sections', () => {
      const brandSections = debugElement.queryAll(By.css('.welcome-section, .security-banner, .channels-section, .locations-section'));
      expect(brandSections.length).toBeGreaterThan(0);
    });
  });
});
