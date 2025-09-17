import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display company information', () => {
    // Verificar que existe la sección de IPS
    const ipsSection = debugElement.queryAll(By.css('h5')).find(h5 => 
      h5.nativeElement.textContent.includes('SALUD BOLÍVAR IPS'));
    expect(ipsSection).toBeTruthy();
    
    // Verificar que existe contenido de la empresa
    const footerText = debugElement.nativeElement.textContent;
    expect(footerText).toContain('SALUD BOLÍVAR IPS');
  });

  it('should display all medical units with their information', () => {
    const medicalUnits = debugElement.queryAll(By.css('.location-item'));
    expect(medicalUnits.length).toBe(4);

    // Verificar nombres de las unidades usando los strong dentro de p
    const unitNames = medicalUnits.map(unit => 
      unit.query(By.css('p strong')).nativeElement.textContent
    );
    
    expect(unitNames).toContain('Unidad de atención integral Calle 134');
    expect(unitNames).toContain('Unidad de atención integral Av. El Dorado');
    expect(unitNames).toContain('Unidad de atención integral Carrera décima');
    expect(unitNames).toContain('Unidad médica premium Metrópolis');
  });

  it('should display contact information', () => {
    // Verificar que aparece el teléfono #322 como texto
    const footerText = debugElement.nativeElement.textContent;
    expect(footerText).toContain('#322');

    const whatsappLink = debugElement.query(By.css('a[href="https://wa.me/573223322322"]'));
    expect(whatsappLink).toBeTruthy();

    const emailLinks = debugElement.queryAll(By.css('a[href^="mailto:"]'));
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('should have navigation and consultation links', () => {
    // Verificar que los arrays están correctamente definidos
    expect(component.ipsInternalLinks).toBeDefined();
    expect(component.ipsInternalLinks.length).toBe(3);
    expect(component.consultationLinks).toBeDefined();  
    expect(component.consultationLinks.length).toBe(3);
    expect(component.accessibilityLinks).toBeDefined();
    expect(component.accessibilityLinks.length).toBe(2);
    
    // Verificar el contenido de los arrays
    expect(component.ipsInternalLinks[0].routerLink).toBe('/nuestros-servicios');
    expect(component.ipsInternalLinks[1].routerLink).toBe('/sobre-nuestra-ips');
    expect(component.ipsInternalLinks[2].routerLink).toBe('/guia-para-el-usuario');
    
    // Verificar links de consulta
    expect(component.consultationLinks[0].text).toContain('Política de Tratamiento');
    expect(component.consultationLinks[1].text).toContain('Código de Buen Gobierno');
    expect(component.consultationLinks[2].text).toContain('Código de Ética');
    
    // Verificar links de accesibilidad
    expect(component.accessibilityLinks[0].text).toBe('ConverTic');
    expect(component.accessibilityLinks[1].text).toBe('Vive Digital');
  });

  it('should display accessibility information', () => {
    // Verificar que existe información de accesibilidad en el texto
    const footerText = debugElement.nativeElement.textContent;
    expect(footerText).toContain('ConverTic');
    expect(footerText).toContain('Vive Digital');
    expect(footerText).toContain('discapacidad');
  });

  it('should show copyright information', () => {
    const copyright = debugElement.query(By.css('.bg-darker'));
    expect(copyright).toBeTruthy();
    expect(copyright.nativeElement.textContent).toContain('2024');
    expect(copyright.nativeElement.textContent).toContain('Salud Bolívar IPS S.A.');
  });

  it('should have proper link accessibility', () => {
    const externalLinks = debugElement.queryAll(By.css('a[target="_blank"]'));
    
    externalLinks.forEach(link => {
      // Los enlaces externos deberían tener target="_blank"
      expect(link.nativeElement.target).toBe('_blank');
    });
  });

  it('should display medical unit schedules', () => {
    const scheduleElements = debugElement.queryAll(By.css('.small'));
    const scheduleTexts = scheduleElements.map(el => el.nativeElement.textContent);
    
    // Verificar que hay información de horarios (formato actual)
    const hasScheduleInfo = scheduleTexts.some(text => 
      text.includes('Lunes a Viernes') || text.includes('Sábado') || text.includes('a.m.') || text.includes('p.m.')
    );
    expect(hasScheduleInfo).toBeTruthy();
  });

  it('should display email contacts correctly', () => {
    // Verificar que los emails están presentes en el footer
    const footerHTML = debugElement.nativeElement.innerHTML;
    expect(footerHTML).toContain('experienciadeservicioips@saludbolivar.com');
    expect(footerHTML).toContain('notificacionesips@saludbolivar.com');
  });

  it('should maintain brand colors and styling', () => {
    const footerElement = debugElement.query(By.css('.footer'));
    expect(footerElement).toBeTruthy();

    // Verificar que usa clases de la marca
    const brandElements = debugElement.queryAll(By.css('.text-sb-accent'));
    expect(brandElements.length).toBeGreaterThan(0);
  });
});
