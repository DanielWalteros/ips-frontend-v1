import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../../models/document';

@Component({
  selector: 'app-document-card',
  imports: [CommonModule],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss'
})
export class DocumentCardComponent {
  @Input({ required: true }) document!: Document;

  constructor() {}

  onDownload(): void {
    if (this.document.downloadUrl && this.document.downloadUrl !== '#') {
      window.open(this.document.downloadUrl, '_blank');
    }
  }
}
