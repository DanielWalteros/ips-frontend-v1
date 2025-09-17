import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Policy } from '../../shared/models/policy';

@Component({
  selector: 'app-policy-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './policy-card.component.html',
  styleUrl: './policy-card.component.scss'
})
export class PolicyCardComponent {
  @Input({ required: true }) policy!: Policy;

  constructor() {}
}
