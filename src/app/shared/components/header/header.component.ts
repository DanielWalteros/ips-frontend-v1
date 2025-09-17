import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from '../../../components/nav-item/nav-item.component';
import { NavItem } from '../../models/nav-item';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NavItemComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navItems: NavItem[] = [
    { routerLink: '/', text: 'Inicio', exact: true },
    { routerLink: '/nuestros-servicios', text: 'Nuestros servicios' },
    { routerLink: '/sobre-nuestra-ips', text: 'Sobre Nuestra IPS' },
    { routerLink: '/guia-para-el-usuario', text: 'Guía para el usuario' }
  ];
}
