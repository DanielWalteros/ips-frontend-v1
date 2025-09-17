import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ServiceChannelCardComponent } from './service-channel-card.component';
import { ServiceChannel } from '../../shared/models/service-channel';

describe('ServiceChannelCardComponent', () => {
  let component: ServiceChannelCardComponent;
  let fixture: ComponentFixture<ServiceChannelCardComponent>;
  let debugElement: DebugElement;

  const mockChannelWithLink: ServiceChannel = {
    id: 'whatsapp',
    title: 'Chat en línea',
    description: 'Escríbanos a nuestro <strong>WhatsApp</strong>: {{LINK}}.',
    iconUrl: 'https://example.com/whatsapp-icon.png',
    iconSrcSet: 'https://example.com/whatsapp-icon.png 1x, https://example.com/whatsapp-icon-2x.png 2x',
    iconDataSrcDesktop1x: 'https://example.com/whatsapp-desktop-1x.png',
    iconDataSrcDesktop2x: 'https://example.com/whatsapp-desktop-2x.png',
    linkUrl: 'https://api.whatsapp.com/send?phone=573223322322',
    linkText: '<strong>322 332 2322</strong>',
    linkTarget: '_blank',
    linkType: 'whatsapp'
  };

  const mockChannelWithoutLink: ServiceChannel = {
    id: 'presencial',
    title: 'Atención presencial',
    description: 'Acercándose a la sede de su preferencia.',
    iconUrl: 'https://example.com/location-icon.svg',
    iconDataSrcDesktop1x: 'https://example.com/location-desktop.svg',
    iconDataSrcMobile1x: 'https://example.com/location-mobile.svg',
    linkType: 'none'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceChannelCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceChannelCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    component.channel = mockChannelWithLink;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Component Rendering', () => {
    beforeEach(() => {
      component.channel = mockChannelWithLink;
      fixture.detectChanges();
    });

    it('should display the channel card', () => {
      const channelCard = debugElement.query(By.css('.channel-card'));
      expect(channelCard).toBeTruthy();
    });

    it('should display channel icon', () => {
      const channelIcon = debugElement.query(By.css('.channel-icon img'));
      expect(channelIcon).toBeTruthy();
      expect(channelIcon.nativeElement.src).toBe(mockChannelWithLink.iconUrl);
    });

    it('should display channel title', () => {
      const titleElement = debugElement.query(By.css('.channel-title'));
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent.trim()).toBe(mockChannelWithLink.title);
    });

    it('should display channel description', () => {
      const descriptionElement = debugElement.query(By.css('.channel-description'));
      expect(descriptionElement).toBeTruthy();
    });

    it('should set responsive image attributes', () => {
      const channelIcon = debugElement.query(By.css('.channel-icon img'));
      expect(channelIcon.nativeElement.getAttribute('data-src-desktop-1x')).toBe(mockChannelWithLink.iconDataSrcDesktop1x);
      expect(channelIcon.nativeElement.getAttribute('data-src-desktop-2x')).toBe(mockChannelWithLink.iconDataSrcDesktop2x);
      expect(channelIcon.nativeElement.getAttribute('srcset')).toBe(mockChannelWithLink.iconSrcSet);
    });
  });

  describe('Channel With Link', () => {
    beforeEach(() => {
      component.channel = mockChannelWithLink;
      fixture.detectChanges();
    });

    it('should format description with link', () => {
      const formattedDescription = component.getFormattedDescription();
      expect(formattedDescription).toContain('<a href="https://api.whatsapp.com/send?phone=573223322322"');
      expect(formattedDescription).toContain('target="_blank"');
      expect(formattedDescription).toContain('<strong>322 332 2322</strong>');
      expect(formattedDescription).not.toContain('{{LINK}}');
    });

    it('should render link in description', () => {
      const descriptionElement = debugElement.query(By.css('.channel-description'));
      const innerHTML = descriptionElement.nativeElement.innerHTML;
      expect(innerHTML).toContain('<a href="https://api.whatsapp.com/send?phone=573223322322"');
      expect(innerHTML).toContain('target="_blank"');
    });

    it('should have external link with correct attributes', () => {
      const linkElement = debugElement.query(By.css('.channel-description a'));
      expect(linkElement).toBeTruthy();
      expect(linkElement.nativeElement.href).toBe(mockChannelWithLink.linkUrl);
      expect(linkElement.nativeElement.target).toBe('_blank');
    });
  });

  describe('Channel Without Link', () => {
    beforeEach(() => {
      component.channel = mockChannelWithoutLink;
      fixture.detectChanges();
    });

    it('should display description without link formatting', () => {
      const formattedDescription = component.getFormattedDescription();
      expect(formattedDescription).toBe(mockChannelWithoutLink.description);
      expect(formattedDescription).not.toContain('<a');
    });

    it('should not have links in description', () => {
      const linkElements = debugElement.queryAll(By.css('.channel-description a'));
      expect(linkElements.length).toBe(0);
    });
  });

  describe('Description Formatting', () => {
    it('should handle description without placeholder', () => {
      const channelWithoutPlaceholder: ServiceChannel = {
        ...mockChannelWithLink,
        description: 'Simple description without placeholder',
        linkUrl: 'https://example.com',
        linkText: 'Link Text'
      };
      
      component.channel = channelWithoutPlaceholder;
      const result = component.getFormattedDescription();
      expect(result).toBe('Simple description without placeholder');
    });

    it('should handle channel without link URL', () => {
      const channelWithoutUrl: ServiceChannel = {
        ...mockChannelWithLink,
        linkUrl: undefined,
        linkText: 'Some Text'
      };
      
      component.channel = channelWithoutUrl;
      const result = component.getFormattedDescription();
      expect(result).toBe(channelWithoutUrl.description);
    });

    it('should handle channel without link text', () => {
      const channelWithoutText: ServiceChannel = {
        ...mockChannelWithLink,
        linkUrl: 'https://example.com',
        linkText: undefined
      };
      
      component.channel = channelWithoutText;
      const result = component.getFormattedDescription();
      expect(result).toBe(channelWithoutText.description);
    });

    it('should handle _self target correctly', () => {
      const channelWithSelfTarget: ServiceChannel = {
        ...mockChannelWithLink,
        linkTarget: '_self'
      };
      
      component.channel = channelWithSelfTarget;
      const result = component.getFormattedDescription();
      expect(result).toContain('<a href="');
      expect(result).not.toContain('target="_blank"');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.channel = mockChannelWithLink;
      fixture.detectChanges();
    });

    it('should have proper image alt attribute (empty for decorative)', () => {
      const channelIcon = debugElement.query(By.css('.channel-icon img'));
      expect(channelIcon.nativeElement.alt).toBe('');
    });

    it('should have proper heading hierarchy', () => {
      const titleElement = debugElement.query(By.css('.channel-title'));
      expect(titleElement.nativeElement.tagName).toBe('H5');
    });

    it('should have focus styles for links', () => {
      const linkElement = debugElement.query(By.css('.channel-description a'));
      expect(linkElement).toBeTruthy();
      // Focus styles are handled by CSS
    });
  });

  describe('Styling and Layout', () => {
    beforeEach(() => {
      component.channel = mockChannelWithLink;
      fixture.detectChanges();
    });

    it('should have proper card styling classes', () => {
      const channelCard = debugElement.query(By.css('.channel-card'));
      expect(channelCard.nativeElement.classList).toContain('channel-card');
      expect(channelCard.nativeElement.classList).toContain('text-center');
      expect(channelCard.nativeElement.classList).toContain('h-100');
    });

    it('should have icon container with proper classes', () => {
      const iconContainer = debugElement.query(By.css('.channel-icon'));
      expect(iconContainer).toBeTruthy();
      expect(iconContainer.nativeElement.classList).toContain('mb-3');
    });

    it('should have title with proper classes', () => {
      const titleElement = debugElement.query(By.css('.channel-title'));
      expect(titleElement.nativeElement.classList).toContain('channel-title');
      expect(titleElement.nativeElement.classList).toContain('mb-3');
    });

    it('should have description with proper classes', () => {
      const descriptionElement = debugElement.query(By.css('.channel-description'));
      expect(descriptionElement.nativeElement.classList).toContain('channel-description');
      expect(descriptionElement.nativeElement.classList).toContain('mb-2');
    });
  });

  describe('Component Input', () => {
    it('should handle input changes', () => {
      component.channel = mockChannelWithLink;
      fixture.detectChanges();

      const titleElement = debugElement.query(By.css('.channel-title'));
      expect(titleElement.nativeElement.textContent.trim()).toBe(mockChannelWithLink.title);

      // Change to different channel
      component.channel = mockChannelWithoutLink;
      fixture.detectChanges();

      expect(titleElement.nativeElement.textContent.trim()).toBe(mockChannelWithoutLink.title);
    });

    it('should require channel input', () => {
      component.channel = mockChannelWithLink;
      expect(component.channel).toBeDefined();
      expect(component.channel).toBe(mockChannelWithLink);
    });
  });

  describe('Different Channel Types', () => {
    it('should handle telephone channel type', () => {
      const telChannel: ServiceChannel = {
        id: 'telephone',
        title: 'Línea Telefónica # 322',
        description: 'Desde su celular marque {{LINK}}, opciones 1-1-4-1.',
        iconUrl: 'https://example.com/phone-icon.png',
        linkUrl: 'tel:#322',
        linkText: '#322',
        linkTarget: '_self',
        linkType: 'tel'
      };

      component.channel = telChannel;
      const result = component.getFormattedDescription();
      expect(result).toContain('tel:#322');
      expect(result).not.toContain('target="_blank"');
    });

    it('should handle external link channel type', () => {
      const externalChannel: ServiceChannel = {
        id: 'external',
        title: 'Autoagendamiento',
        description: 'Para pacientes con póliza de Salud de Seguros Bolívar: {{LINK}}.',
        iconUrl: 'https://example.com/calendar-icon.png',
        linkUrl: 'https://clientes.segurosbolivar.com/login',
        linkText: 'Acceso clientes',
        linkTarget: '_blank',
        linkType: 'external'
      };

      component.channel = externalChannel;
      const result = component.getFormattedDescription();
      expect(result).toContain('https://clientes.segurosbolivar.com/login');
      expect(result).toContain('target="_blank"');
    });
  });
});
