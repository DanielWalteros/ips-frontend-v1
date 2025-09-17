import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicalUnitItemComponent } from '../../../components/medical-unit-item/medical-unit-item.component';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';

// Interfaces para los diferentes tipos de links
interface InternalLink {
  routerLink: string;
  text: string;
}

interface ExternalLink {
  href: string;
  text: string;
  target?: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule, MedicalUnitItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  locations: Location[] = [];

  // Links internos de navegación
  ipsInternalLinks: InternalLink[] = [
    { routerLink: '/nuestros-servicios', text: 'Nuestros servicios' },
    { routerLink: '/sobre-nuestra-ips', text: 'Sobre nuestra IPS' },
    { routerLink: '/guia-para-el-usuario', text: 'Guía para el usuario' }
  ];

  // Links externos de consulta
  consultationLinks: ExternalLink[] = [
    {
      href: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2024/08/16113148/Politica-tratamiento-datos-Personales-min.pdf',
      text: 'Política de Tratamiento de Datos Personales',
      target: '_blank'
    },
    {
      href: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2024/10/15082715/Codigo-Gobierno-corporativo-15Oct24.pdf',
      text: 'Código de Buen Gobierno',
      target: '_blank'
    },
    {
      href: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2024/12/23091509/Codigo-de-etica-20Dic24.pdf',
      text: 'Código de Ética',
      target: '_blank'
    }
  ];

  // Links de accesibilidad
  accessibilityLinks: ExternalLink[] = [
    {
      href: 'https://www.convertic.gov.co/',
      text: 'ConverTic',
      target: '_blank'
    },
    {
      href: 'https://mintic.gov.co/portal/vivedigital',
      text: 'Vive Digital',
      target: '_blank'
    }
  ];

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locations = this.locationsService.getAllLocations();
  }

  getDisplayName(location: Location): string {
    return this.locationsService.getFooterDisplayName(location);
  }

  getFormattedSchedule(location: Location): { weekdays: string; saturday: string } {
    return this.locationsService.getFormattedScheduleForFooter(location);
  }
}
