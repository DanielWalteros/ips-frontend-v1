import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Policy, PolicyContentItem, PolicyContentSection } from '../models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private readonly policies: Policy[] = [
    {
      id: 'quality-policy',
      path: 'politica-de-calidad',
      title: 'Política de calidad',
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/6532e169-escudo-salud.svg',
      routerLink: '/sobre-nuestra-ips/politica-de-calidad',
      imageAlt: 'Política de calidad',
      dataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/6532e169-escudo-salud.svg',
      dataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/6532e169-escudo-salud.svg',
      heroTitle: 'Direccionamiento y Gerencia',
      heroBackgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/politica-de-calidad/9b4270f5-blur-hospital_100000000000000000001o.jpg',
      subtitle: 'Planeación Estratégica',
      code: 'DG-PE-010',
      version: '002',
      revisionDate: 'Enero 2021',
      contentTitle: 'Política de Calidad',
      contentDescription: 'En Salud Bolívar IPS estamos comprometidos con una atención de salud accesible, oportuna, pertinente, segura, humanizada y orientada a cumplir estándares nacionales de calidad que beneficien al paciente y su familia, ejecutando estrategias orientadas al mejoramiento continuo.',
      contentIntroText: 'Para asumir este compromiso realizamos mejora continua a través de:',
      contentItems: [
        {
          id: 'human-team',
          title: 'Equipo Humano:',
          description: 'Idóneo, amable, comprometido, y fortalecido en cultura de Seguridad del Paciente'
        },
        {
          id: 'environment',
          title: 'Ambiente:',
          description: 'Con desarrollo de un clima organizacional amigable, disciplinado y respetuoso'
        },
        {
          id: 'infrastructure',
          title: 'Infraestructura:',
          description: 'Áreas y ambientes confortables y seguros.'
        }
      ]
    },
    {
      id: 'humanization-policy',
      path: 'politica-de-humanizacion',
      title: 'Política de humanización',
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/ac3dd389-acompanamiento.svg',
      routerLink: '/sobre-nuestra-ips/politica-de-humanizacion',
      imageAlt: 'Política de humanización',
      dataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/ac3dd389-acompanamiento.svg',
      dataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/ac3dd389-acompanamiento.svg',
      heroTitle: 'Direccionamiento y Gerencia',
      heroBackgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/politica-de-humanizacion/3653f871-hm_100000000000000000001o.jpg',
      subtitle: 'Planeación Estratégica',
      code: 'DG-PE-013',
      version: '002',
      revisionDate: 'Enero 2021',
      contentTitle: 'Humanizando el cuidado de las personas',
      contentDescription: 'Nuestro Programa promueve la humanización como eje transversal de todos los procesos, administrativos y de salud, además fortalece la cultura institucional en la práctica de principios y valores.',
      contentItems: []
    },
    {
      id: 'environmental-policy',
      path: 'politica-ambiental',
      title: 'Política ambiental',
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/f96dbd91-frame-3023.svg',
      routerLink: '/sobre-nuestra-ips/politica-ambiental',
      imageAlt: 'Política ambiental',
      dataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/f96dbd91-frame-3023.svg',
      dataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/f96dbd91-frame-3023.svg',
      heroTitle: 'Direccionamiento y Gerencia',
      heroBackgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/politica-ambiental/14ec72d6-beautiful-mountain-penas-de-aya-town-oiartzun-gipuzkoa-spain_11hc0zk00000000000001o.jpg',
      subtitle: 'Planeación Estratégica',
      code: 'DG-PE-011',
      version: '001',
      revisionDate: 'Enero 2021',
      contentTitle: 'Política Ambiental',
      contentDescription: 'En Salud Bolívar IPS estamos comprometidos con el cuidado de los recursos naturales, la prevención de la contaminación, la adaptación y mitigación del cambio climático a través de la identificación, evaluación y seguimiento de los aspectos e impactos ambientales a través del desarrollo e innovación de soluciones ambientalmente amigables que promueven el compromiso y uso eficiente de los recursos y su disponibilidad para las generaciones futuras.',
      contentIntroText: 'Queremos también:',
      contentItems: [
        {
          id: 'environment-law',
          description: 'Dar cumplimiento a la normativa ambiental con los requisitos legales vigentes y demás directrices de autoridades ambientales, sanitarias, entes de control y en especial con la gestión integral de residuos generados en atención en salud y el tratamiento de aguas residuales, adoptando para ello modelos proactivos de gestión ambiental, generando responsabilidad social empresarial en el desarrollo de sus actividades orientados a todos los grupos de interés.'
        },
        {
          id: 'pgirasa',
          description: 'Dar cumplimiento al Plan de Gestión Integral de Residuos Generados en Atención en Salud y Otras Actividades (PGIRASA) de la institución.'
        }
      ]
    },
    {
      id: 'patient-safety-policy',
      path: 'politica-de-seguridad-de-paciente',
      title: 'Política de seguridad del paciente',
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/f233c293-frame-3022.svg',
      routerLink: '/sobre-nuestra-ips/politica-de-seguridad-de-paciente',
      imageAlt: 'Política de seguridad del paciente',
      dataSrcDesktop1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/f233c293-frame-3022.svg',
      dataSrcMobile1x: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/sobre-nuestra-ips/f233c293-frame-3022.svg',
      heroTitle: 'Direccionamiento y Gerencia',
      heroBackgroundImage: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/politica-de-seguridad-de-paciente/1f90ac4d-beautiful-young-doctor-is-wearing-mask-while-touch-her-glasses-with-rubber-gloves-gray-wall_100000000000000000001o.jpg',
      subtitle: 'Planeación Estratégica',
      code: 'DG-PE-012',
      version: '002',
      revisionDate: 'Enero 2021',
      contentTitle: 'Política de Seguridad del Paciente',
      contentDescription: 'Brindar a nuestros usuarios reales y potenciales una atención segura, con un recurso humano capacitado, entrenado y comprometido en la prestación de servicios de salud seguros con enfoque en el control de riesgo.',
      contentIntroText: 'Nuestra Política tal como lo direcciona el Ministerio de Salud y Protección Social, es una declaración que se encuentra transversal en los cuatro componentes del Sistema:',
      listStyle: 'traditional',
      contentItems: [
        {
          id: 'unique-habilitation-system',
          description: 'Sistema Único de Habilitación - Resolución 3100 del 2019.'
        },
        {
          id: 'pamec-audit',
          description: 'Auditoría para el Mejoramiento de la Calidad de la Atención en Salud PAMEC.'
        },
        {
          id: 'superior-standards',
          description: 'Estándares superiores de calidad del Sistema único de Acreditación.'
        },
        {
          id: 'information-system',
          description: 'Sistema de Información para la Calidad – Resolución 256 del 2016.'
        }
      ],
      contentSections: [
        {
          id: 'sogc-characteristics',
          introText: 'Igualmente, esta Política adhiere el cumplimiento de las características del SOGC establecidas en el Decreto 780 de 2016 y definidas a través de nuestros indicadores a saber:',
          items: [
            {
              id: 'continuity',
              description: 'Continuidad'
            },
            {
              id: 'opportunity',
              description: 'Oportunidad'
            },
            {
              id: 'pertinence',
              description: 'Pertinencia'
            },
            {
              id: 'accessibility',
              description: 'Accesibilidad'
            },
            {
              id: 'security',
              description: 'Seguridad'
            }
          ]
        }
      ]
    }
  ];

  constructor() { }

  /**
   * Obtiene todas las políticas institucionales
   * @returns Observable con el array de políticas
   */
  getAllPolicies(): Observable<Policy[]> {
    return of(this.policies);
  }

  /**
   * Obtiene una política específica por su path
   * @param path Path de la política (ej: 'politica-de-calidad')
   * @returns Observable con la política encontrada o undefined
   */
  getPolicyByPath(path: string): Observable<Policy | undefined> {
    const policy = this.policies.find(p => p.path === path);
    return of(policy);
  }

  /**
   * Obtiene una política específica por su ID
   * @param id ID de la política (ej: 'quality-policy')
   * @returns Observable con la política encontrada o undefined
   */
  getPolicyById(id: string): Observable<Policy | undefined> {
    const policy = this.policies.find(p => p.id === id);
    return of(policy);
  }

  /**
   * Verifica si existe una política con el path dado
   * @param path Path de la política
   * @returns Observable con boolean indicando si existe
   */
  policyExists(path: string): Observable<boolean> {
    const exists = this.policies.some(p => p.path === path);
    return of(exists);
  }
}
