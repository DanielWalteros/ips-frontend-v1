import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationCard, InformationCardContentItem } from '../../shared/models/information-card';

@Component({
  selector: 'app-information-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-content.component.html',
  styleUrl: './information-content.component.scss'
})
export class InformationContentComponent {
  @Input() informationCard: InformationCard | undefined;

  /**
   * TrackBy function for content items to optimize ngFor performance
   */
  trackByContentItem(index: number, item: InformationCardContentItem): string {
    return item.id;
  }

  /**
   * Get the first half of content items for left column
   */
  getLeftContentItems(): InformationCardContentItem[] {
    if (!this.informationCard?.contentItems) {
      return [];
    }
    const midpoint = Math.ceil(this.informationCard.contentItems.length / 2);
    return this.informationCard.contentItems.slice(0, midpoint);
  }

  /**
   * Get the second half of content items for right column
   */
  getRightContentItems(): InformationCardContentItem[] {
    if (!this.informationCard?.contentItems) {
      return [];
    }
    const midpoint = Math.ceil(this.informationCard.contentItems.length / 2);
    return this.informationCard.contentItems.slice(midpoint);
  }
}
