import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCardComponent } from '../document-card/document-card.component';
import { Document } from '../../models/document';

@Component({
  selector: 'app-document-section',
  standalone: true,
  imports: [CommonModule, DocumentCardComponent],
  templateUrl: './document-section.component.html',
  styleUrl: './document-section.component.scss'
})
export class DocumentSectionComponent {
  @Input() title: string = '';
  @Input() subtitle: string|null = null;
  @Input() documents: Document[] = [];
  @Input() allowHtmlInSubtitle: boolean = false;
  @Input() variant: 'default' | 'financial' = 'default';

  constructor() {}

  /**
   * TrackBy function for documents to optimize ngFor performance
   */
  trackByDocumentId(index: number, document: Document): string {
    return document.id;
  }

  /**
   * Get CSS classes for the section based on variant
   */
  getSectionClasses(): string {
    return this.variant === 'financial' ? 'financial-reports-section' : '';
  }

  /**
   * Get CSS classes for the title based on variant
   */
  getTitleClasses(): string {
    return this.variant === 'financial' ? 'financial-title' : 'document-title';
  }

  /**
   * Get CSS classes for the subtitle based on variant
   */
  getSubtitleClasses(): string {
    return this.variant === 'financial' ? 'financial-subtitle' : 'document-subtitle';
  }
}
