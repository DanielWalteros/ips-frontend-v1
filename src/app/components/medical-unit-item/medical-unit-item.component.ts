import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../shared/models/location';

@Component({
  selector: 'app-medical-unit-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-unit-item.component.html',
  styleUrl: './medical-unit-item.component.scss'
})
export class MedicalUnitItemComponent {
  @Input() location!: Location;
  @Input() displayName!: string;
  @Input() formattedSchedule!: { weekdays: string; saturday: string };
}
