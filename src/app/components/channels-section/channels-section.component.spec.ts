import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChannelsSectionComponent } from './channels-section.component';
import { ServiceChannelsService } from '../../shared/services/service-channels.service';
import { ServiceChannel } from '../../shared/models/service-channel';

describe('ChannelsSectionComponent', () => {
  let component: ChannelsSectionComponent;
  let fixture: ComponentFixture<ChannelsSectionComponent>;
  let mockServiceChannelsService: any;

  const mockServiceChannels: ServiceChannel[] = [
    {
      id: 'telephone',
      title: 'Línea Telefónica # 322',
      description: 'Desde su celular marque <strong>{{LINK}}</strong>, opciones 1-1-4-1.',
      iconUrl: 'test-icon.png',
      linkUrl: 'tel:#322',
      linkText: '#322',
      linkTarget: '_self',
      linkType: 'tel'
    },
    {
      id: 'whatsapp',
      title: 'Chat en línea',
      description: 'Escríbanos a nuestro <strong>WhatsApp</strong>: {{LINK}}',
      iconUrl: 'whatsapp-icon.png',
      linkUrl: 'https://api.whatsapp.com/send?phone=573223322322',
      linkText: '322 332 2322',
      linkTarget: '_blank',
      linkType: 'whatsapp'
    },
    {
      id: 'presencial',
      title: 'Atención presencial',
      description: 'Acercándose a la sede de su preferencia.',
      iconUrl: 'location-icon.svg',
      linkType: 'none'
    },
    {
      id: 'autoagendamiento',
      title: 'Autoagendamiento',
      description: 'Para pacientes con póliza de Salud de Seguros Bolívar: {{LINK}}.',
      iconUrl: 'appointment-icon.png',
      linkUrl: 'https://clientes.segurosbolivar.com/login',
      linkText: 'Acceso clientes',
      linkTarget: '_blank',
      linkType: 'external'
    }
  ];

  beforeEach(async () => {
    const serviceChannelsServiceSpy = {
      getAllServiceChannels: jest.fn().mockReturnValue(of(mockServiceChannels))
    };

    await TestBed.configureTestingModule({
      imports: [ChannelsSectionComponent],
      providers: [
        { provide: ServiceChannelsService, useValue: serviceChannelsServiceSpy }
      ]
    }).compileComponents();

    mockServiceChannelsService = TestBed.inject(ServiceChannelsService) as any;
    fixture = TestBed.createComponent(ChannelsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load service channels from service on init', () => {
    expect(mockServiceChannelsService.getAllServiceChannels).toHaveBeenCalled();
    expect(component.serviceChannels).toEqual(mockServiceChannels);
    expect(component.serviceChannels.length).toBe(4);
  });

  it('should display section title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.channels-title');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Solicite sus servicios a través de nuestros canales');
  });

  it('should render service channel cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const channelCards = compiled.querySelectorAll('app-service-channel-card');
    expect(channelCards.length).toBe(4);
    expect(channelCards.length).toBe(component.serviceChannels.length);
  });

  it('should display channels section with proper structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check main section
    const section = compiled.querySelector('.channels-section');
    expect(section).toBeTruthy();
    expect(section?.classList.contains('py-5')).toBeTruthy();

    // Check container structure
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();

    // Check row structure for grid layout
    const rows = compiled.querySelectorAll('.row');
    expect(rows.length).toBe(2); // Title row + cards row
  });

  it('should use Bootstrap grid classes for responsive layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardColumns = compiled.querySelectorAll('.col-lg-3.col-md-6');
    expect(cardColumns.length).toBe(4);
  });

  it('should handle empty service channels gracefully', () => {
    // Override the mock to return empty array
    mockServiceChannelsService.getAllServiceChannels.mockReturnValue(of([]));
    
    const newFixture = TestBed.createComponent(ChannelsSectionComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.serviceChannels).toEqual([]);
    
    const compiled = newFixture.nativeElement as HTMLElement;
    const channelCards = compiled.querySelectorAll('app-service-channel-card');
    expect(channelCards.length).toBe(0);
  });

  it('should have proper accessibility structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check semantic section element
    const section = compiled.querySelector('section.channels-section');
    expect(section).toBeTruthy();

    // Check heading structure
    const title = compiled.querySelector('h2.channels-title');
    expect(title).toBeTruthy();
  });

  it('should render channels data correctly', () => {
    expect(component.serviceChannels[0].title).toBe('Línea Telefónica # 322');
    expect(component.serviceChannels[1].title).toBe('Chat en línea');
    expect(component.serviceChannels[2].title).toBe('Atención presencial');
    expect(component.serviceChannels[3].title).toBe('Autoagendamiento');
  });
});
