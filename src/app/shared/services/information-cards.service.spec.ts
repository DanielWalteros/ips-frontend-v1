import { TestBed } from '@angular/core/testing';
import { InformationCardsService } from './information-cards.service';
import { InformationCard } from '../shared/models/information-card';

describe('InformationCardsService', () => {
  let service: InformationCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllInformationCards', () => {
    it('should return all information cards', (done) => {
      service.getAllInformationCards().subscribe(cards => {
        expect(cards).toBeDefined();
        expect(cards.length).toBe(3);
        
        // Check first card
        expect(cards[0].id).toBe('derechos-usuario');
        expect(cards[0].path).toBe('derechos');
        expect(cards[0].title).toBe('Derechos del usuario en Salud Bolívar IPS');
        expect(cards[0].routerLink).toBe('/guia-para-el-usuario/derechos');
        
        // Check second card
        expect(cards[1].id).toBe('deberes-usuario');
        expect(cards[1].path).toBe('deberes');
        expect(cards[1].title).toBe('Deberes del usuario en Salud Bolívar IPS');
        expect(cards[1].routerLink).toBe('/guia-para-el-usuario/deberes');
        
        // Check third card
        expect(cards[2].id).toBe('asociacion-usuarios');
        expect(cards[2].path).toBe('asociacion');
        expect(cards[2].title).toBe('Asociación de usuarios y participación social');
        expect(cards[2].routerLink).toBe('/guia-para-el-usuario/asociacion');
        
        done();
      });
    });

    it('should return cards with all required properties', (done) => {
      service.getAllInformationCards().subscribe(cards => {
        cards.forEach(card => {
          expect(card.id).toBeDefined();
          expect(card.path).toBeDefined();
          expect(card.title).toBeDefined();
          expect(card.breadcrumbTitle).toBeDefined();
          expect(card.cardImage).toBeDefined();
          expect(card.routerLink).toBeDefined();
          expect(card.description).toBeDefined();
          expect(card.backgroundImage).toBeDefined();
        });
        done();
      });
    });

    it('should have breadcrumbTitle different from title for better UX', (done) => {
      service.getAllInformationCards().subscribe(cards => {
        cards.forEach(card => {
          expect(card.breadcrumbTitle).toBeDefined();
          expect(card.breadcrumbTitle.length).toBeGreaterThan(0);
          expect(card.breadcrumbTitle).not.toBe(card.title);
          expect(card.breadcrumbTitle.length).toBeLessThan(card.title.length);
        });
        done();
      });
    });
  });

  describe('getInformationCardByPath', () => {
    it('should return the correct card when path exists', (done) => {
      service.getInformationCardByPath('derechos').subscribe(card => {
        expect(card).toBeDefined();
        expect(card?.id).toBe('derechos-usuario');
        expect(card?.path).toBe('derechos');
        expect(card?.title).toBe('Derechos del usuario en Salud Bolívar IPS');
        expect(card?.routerLink).toBe('/guia-para-el-usuario/derechos');
        done();
      });
    });

    it('should return the correct card for deberes path', (done) => {
      service.getInformationCardByPath('deberes').subscribe(card => {
        expect(card).toBeDefined();
        expect(card?.id).toBe('deberes-usuario');
        expect(card?.path).toBe('deberes');
        expect(card?.title).toBe('Deberes del usuario en Salud Bolívar IPS');
        expect(card?.routerLink).toBe('/guia-para-el-usuario/deberes');
        done();
      });
    });

    it('should return the correct card for asociacion path', (done) => {
      service.getInformationCardByPath('asociacion').subscribe(card => {
        expect(card).toBeDefined();
        expect(card?.id).toBe('asociacion-usuarios');
        expect(card?.path).toBe('asociacion');
        expect(card?.title).toBe('Asociación de usuarios y participación social');
        expect(card?.routerLink).toBe('/guia-para-el-usuario/asociacion');
        done();
      });
    });

    it('should return undefined when path does not exist', (done) => {
      service.getInformationCardByPath('non-existent-path').subscribe(card => {
        expect(card).toBeUndefined();
        done();
      });
    });

    it('should handle empty string path', (done) => {
      service.getInformationCardByPath('').subscribe(card => {
        expect(card).toBeUndefined();
        done();
      });
    });
  });

  describe('getInformationCardById', () => {
    it('should return the correct card when ID exists', (done) => {
      service.getInformationCardById('derechos-usuario').subscribe(card => {
        expect(card).toBeDefined();
        expect(card?.id).toBe('derechos-usuario');
        expect(card?.path).toBe('derechos');
        expect(card?.title).toBe('Derechos del usuario en Salud Bolívar IPS');
        done();
      });
    });

    it('should return the correct card for deberes-usuario ID', (done) => {
      service.getInformationCardById('deberes-usuario').subscribe(card => {
        expect(card).toBeDefined();
        expect(card?.id).toBe('deberes-usuario');
        expect(card?.path).toBe('deberes');
        expect(card?.title).toBe('Deberes del usuario en Salud Bolívar IPS');
        done();
      });
    });

    it('should return undefined when ID does not exist', (done) => {
      service.getInformationCardById('non-existent-id').subscribe(card => {
        expect(card).toBeUndefined();
        done();
      });
    });

    it('should handle empty string ID', (done) => {
      service.getInformationCardById('').subscribe(card => {
        expect(card).toBeUndefined();
        done();
      });
    });
  });
});
