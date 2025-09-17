import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    component.routerLink = '/test';
    component.text = 'Test Link';
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should render nav item with correct link and text', () => {
    component.routerLink = '/test-route';
    component.text = 'Test Navigation';
    fixture.detectChanges();

    const navItem = debugElement.query(By.css('li.nav-item'));
    const link = debugElement.query(By.css('a.nav-link'));

    expect(navItem).toBeTruthy();
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Test Navigation');
  });

  it('should have correct CSS classes', () => {
    component.routerLink = '/test';
    component.text = 'Test';
    fixture.detectChanges();

    const navItem = debugElement.query(By.css('li'));
    const link = debugElement.query(By.css('a'));

    expect(navItem.nativeElement.classList.contains('nav-item')).toBeTruthy();
    expect(link.nativeElement.classList.contains('nav-link')).toBeTruthy();
    // Removed fw-semibold class as styling is now handled in header component
  });

  it('should have routerLinkActive attribute', () => {
    component.routerLink = '/test';
    component.text = 'Test';
    fixture.detectChanges();

    const link = debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('routerLinkActive')).toBe('active');
  });

  it('should set exact option when exact is true', () => {
    component.routerLink = '/';
    component.text = 'Home';
    component.exact = true;
    fixture.detectChanges();

    // Como routerLinkActiveOptions no se puede verificar directamente del DOM,
    // verificamos que el componente tenga la propiedad correcta
    expect(component.exact).toBe(true);
  });

  it('should not set exact option when exact is false', () => {
    component.routerLink = '/test';
    component.text = 'Test';
    component.exact = false;
    fixture.detectChanges();

    expect(component.exact).toBe(false);
  });

  it('should have default exact value as false', () => {
    expect(component.exact).toBe(false);
  });

  it('should update text when input changes', () => {
    component.routerLink = '/test';
    component.text = 'Initial Text';
    fixture.detectChanges();

    let link = debugElement.query(By.css('a'));
    expect(link.nativeElement.textContent.trim()).toBe('Initial Text');

    component.text = 'Updated Text';
    fixture.detectChanges();

    link = debugElement.query(By.css('a'));
    expect(link.nativeElement.textContent.trim()).toBe('Updated Text');
  });

  it('should update routerLink when input changes', () => {
    component.routerLink = '/initial';
    component.text = 'Test';
    fixture.detectChanges();

    let link = debugElement.query(By.css('a.nav-link'));
    expect(link).toBeTruthy();

    component.routerLink = '/updated';
    fixture.detectChanges();

    link = debugElement.query(By.css('a.nav-link'));
    expect(link).toBeTruthy();
    expect(component.routerLink).toBe('/updated');
  });

  it('should be accessible with proper link structure', () => {
    component.routerLink = '/accessibility-test';
    component.text = 'Accessibility Test';
    fixture.detectChanges();

    const link = debugElement.query(By.css('a.nav-link'));
    
    // Verificar que es un enlace válido
    expect(link).toBeTruthy();
    expect(link.nativeElement.tagName.toLowerCase()).toBe('a');
    
    // Verificar que tiene texto descriptivo
    expect(link.nativeElement.textContent.trim().length).toBeGreaterThan(0);
    expect(link.nativeElement.textContent.trim()).toBe('Accessibility Test');
  });
});
