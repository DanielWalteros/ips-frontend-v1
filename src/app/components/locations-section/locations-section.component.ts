import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from '../location-card/location-card.component';
import { Location } from '../../shared/models/location';

@Component({
  selector: 'app-locations-section',
  standalone: true,
  imports: [CommonModule, LocationCardComponent],
  templateUrl: './locations-section.component.html',
  styleUrl: './locations-section.component.scss'
})
export class LocationsSectionComponent {
  @Input() locations: Location[] = [];
}
