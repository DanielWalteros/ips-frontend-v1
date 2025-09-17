import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy } from '../../shared/models/policy';

@Component({
  selector: 'app-policy-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-hero.component.html',
  styleUrl: './policy-hero.component.scss'
})
export class PolicyHeroComponent {
  @Input() policy: Policy | null = null;
}
