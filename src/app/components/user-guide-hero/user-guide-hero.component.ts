import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-guide-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-guide-hero.component.html',
  styleUrl: './user-guide-hero.component.scss'
})
export class UserGuideHeroComponent {
  heroBackgroundImage = 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/guia-para-el-usuario/98355a3b-usuarios_10000001hc0hs000065028.jpg';
}
