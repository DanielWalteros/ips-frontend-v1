import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { VaccinationSectionComponent } from './vaccination-section.component';

describe('VaccinationSectionComponent', () => {
  let component: VaccinationSectionComponent;
  let fixture: ComponentFixture<VaccinationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, VaccinationSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component correctly', () => {
    expect(component).toBeInstanceOf(VaccinationSectionComponent);
  });

  it('should have constructor defined', () => {
    expect(component.constructor).toBeDefined();
  });

  it('should render vaccination section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar que la sección vaccination existe
    const vaccinationSection = compiled.querySelector('.vaccination-section');
    expect(vaccinationSection).toBeTruthy();
  });

  it('should have vaccination background and overlay', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const vaccinationBackground = compiled.querySelector('.vaccination-background');
    expect(vaccinationBackground).toBeTruthy();
    
    const vaccinationOverlay = compiled.querySelector('.vaccination-overlay');
    expect(vaccinationOverlay).toBeTruthy();
  });

  it('should display vaccination title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const vaccinationTitle = compiled.querySelector('.vaccination-title');
    expect(vaccinationTitle).toBeTruthy();
    expect(vaccinationTitle?.classList.contains('mb-3')).toBeTruthy();
    expect(vaccinationTitle?.textContent?.trim()).toBe('Vacunación no PAI');
  });

  it('should display vaccination subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const vaccinationSubtitle = compiled.querySelector('.vaccination-subtitle');
    expect(vaccinationSubtitle).toBeTruthy();
    expect(vaccinationSubtitle?.classList.contains('mb-4')).toBeTruthy();
    expect(vaccinationSubtitle?.textContent?.trim()).toBe('Horarios de atención vía Whatsapp');
  });

  it('should display schedule information correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const scheduleInfo = compiled.querySelector('.schedule-info');
    expect(scheduleInfo).toBeTruthy();
    expect(scheduleInfo?.classList.contains('mb-4')).toBeTruthy();
    
    // Verificar elementos de horario
    const scheduleItems = compiled.querySelectorAll('.schedule-item');
    expect(scheduleItems.length).toBe(2);
    
    // Verificar horario de lunes a viernes
    const weekdaySchedule = scheduleItems[0];
    const weekdayLabel = weekdaySchedule.querySelector('.schedule-label');
    const weekdayTime = weekdaySchedule.querySelector('.schedule-time');
    
    expect(weekdayLabel?.textContent?.trim()).toBe('Lun - vier:');
    expect(weekdayTime?.textContent?.trim()).toBe('7:00 a.m. a 5:00 p.m.');
    
    // Verificar horario de sábados
    const saturdaySchedule = scheduleItems[1];
    const saturdayLabel = saturdaySchedule.querySelector('.schedule-label');
    const saturdayTime = saturdaySchedule.querySelector('.schedule-time');
    
    expect(saturdayLabel?.textContent?.trim()).toBe('Sábados:');
    expect(saturdayTime?.textContent?.trim()).toBe('7:00 a.m. a 1:00 p.m.');
  });

  it('should have schedule items with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const scheduleItems = compiled.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
      expect(item.classList.contains('d-flex')).toBeTruthy();
      expect(item.classList.contains('justify-content-between')).toBeTruthy();
      
      const label = item.querySelector('.schedule-label');
      const time = item.querySelector('.schedule-time');
      
      expect(label).toBeTruthy();
      expect(time).toBeTruthy();
    });
  });

  it('should display vaccination button with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const vaccinationButton = compiled.querySelector('.btn-vaccination') as HTMLAnchorElement;
    expect(vaccinationButton).toBeTruthy();
    
    // Verificar clases del botón
    expect(vaccinationButton?.classList.contains('btn')).toBeTruthy();
    expect(vaccinationButton?.classList.contains('btn-vaccination')).toBeTruthy();
    expect(vaccinationButton?.classList.contains('btn-lg')).toBeTruthy();
    
    // Verificar atributos del enlace
    expect(vaccinationButton?.getAttribute('href')).toBe('https/wa.link/r0dv9e');
    expect(vaccinationButton?.getAttribute('target')).toBe('_blank');
    
    // Verificar texto del botón
    expect(vaccinationButton?.textContent?.trim()).toBe('Agendar cita');
  });

  it('should have proper Bootstrap grid structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
    
    const row = compiled.querySelector('.row');
    expect(row).toBeTruthy();
    expect(row?.classList.contains('justify-content-center')).toBeTruthy();
    expect(row?.classList.contains('align-items-center')).toBeTruthy();
    expect(row?.classList.contains('min-vh-50')).toBeTruthy();
    
    const column = compiled.querySelector('.col-lg-8.col-xl-6');
    expect(column).toBeTruthy();
  });

  it('should have vaccination content with proper styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const vaccinationContent = compiled.querySelector('.vaccination-content');
    expect(vaccinationContent).toBeTruthy();
    expect(vaccinationContent?.classList.contains('text-center')).toBeTruthy();
    expect(vaccinationContent?.classList.contains('text-white')).toBeTruthy();
  });

  it('should use proper heading hierarchy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const h2Element = compiled.querySelector('h2.vaccination-title');
    expect(h2Element).toBeTruthy();
    
    const pElement = compiled.querySelector('p.vaccination-subtitle');
    expect(pElement).toBeTruthy();
  });

  it('should have semantic section structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
    
    const heading = compiled.querySelector('h2');
    expect(heading).toBeTruthy();
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar que hay un heading
    const heading = compiled.querySelector('h2');
    expect(heading).toBeTruthy();
    
    // Verificar que el enlace tiene texto descriptivo
    const link = compiled.querySelector('a');
    expect(link?.textContent?.trim()).toBeTruthy();
    expect(link?.textContent?.trim()).not.toBe('');
  });

  it('should have proper spacing classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const title = compiled.querySelector('.vaccination-title');
    expect(title?.classList.contains('mb-3')).toBeTruthy();
    
    const subtitle = compiled.querySelector('.vaccination-subtitle');
    expect(subtitle?.classList.contains('mb-4')).toBeTruthy();
    
    const scheduleInfo = compiled.querySelector('.schedule-info');
    expect(scheduleInfo?.classList.contains('mb-4')).toBeTruthy();
  });

  it('should handle schedule items correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const scheduleItems = compiled.querySelectorAll('.schedule-item');
    
    // Primer item debe tener margen inferior
    expect(scheduleItems[0].classList.contains('mb-2')).toBeTruthy();
    
    // Segundo item no debe tener margen inferior (último)
    expect(scheduleItems[1].classList.contains('mb-2')).toBeFalsy();
  });
});
