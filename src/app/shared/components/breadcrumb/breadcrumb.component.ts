import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbConfig, BreadcrumbItem } from '../../../shared/models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() breadcrumbConfig: BreadcrumbConfig | null = null;

  /**
   * TrackBy function for breadcrumb items to optimize ngFor performance
   */
  trackByItemLabel(index: number, item: BreadcrumbItem): string {
    return item.label;
  }
}
