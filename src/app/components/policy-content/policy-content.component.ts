import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy, PolicyContentItem } from '../../shared/models/policy';

@Component({
  selector: 'app-policy-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-content.component.html',
  styleUrl: './policy-content.component.scss'
})
export class PolicyContentComponent {
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
}
