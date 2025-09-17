import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentSectionComponent } from '../../shared/components/document-section/document-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { AboutUsSectionComponent } from '../../components/about-us-section/about-us-section.component';
import { MissionVisionSectionComponent } from '../../components/mission-vision-section/mission-vision-section.component';
import { PrinciplesValuesSectionComponent } from '../../components/principles-values-section/principles-values-section.component';
import { InstitutionalPoliciesSectionComponent } from '../../components/institutional-policies-section/institutional-policies-section.component';
import { Document } from '../../shared/models/document';
import { DocumentsService } from '../../shared/services/documents.service';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule, 
    DocumentSectionComponent,
    HeroSectionComponent,
    AboutUsSectionComponent,
    MissionVisionSectionComponent,
    PrinciplesValuesSectionComponent,
    InstitutionalPoliciesSectionComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  // Transparency section data
  transparencyTitle = 'Ruta hacia la Transparencia';
  transparencySubtitle = 'Conozca cómo en Bolívar Salud IPS estamos comprometidos con la transparencia y la ética:';
  transparencyDocuments: Document[] = [];

  // Epidemiological bulletin section data
  epidemiologicalTitle = 'Boletín Epidemiológico';
  epidemiologicalSubtitle = 'Aquí podrá mantenerse informado sobre las últimas tendencias y datos relevantes en salud pública.<br>En cada edición, compartiremos estadísticas, análisis de brotes, recomendaciones de salud y recursos útiles para que logre tomar decisiones fundamentadas.';
  epidemiologicalDocuments: Document[] = [];

  // Financial reports section data
  financialTitle = 'Estados financieros e informes de gestión';
  financialSubtitle = 'Conozca todos los informes financieros de Salud Bolívar IPS y nuestra gestión:';
  financialDocuments: Document[] = [];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.transparencyDocuments = this.documentsService.getTransparencyDocuments();
    this.epidemiologicalDocuments = this.documentsService.getEpidemiologicalBulletins();
    this.financialDocuments = this.documentsService.getFinancialDocuments();
  }
}
