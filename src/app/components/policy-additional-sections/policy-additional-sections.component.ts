import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy, PolicyContentItem, PolicyContentSection } from '../../shared/models/policy';

@Component({
  selector: 'app-policy-additional-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-additional-sections.component.html',
  styleUrl: './policy-additional-sections.component.scss'
})
export class PolicyAdditionalSectionsComponent {
  @Input() policy: Policy | null = null;

  /**
   * TrackBy function for content items to optimize ngFor rendering
   * @param index Index of the item
   * @param item Content item
   * @returns Unique identifier for the item
   */
  trackByContentItemId(index: number, item: PolicyContentItem): string {
    return item.id;
  }

  /**
   * TrackBy function for content sections to optimize ngFor rendering
   * @param index Index of the section
   * @param section Content section
   * @returns Unique identifier for the section
   */
  trackByContentSectionId(index: number, section: PolicyContentSection): string {
    return section.id;
  }
}
