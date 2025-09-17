import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityBannerComponent } from '../../components/security-banner/security-banner.component';
import { WelcomeSectionComponent } from '../../components/welcome-section/welcome-section.component';
import { ChannelsSectionComponent } from '../../components/channels-section/channels-section.component';
import { LocationsSectionComponent } from '../../components/locations-section/locations-section.component';
import { ClientsSectionComponent } from '../../components/clients-section/clients-section.component';
import { Location } from '../../shared/models/location';
import { Client } from '../../shared/models/client';
import { Document } from '../../shared/models/document';
import { LocationsService } from '../../shared/services/locations.service';
import { DocumentsService } from '../../shared/services/documents.service';
import { ClientsService } from '../../shared/services/clients.service';
import { DocumentSectionComponent } from '../../shared/components/document-section/document-section.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SecurityBannerComponent,
    WelcomeSectionComponent,
    ChannelsSectionComponent,
    LocationsSectionComponent,
    ClientsSectionComponent,
    DocumentSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];

  // Financial reports section data
  financialTitle = 'Estados financieros e informes de gestión';
  financialSubtitle = 'Conozca todos los informes financieros de Salud Bolívar IPS y nuestra gestión:';
  financialDocuments: Document[] = [];

  constructor(
    private locationsService: LocationsService,
    private documentsService: DocumentsService,
    private clientsService: ClientsService
  ) { }

  clients: Client[] = [];

  ngOnInit(): void {
    this.locations = this.locationsService.getAllLocations();
    this.financialDocuments = this.documentsService.getFinancialDocuments();
    this.clients = this.clientsService.getAllClients();
  }
}
