import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { NavItemComponent } from '../../../components/nav-item/nav-item.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        NavItemComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navItems array with correct navigation items', () => {
    expect(component.navItems).toBeDefined();
    expect(component.navItems.length).toBe(4);
    
    expect(component.navItems[0]).toEqual({ routerLink: '/', text: 'Inicio', exact: true });
    expect(component.navItems[1]).toEqual({ routerLink: '/nuestros-servicios', text: 'Nuestros servicios' });
    expect(component.navItems[2]).toEqual({ routerLink: '/sobre-nuestra-ips', text: 'Sobre Nuestra IPS' });
    expect(component.navItems[3]).toEqual({ routerLink: '/guia-para-el-usuario', text: 'Guía para el usuario' });
  });

  it('should render NavItemComponent for each navigation item', () => {
    const navItemComponents = debugElement.queryAll(By.directive(NavItemComponent));
    expect(navItemComponents.length).toBe(4);
  });

  it('should pass correct props to NavItemComponents', () => {
    const navItemComponents = debugElement.queryAll(By.directive(NavItemComponent));
    
    // Verificar primer item (Inicio con exact: true)
    const homeNavItem = navItemComponents[0].componentInstance;
    expect(homeNavItem.routerLink).toBe('/');
    expect(homeNavItem.text).toBe('Inicio');
    expect(homeNavItem.exact).toBe(true);
    
    // Verificar segundo item (Nuestros servicios)
    const servicesNavItem = navItemComponents[1].componentInstance;
    expect(servicesNavItem.routerLink).toBe('/nuestros-servicios');
    expect(servicesNavItem.text).toBe('Nuestros servicios');
    expect(servicesNavItem.exact).toBe(false);
    
    // Verificar tercer item (Sobre Nuestra IPS)
    const aboutNavItem = navItemComponents[2].componentInstance;
    expect(aboutNavItem.routerLink).toBe('/sobre-nuestra-ips');
    expect(aboutNavItem.text).toBe('Sobre Nuestra IPS');
    expect(aboutNavItem.exact).toBe(false);
    
    // Verificar cuarto item (Guía para el usuario)
    const guideNavItem = navItemComponents[3].componentInstance;
    expect(guideNavItem.routerLink).toBe('/guia-para-el-usuario');
    expect(guideNavItem.text).toBe('Guía para el usuario');
    expect(guideNavItem.exact).toBe(false);
  });

  it('should render the logo', () => {
    const logoElement = debugElement.query(By.css('.logo'));
    expect(logoElement).toBeTruthy();
    expect(logoElement.nativeElement.alt).toContain('Salud Bolívar IPS');
  });

  it('should contain navigation links', () => {
    const navLinks = debugElement.queryAll(By.css('.navbar-nav .nav-link'));
    expect(navLinks.length).toBe(4);
    
    // Verificar que existen los links principales del header actual
    const linkTexts = navLinks.map(link => link.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Inicio');
    expect(linkTexts).toContain('Nuestros servicios');
    expect(linkTexts).toContain('Sobre Nuestra IPS');
    expect(linkTexts).toContain('Guía para el usuario');
  });

  it('should have navbar brand with logo', () => {
    const navbarBrand = debugElement.query(By.css('.navbar-brand'));
    expect(navbarBrand).toBeTruthy();
    expect(navbarBrand.nativeElement.getAttribute('routerLink')).toBe('/');
    
    const logo = navbarBrand.query(By.css('.logo'));
    expect(logo).toBeTruthy();
  });

  it('should have fixed header with proper styling', () => {
    const header = debugElement.query(By.css('header.navbar'));
    expect(header).toBeTruthy();
    expect(header.nativeElement.classList).toContain('fixed-top');
    expect(header.nativeElement.classList).toContain('navbar-expand-lg');
    
    const container = header.query(By.css('.container'));
    expect(container).toBeTruthy();
  });

  it('should have navigation links with correct routing', () => {
    // Verificar que se renderizan los NavItemComponents con las rutas correctas
    const navItemComponents = debugElement.queryAll(By.directive(NavItemComponent));
    const routerLinks = navItemComponents.map(navItem => navItem.componentInstance.routerLink);
    
    expect(routerLinks).toContain('/');
    expect(routerLinks).toContain('/nuestros-servicios');
    expect(routerLinks).toContain('/sobre-nuestra-ips');
    expect(routerLinks).toContain('/guia-para-el-usuario');
  });

  it('should be responsive and have mobile menu trigger', () => {
    const mobileMenuButton = debugElement.query(By.css('.navbar-toggler'));
    expect(mobileMenuButton).toBeTruthy();
  });

  it('should have proper accessibility attributes', () => {
    const navbar = debugElement.query(By.css('header.navbar'));
    expect(navbar).toBeTruthy();

    const logo = debugElement.query(By.css('.logo'));
    expect(logo.nativeElement.alt).toBeDefined();
    expect(logo.nativeElement.alt.length).toBeGreaterThan(0);
  });

  it('should maintain brand consistency', () => {
    const headerElement = debugElement.query(By.css('.container'));
    expect(headerElement).toBeTruthy();

    // Verificar que usa Bootstrap y estructura de marca
    const navbar = debugElement.query(By.css('.navbar'));
    const navbarBrand = debugElement.query(By.css('.navbar-brand'));
    const navbarNav = debugElement.query(By.css('.navbar-nav'));
    
    expect(navbar).toBeTruthy();
    expect(navbarBrand).toBeTruthy();
    expect(navbarNav).toBeTruthy();
  });
});
