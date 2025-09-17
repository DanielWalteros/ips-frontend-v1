import { TestBed } from '@angular/core/testing';
import { ServiceChannelsService } from './service-channels.service';
import { ServiceChannel } from '../shared/models/service-channel';

describe('ServiceChannelsService', () => {
  let service: ServiceChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all service channels', () => {
    service.getAllServiceChannels().subscribe(channels => {
      expect(channels).toBeDefined();
      expect(channels.length).toBe(4);
      expect(channels.some(channel => channel.id === 'telephone')).toBeTruthy();
      expect(channels.some(channel => channel.id === 'whatsapp')).toBeTruthy();
      expect(channels.some(channel => channel.id === 'presencial')).toBeTruthy();
      expect(channels.some(channel => channel.id === 'autoagendamiento')).toBeTruthy();
    });
  });

  it('should return a specific service channel by id', () => {
    service.getServiceChannelById('telephone').subscribe(channel => {
      expect(channel).toBeDefined();
      expect(channel?.id).toBe('telephone');
      expect(channel?.title).toBe('Línea Telefónica # 322');
      expect(channel?.linkType).toBe('tel');
    });
  });

  it('should return null for non-existent channel id', () => {
    service.getServiceChannelById('non-existent').subscribe(channel => {
      expect(channel).toBeNull();
    });
  });

  it('should return service channels filtered by link type', () => {
    service.getServiceChannelsByLinkType('external').subscribe(channels => {
      expect(channels).toBeDefined();
      expect(channels.length).toBe(1);
      expect(channels[0].id).toBe('autoagendamiento');
      expect(channels[0].linkType).toBe('external');
    });
  });

  it('should return empty array for non-existent link type', () => {
    service.getServiceChannelsByLinkType('non-existent').subscribe(channels => {
      expect(channels).toBeDefined();
      expect(channels.length).toBe(0);
    });
  });

  it('should return whatsapp channel', () => {
    service.getServiceChannelById('whatsapp').subscribe(channel => {
      expect(channel).toBeDefined();
      expect(channel?.title).toBe('Chat en línea');
      expect(channel?.linkType).toBe('whatsapp');
      expect(channel?.linkUrl).toContain('whatsapp.com');
    });
  });

  it('should return presencial channel without link', () => {
    service.getServiceChannelById('presencial').subscribe(channel => {
      expect(channel).toBeDefined();
      expect(channel?.title).toBe('Atención presencial');
      expect(channel?.linkType).toBe('none');
      expect(channel?.linkUrl).toBeUndefined();
    });
  });

  it('should return channels with phone link type', () => {
    service.getServiceChannelsByLinkType('tel').subscribe(channels => {
      expect(channels).toBeDefined();
      expect(channels.length).toBe(1);
      expect(channels[0].id).toBe('telephone');
      expect(channels[0].linkUrl).toBe('tel:#322');
    });
  });
});
