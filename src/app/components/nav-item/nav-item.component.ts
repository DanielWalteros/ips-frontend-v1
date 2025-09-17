import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  @Input() routerLink!: string;
  @Input() text!: string;
  @Input() exact: boolean = false;
}
