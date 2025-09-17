import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location, Specialty } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [
    {
      id: 'el-dorado',
      name: 'Unidad de Atención Integral Avenida El Dorado',
      address: 'Avenida El Dorado # 68C-61',
      fullAddress: 'Avenida El Dorado # 68C-61<br>Torre Central Davivienda, piso 7',
      building: 'Torre Central Davivienda',
      floor: 'Piso 7',
      office: 'Oficina 704',
      schedule: {
        weekdays: '7:00 a. m. a 7:00 p. m.',
        saturday: '7:00 a. m. a 1:00 p. m.',
        sunday: 'Cerrado'
      },
      services: ['Medicina General', 'Especialidades'],
      detailedServices: {
        consultations: [
          'Medicina general.',
          'Enfermería.',
          'Pediatría.',
          'Ginecobstetricia.',
          'Medicina interna.',
          'Urología.',
          'Dermatología.',
          'Medicina física y del deporte.',
          'Neurología.',
          'Endocrinología',
          'Ortopedia y traumatología.',
          'Ortopedia de pie.',
          'Otorrinolaringología.',
          'Psiquiatría.',
          'Psicología - Psicoterapia.',
          'Nutrición y Dietética.'
        ],
        otherServices: [
          'Vacunación no PAI.',
          'Toma de muestras de laboratorio clínico.',
          'Ecografías – Doppler.',
          'Toma de EKG.',
          'Procedimientos menores de Ortopedia y Neurología.'
        ],
        newServices: [
          'Ecografías',
          'Doppler',
          'Dúplex'
        ]
      },
      contact: {
        phone: '#322',
        email: 'experienciadeservicioips@saludbolivar.com'
      },
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/510dc4d9-calle26_10cn09f04v08c00000201o.jpg',
      isPremium: false
    },
    {
      id: 'calle-134',
      name: 'Unidad de Atención Integral Calle 134',
      address: 'Calle 134 # 7B - 83',
      fullAddress: 'Calle 134 # 7B - 83<br>Edificio El Bosque, piso 5, oficina 513',
      building: 'Edificio El Bosque',
      floor: 'Piso 5',
      office: 'Oficina 513',
      schedule: {
        weekdays: '6:30 a. m. a 7:00 p. m.',
        saturday: '7:00 a. m. a 1:00 p. m.',
        sunday: 'Cerrado'
      },
      services: ['Medicina General', 'Especialidades'],
      detailedServices: {
        consultations: [
          'Medicina general.',
          'Medicina familiar.',
          'Pediatría.',
          'Ginecobstetricia.',
          'Medicina interna.',
          'Cardiología.',
          'Otorrinolaringología.',
          'Cirugía plástica.',
          'Urología.',
          'Dermatología.',
          'Deportología.',
          'Neurología.',
          'Cirugía general.',
          'Endocrinología.',
          'Fisiatría.',
          'Gastroenterología.',
          'Ortopedia y traumatología.',
          'Ortopedia de pie.',
          'Ortopedia de columna.',
          'Oftalmología.',
          'Psiquiatría.',
          'Nutrición y dietética.',
          'Optometría.',
          'Psicología - Psicoterapia.',
          'Enfermería.',
          'Medicina física y del deporte.',
          'Dolor y cuidados paliativos.'
        ],
        otherServices: [
          'Vacunación no PAI.',
          'Ecografías - Doppler - Dúplex.',
          'Electromiografías - Neuroconducciones.',
          'Toma de EKG.',
          'Toma de muestras de laboratorio clínico.',
          'Procedimientos quirúrgicos menores de Dermatología, Ortopedia y Neurología.'
        ],
        newServices: [
          'Ecocardiograma.',
          'Holter y MAPA.'
        ]
      },
      contact: {
        phone: '#322',
        email: 'experienciadeservicioips@saludbolivar.com'
      },
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/84176e6d-3_10bo08o05008c00700001o.jpg',
      isPremium: false
    },
    {
      id: 'carrera-decima',
      name: 'Unidad de Atención Integral Carrera Décima',
      address: 'Carrera 10 # 16 -39',
      fullAddress: 'Carrera 10 # 16 -39<br>Edificio Seguros Bolívar - Mezzanine. Torre Seguros Bolívar',
      building: 'Edificio Seguros Bolívar',
      floor: 'Mezzanine',
      office: 'Torre Seguros Bolívar',
      schedule: {
        weekdays: '6:30 a. m. a 5:00 p. m.',
        saturday: '7:00 a. m. a 1:00 p. m.',
        sunday: 'Cerrado'
      },
      services: ['Medicina General', 'Especialidades'],
      detailedServices: {
        consultations: [
          'Medicina general.',
          'Enfermería.',
          'Pediatría.',
          'Ginecobstetricia.',
          'Medicina familiar.',
          'Dermatología.',
          'Psiquiatría.',
          'Ortopedia y Traumatología.',
          'Medicina del trabajo y Medicina laboral.',
          'Medicina física y rehabilitación.',
          'Cirugía de mano - Codo.',
          'Cirugía plástica y estética.',
          'Ortopedia de hombro.',
          'Ortopedia de columna.',
          'Ortopedia de cadera.',
          'Ortopedia de rodilla.',
          'Ortopedia de pie.',
          'Medicina de dolor y cuidados paliativos.',
          'Nutrición y dietética.',
          'Optometría.',
          'Psicología - Psicoterapia.'
        ],
        otherServices: [
          'Vacunación no PAI.',
          'Toma de muestras de laboratorio clínico.',
          'Procedimientos menores de dermatología y ortopedia.',
          'Toma de EKG.',
          'Ecografías - Doppler - sábados a.m.',
          'Electromiografías - Neuroconducciones.'
        ],
        additionalSections: [
          {
            title: 'Rehabilitación',
            services: [
              'Terapia física, ocupacional y cognitiva.'
            ]
          }
        ]
      },
      contact: {
        phone: '#322',
        email: 'experienciadeservicioips@saludbolivar.com'
      },
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/2a1a2c8a-4_106i09m04v08c00101401o.jpg',
      isPremium: false
    },
    {
      id: 'metropolis',
      name: 'Unidad médica premium Metrópolis',
      address: 'Avenida Carrera 68 # 75A-50',
      fullAddress: 'Avenida Carrera 68 # 75A-50<br>C. C Metrópolis, Piso 1',
      building: 'C. C Metrópolis',
      floor: 'Primer Piso',
      schedule: {
        weekdays: '6:30 a. m. a 7:00 p. m.',
        saturday: '7:00 a. m. a 1:00 p. m.',
        sunday: 'Cerrado'
      },
      services: ['Medicina General', 'Especialidades Premium'],
      detailedServices: {
        consultations: [
          'Medicina general.',
          'Enfermería.',
          'Medicina familiar.',
          'Pediatría.',
          'Ginecobstetricia.',
          'Medicina interna.',
          'Dermatología.',
          'Cirugía plástica.',
          'Cirugía general estética.',
          'Oftalmología.',
          'Dermatología.',
          'Neurología.',
          'Cirugía general.',
          'Endocrinología.',
          'Reumatología.',
          'Medicina alternativa y complementaria.',
          'Ortopedia y Traumatología.',
          'Medicina alternativa y complementaria (homeopática tradicional china, naturopatía y neural terapéutica).',
          'Optometría.',
          'Ortopedia de mano y codo.',
          'Ortopedia de pie.',
          'Ortopedia de hombro.',
          'Medicina de dolor.',
          'Medicina física y del deporte.',
          'Nutrición y dietética.',
          'Psicología - Psicoterapia.',
          'Dolor y cuidados Paliativos.',
          'Gastroenterología.'
        ],
        otherServices: [
          'Sala de Procedimientos Menores.',
          'Vacunación.',
          'Complementaria (no PAI).'
        ],
        additionalSections: [
          {
            title: 'Rehabilitación',
            services: [
              'Terapia Física, Ocupacional y Cognitiva.'
            ]
          },
          {
            title: 'Imágenes Diagnósticas',
            services: [
              'Doppler.',
              'Ecografía.',
              'Ecocardiografía.',
              'Holter.',
              'Ultrasonografía.',
              'Rayos X.',
              'Tomografía.'
            ],
            isNew: true
          }
        ]
      },
      contact: {
        phone: '#322',
        email: 'experienciadeservicioips@saludbolivar.com'
      },
      imageUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/2affc751-captura-de-pantalla-2024-09-11-a-las-8-18-15p-m-_10ew08e04v08b00b003028.png',
      isPremium: true
    }
  ];

  constructor() { }

  /**
   * Obtiene todas las ubicaciones
   */
  getAllLocations(): Location[] {
    return [...this.locations];
  }

  /**
   * Obtiene una ubicación por ID
   */
  getLocationById(id: string): Location | undefined {
    return this.locations.find(location => location.id === id);
  }

  /**
   * Obtiene ubicaciones premium
   */
  getPremiumLocations(): Location[] {
    return this.locations.filter(location => location.isPremium);
  }

  /**
   * Obtiene ubicaciones regulares (no premium)
   */
  getRegularLocations(): Location[] {
    return this.locations.filter(location => !location.isPremium);
  }

  /**
   * Obtiene el nombre simplificado para mostrar en footer
   */
  getFooterDisplayName(location: Location): string {
    // Convertir nombres largos a versiones más cortas para el footer
    const nameMap: { [key: string]: string } = {
      'Unidad de Atención Integral Avenida El Dorado': 'Unidad de atención integral Av. El Dorado',
      'Unidad de Atención Integral Calle 134': 'Unidad de atención integral Calle 134',
      'Unidad de Atención Integral Carrera Décima': 'Unidad de atención integral Carrera décima',
      'Unidad Médica Premium Metrópolis': 'Unidad médica premium Metrópolis'
    };
    
    return nameMap[location.name] || location.name;
  }

  /**
   * Formatea los horarios para mostrar en el footer
   */
  getFormattedScheduleForFooter(location: Location): { weekdays: string; saturday: string } {
    return {
      weekdays: `Lunes a Viernes ${location.schedule.weekdays}`,
      saturday: `Sábado ${location.schedule.saturday}`
    };
  }

  /**
   * Obtiene ubicaciones como Observable (para compatibilidad con componentes existentes)
   */
  getLocations(): Observable<Location[]> {
    return of(this.getAllLocations());
  }

  /**
   * Obtiene especialidades disponibles como Observable (para compatibilidad con componentes existentes)
   */
  getSpecialties(): Observable<Specialty[]> {
    const specialtyMap = new Map<string, Set<string>>();
    
    // Mapear especialidades a las ubicaciones donde están disponibles
    this.locations.forEach(location => {
      location.services.forEach(service => {
        if (!specialtyMap.has(service)) {
          specialtyMap.set(service, new Set<string>());
        }
        specialtyMap.get(service)!.add(location.id);
      });
    });
    
    // Convertir a array de Specialty
    const specialties: Specialty[] = Array.from(specialtyMap.entries()).map(([name, locationIds], index) => ({
      id: `specialty-${index + 1}`,
      name: name,
      description: this.getSpecialtyDescription(name),
      availableAt: Array.from(locationIds)
    }));
    
    return of(specialties);
  }

  /**
   * Genera la URL del mapa de Google Maps para una ubicación usando la dirección
   */
  getMapUrl(location: Location): string {
    // Crear la consulta de búsqueda completa con dirección, edificio y ciudad
    let searchQuery = location.address;
    
    if (location.building) {
      searchQuery += `, ${location.building}`;
    }
    
    searchQuery += ', Bogotá, Colombia';
    
    // Usar Google Maps embed sin API key
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://maps.google.com/maps?q=${encodedQuery}&output=embed`;
  }

  /**
   * Obtiene la descripción de una especialidad
   */
  private getSpecialtyDescription(specialtyName: string): string {
    const descriptions: { [key: string]: string } = {
      'Medicina General': 'Atención médica integral para consultas generales y seguimiento de salud.',
      'Especialidades': 'Atención médica especializada en diversas áreas de la salud.',
      'Especialidades Premium': 'Atención médica especializada premium con servicios diferenciados.'
    };
    
    return descriptions[specialtyName] || `Servicios de ${specialtyName.toLowerCase()}.`;
  }
}
