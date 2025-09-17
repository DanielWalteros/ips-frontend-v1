import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLogoComponent } from '../client-logo/client-logo.component';
import { Client } from '../../shared/models/client';

@Component({
  selector: 'app-clients-section',
  standalone: true,
  imports: [CommonModule, ClientLogoComponent],
  templateUrl: './clients-section.component.html',
  styleUrl: './clients-section.component.scss'
})
export class ClientsSectionComponent {
  @Input() clients: Client[] = [];
}
