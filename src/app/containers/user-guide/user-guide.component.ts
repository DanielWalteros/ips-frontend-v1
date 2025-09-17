import { Component, OnInit } from '@angular/core';
import { ChannelsSectionComponent } from '../../components/channels-section/channels-section.component';
import { UserGuideHeroComponent } from '../../components/user-guide-hero/user-guide-hero.component';
import { InformationRelevantSectionComponent } from '../../components/information-relevant-section/information-relevant-section.component';
import { DocumentSectionComponent } from '../../shared/components/document-section/document-section.component';
import { Document } from '../../shared/models/document';
import { DocumentsService } from '../../shared/services/documents.service';

@Component({
  selector: 'app-user-guide',
  standalone: true,
  imports: [
    ChannelsSectionComponent,
    UserGuideHeroComponent,
    InformationRelevantSectionComponent,
    DocumentSectionComponent
  ],
  templateUrl: './user-guide.component.html',
  styleUrl: './user-guide.component.scss'
})
export class UserGuideComponent implements OnInit {

  dataManagementTitle = 'Manejo de datos';
  dataManagementDocuments: Document[] = [];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.dataManagementDocuments = this.documentsService.getDataManagementDocuments();
  }
}
