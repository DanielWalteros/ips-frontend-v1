import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceChannel } from '../models/service-channel';

@Injectable({
  providedIn: 'root'
})
export class ServiceChannelsService {

  private serviceChannels: ServiceChannel[] = [
    {
      id: 'telephone',
      title: 'Línea Telefónica # 322',
      description: 'Desde su celular marque <strong>{{LINK}}</strong>, opciones 1-1-4-1.',
      iconUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_101j01j01g01j001000028.png',
      iconSrcSet: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_101j01j01g01j001000028.png 1x, https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_103203202w032002000028.png 2x, https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_104l04l04c04l003000028.png 3x',
      iconDataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_101j01j01g01j001000028.png',
      iconDataSrcDesktop2x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_103203202w032002000028.png',
      iconDataSrcDesktop3x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_104l04l04c04l003000028.png',
      iconDataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_1016016014016001000028.png',
      iconDataSrcMobile2x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_102c02c02802c002000028.png',
      iconDataSrcMobile3x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/b68541b6-assesor-callcenter_103i03i03c03i003000028.png',
      linkUrl: 'tel:#322',
      linkText: '#322',
      linkTarget: '_self',
      linkType: 'tel'
    },
    {
      id: 'whatsapp',
      title: 'Chat en línea',
      description: 'Escríbanos a nuestro <strong>WhatsApp</strong>: {{LINK}}',
      iconUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_101i01j01g01j001000028.png',
      iconSrcSet: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_101i01j01g01j001000028.png 1x, https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_100000001q01t001000028.png 2x',
      iconDataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_101i01j01g01j001000028.png',
      iconDataSrcDesktop2x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_100000001q01t001000028.png',
      iconDataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_1018018016018001000028.png',
      iconDataSrcMobile2x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/d4a4ad19-whatsapp_100000001p01t001000028.png',
      linkUrl: 'https://api.whatsapp.com/send?phone=573223322322',
      linkText: '322 332 2322',
      linkTarget: '_blank',
      linkType: 'whatsapp'
    },
    {
      id: 'presencial',
      title: 'Atención presencial',
      description: 'Acercándose a la sede de su preferencia.',
      iconUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/e5b36b8d-location.svg',
      iconDataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/e5b36b8d-location.svg',
      iconDataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/e5b36b8d-location.svg',
      linkType: 'none'
    },
    {
      id: 'autoagendamiento',
      title: 'Autoagendamiento',
      description: 'Para pacientes con póliza de Salud de Seguros Bolívar: {{LINK}}.',
      iconUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_101k01j01h01j001000028.png',
      iconSrcSet: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_101k01j01h01j001000028.png 1x, https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_103403202y032002000028.png 2x, https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_104o04l04f04l003000028.png 3x',
      iconDataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_101k01j01h01j001000028.png',
      iconDataSrcDesktop2x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_103403202y032002000028.png',
      iconDataSrcDesktop3x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_104o04l04f04l003000028.png',
      iconDataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_1019018019016000000028.png',
      iconDataSrcMobile2x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_102i02g02i02c000000028.png',
      iconDataSrcMobile3x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/6a0a19c8-cita-medica-2_103r03o03r03i000000028.png',
      linkUrl: 'https://clientes.segurosbolivar.com/login',
      linkText: 'Acceso clientes',
      linkTarget: '_blank',
      linkType: 'external'
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los canales de servicio disponibles
   * @returns Observable con la lista de canales de servicio
   */
  getAllServiceChannels(): Observable<ServiceChannel[]> {
    return of([...this.serviceChannels]);
  }

  /**
   * Obtiene un canal de servicio específico por su ID
   * @param id ID del canal de servicio
   * @returns Observable con el canal de servicio o null si no se encuentra
   */
  getServiceChannelById(id: string): Observable<ServiceChannel | null> {
    const channel = this.serviceChannels.find(channel => channel.id === id);
    return of(channel || null);
  }

  /**
   * Obtiene canales de servicio filtrados por tipo de enlace
   * @param linkType Tipo de enlace a filtrar
   * @returns Observable con la lista filtrada de canales de servicio
   */
  getServiceChannelsByLinkType(linkType: string): Observable<ServiceChannel[]> {
    const filteredChannels = this.serviceChannels.filter(
      channel => channel.linkType === linkType
    );
    return of(filteredChannels);
  }
}
