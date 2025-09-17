import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '../../shared/models/location';

@Component({
  selector: 'app-location-card',
  imports: [RouterLink],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent {
  @Input() location!: Location;
}
