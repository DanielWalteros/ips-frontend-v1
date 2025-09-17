import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsService } from '../../shared/services/locations.service';
import { Location, Specialty } from '../../shared/models/location';
import { LocationDetailComponent } from '../../components/location-detail/location-detail.component';
import { ServicesHeroComponent } from '../../components/services-hero/services-hero.component';
import { ServicesOverviewComponent } from '../../components/services-overview/services-overview.component';
import { VaccinationSectionComponent } from '../../components/vaccination-section/vaccination-section.component';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule, 
    FormsModule, 
    LocationDetailComponent,
    ServicesHeroComponent,
    ServicesOverviewComponent,
    VaccinationSectionComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  locations: Location[] = [];
  specialties: Specialty[] = [];
  filteredSpecialties: Specialty[] = [];
  
  searchTerm: string = '';
  selectedLocation: string = '';

  private specialtyDescriptions: { [key: string]: string } = {
    'medicina-general': 'Atención médica integral para el diagnóstico, tratamiento y prevención de enfermedades comunes.',
    'cardiologia': 'Especialidad médica dedicada al diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.',
    'dermatologia': 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.',
    'endocrinologia': 'Tratamiento de enfermedades del sistema endocrino, diabetes, tiroides y metabolismo.',
    'gastroenterologia': 'Especialidad enfocada en el sistema digestivo y sus trastornos.',
    'ginecologia': 'Atención integral de la salud femenina, embarazo y enfermedades ginecológicas.',
    'medicina-interna': 'Diagnóstico y tratamiento no quirúrgico de enfermedades en adultos.',
    'neurologia': 'Especialidad que trata trastornos del sistema nervioso central y periférico.',
    'oftalmologia': 'Diagnóstico y tratamiento de enfermedades de los ojos y la visión.',
    'ortopedia': 'Tratamiento de lesiones y enfermedades del sistema musculoesquelético.',
    'otorrinolaringologia': 'Especialidad que trata enfermedades del oído, nariz, garganta y estructuras relacionadas.',
    'pediatria': 'Atención médica especializada para bebés, niños y adolescentes.',
    'psicologia': 'Atención psicológica para el bienestar mental y emocional.',
    'urologia': 'Diagnóstico y tratamiento de enfermedades del sistema urinario y reproductivo masculino.',
    'medicina-estetica': 'Tratamientos estéticos no invasivos para mejorar la apariencia y bienestar.',
    'chequeos-ejecutivos': 'Evaluaciones médicas preventivas completas para ejecutivos y profesionales.'
  };

  private specialtyIcons: { [key: string]: string } = {
    'medicina-general': 'fas fa-user-md',
    'cardiologia': 'fas fa-heartbeat',
    'dermatologia': 'fas fa-hand-sparkles',
    'endocrinologia': 'fas fa-dna',
    'gastroenterologia': 'fas fa-stomach',
    'ginecologia': 'fas fa-venus',
    'medicina-interna': 'fas fa-stethoscope',
    'neurologia': 'fas fa-brain',
    'oftalmologia': 'fas fa-eye',
    'ortopedia': 'fas fa-bone',
    'otorrinolaringologia': 'fas fa-head-side-virus',
    'pediatria': 'fas fa-baby',
    'psicologia': 'fas fa-head-side-brain',
    'urologia': 'fas fa-kidneys',
    'medicina-estetica': 'fas fa-spa',
    'chequeos-ejecutivos': 'fas fa-clipboard-check'
  };

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.loadLocations();
    this.loadSpecialties();
  }

  loadLocations(): void {
    this.locationsService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  loadSpecialties(): void {
    this.locationsService.getSpecialties().subscribe(specialties => {
      this.specialties = specialties;
      this.filteredSpecialties = [...specialties];
    });
  }


  filterServices(): void {
    let filtered = [...this.specialties];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(specialty => 
        specialty.name.toLowerCase().includes(term) ||
        this.getSpecialtyDescription(specialty.id)?.toLowerCase().includes(term)
      );
    }

    // Filtrar por ubicación seleccionada
    if (this.selectedLocation) {
      filtered = filtered.filter(specialty => 
        specialty.availableAt.includes(this.selectedLocation)
      );
    }

    this.filteredSpecialties = filtered;
  }

  filterByLocation(locationId: string): void {
    this.selectedLocation = locationId;
    this.filterServices();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedLocation = '';
    this.filteredSpecialties = [...this.specialties];
  }

  getSpecialtyIcon(specialtyId: string): string {
    return this.specialtyIcons[specialtyId] || 'fas fa-stethoscope';
  }

  getSpecialtyDescription(specialtyId: string): string {
    return this.specialtyDescriptions[specialtyId] || '';
  }

  getAvailableLocationsCount(specialty: Specialty): number {
    return specialty.availableAt.length;
  }

  isLocationPremium(locationId: string): boolean {
    const location = this.locations.find(loc => loc.id === locationId);
    return location?.isPremium || false;
  }

  isSpecialtyPremium(specialty: Specialty): boolean {
    return specialty.availableAt.some(locationId => this.isLocationPremium(locationId));
  }

  trackBySpecialtyId(index: number, specialty: Specialty): string {
    return specialty.id;
  }

  trackByLocationId(index: number, location: Location): string {
    return location.id;
  }
}
