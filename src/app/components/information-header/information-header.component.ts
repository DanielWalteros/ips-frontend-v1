import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationCard } from '../../shared/models/information-card';

@Component({
  selector: 'app-information-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-header.component.html',
  styleUrl: './information-header.component.scss'
})
export class InformationHeaderComponent {
  @Input() informationCard: InformationCard | null = null;

  /**
   * Determine if background image should be used in header
   * Returns true when there's a background image but no content items
   */
  shouldUseBackgroundInHeader(): boolean {
    return !!(
      this.informationCard?.backgroundImage && 
      (!this.informationCard?.contentItems || this.informationCard.contentItems.length === 0)
    );
  }
}
