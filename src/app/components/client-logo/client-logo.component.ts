import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../shared/models/client';

@Component({
  selector: 'app-client-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-logo.component.html',
  styleUrl: './client-logo.component.scss'
})
export class ClientLogoComponent {
  @Input() client!: Client;
}
