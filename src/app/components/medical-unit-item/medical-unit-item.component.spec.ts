import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MedicalUnitItemComponent } from './medical-unit-item.component';
import { Location } from '../../shared/models/location';

describe('MedicalUnitItemComponent', () => {
  let component: MedicalUnitItemComponent;
  let fixture: ComponentFixture<MedicalUnitItemComponent>;
  let debugElement: DebugElement;

  const mockLocation: Location = {
    id: 'test-location',
    name: 'Test Medical Unit',
    address: 'Test Address 123',
    schedule: {
      weekdays: '6:30 a. m. a 7:00 p. m.',
      saturday: '7:00 a. m. a 1:00 p. m.',
      sunday: 'Cerrado'
    },
    services: ['Test Service'],
    contact: {
      phone: '123-456-7890',
      email: 'test@example.com'
    },
    isPremium: false
  };

  const mockDisplayName = 'Test Medical Unit Display Name';
  const mockFormattedSchedule = {
    weekdays: 'Lunes a Viernes 6:30 a. m. a 7:00 p. m.',
    saturday: 'Sábado 7:00 a. m. a 1:00 p. m.'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalUnitItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalUnitItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    component.location = mockLocation;
    component.displayName = mockDisplayName;
    component.formattedSchedule = mockFormattedSchedule;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render medical unit display name', () => {
    component.location = mockLocation;
    component.displayName = mockDisplayName;
    component.formattedSchedule = mockFormattedSchedule;
    fixture.detectChanges();

    const nameElement = debugElement.query(By.css('strong'));
    expect(nameElement).toBeTruthy();
    expect(nameElement.nativeElement.textContent.trim()).toBe(mockDisplayName);
  });

  it('should render formatted schedule', () => {
    component.location = mockLocation;
    component.displayName = mockDisplayName;
    component.formattedSchedule = mockFormattedSchedule;
    fixture.detectChanges();

    const scheduleElements = debugElement.queryAll(By.css('p.small'));
    expect(scheduleElements.length).toBe(2);
    expect(scheduleElements[0].nativeElement.textContent.trim()).toBe(mockFormattedSchedule.weekdays);
    expect(scheduleElements[1].nativeElement.textContent.trim()).toBe(mockFormattedSchedule.saturday);
  });

  it('should have proper CSS classes', () => {
    component.location = mockLocation;
    component.displayName = mockDisplayName;
    component.formattedSchedule = mockFormattedSchedule;
    fixture.detectChanges();

    const containerDiv = debugElement.query(By.css('div'));
    expect(containerDiv.nativeElement.classList.contains('location-item')).toBeTruthy();
    expect(containerDiv.nativeElement.classList.contains('mb-3')).toBeTruthy();

    const nameElement = debugElement.query(By.css('p.mb-1'));
    expect(nameElement).toBeTruthy();

    const scheduleElements = debugElement.queryAll(By.css('p.small.mb-0'));
    expect(scheduleElements.length).toBe(2);
  });

  it('should update display when inputs change', () => {
    component.location = mockLocation;
    component.displayName = 'Initial Name';
    component.formattedSchedule = {
      weekdays: 'Initial Weekdays',
      saturday: 'Initial Saturday'
    };
    fixture.detectChanges();

    let nameElement = debugElement.query(By.css('strong'));
    let scheduleElements = debugElement.queryAll(By.css('p.small'));

    expect(nameElement.nativeElement.textContent.trim()).toBe('Initial Name');
    expect(scheduleElements[0].nativeElement.textContent.trim()).toBe('Initial Weekdays');
    expect(scheduleElements[1].nativeElement.textContent.trim()).toBe('Initial Saturday');

    // Update inputs
    component.displayName = 'Updated Name';
    component.formattedSchedule = {
      weekdays: 'Updated Weekdays',
      saturday: 'Updated Saturday'
    };
    fixture.detectChanges();

    nameElement = debugElement.query(By.css('strong'));
    scheduleElements = debugElement.queryAll(By.css('p.small'));

    expect(nameElement.nativeElement.textContent.trim()).toBe('Updated Name');
    expect(scheduleElements[0].nativeElement.textContent.trim()).toBe('Updated Weekdays');
    expect(scheduleElements[1].nativeElement.textContent.trim()).toBe('Updated Saturday');
  });

  it('should handle empty or undefined inputs gracefully', () => {
    component.location = mockLocation;
    component.displayName = '';
    component.formattedSchedule = { weekdays: '', saturday: '' };
    fixture.detectChanges();

    const nameElement = debugElement.query(By.css('strong'));
    const scheduleElements = debugElement.queryAll(By.css('p.small'));

    expect(nameElement.nativeElement.textContent.trim()).toBe('');
    expect(scheduleElements[0].nativeElement.textContent.trim()).toBe('');
    expect(scheduleElements[1].nativeElement.textContent.trim()).toBe('');
  });

  it('should have proper structure for accessibility', () => {
    component.location = mockLocation;
    component.displayName = mockDisplayName;
    component.formattedSchedule = mockFormattedSchedule;
    fixture.detectChanges();

    const containerDiv = debugElement.query(By.css('div.location-item'));
    expect(containerDiv).toBeTruthy();

    const nameElement = debugElement.query(By.css('strong'));
    expect(nameElement).toBeTruthy();

    const allParagraphs = debugElement.queryAll(By.css('p'));
    expect(allParagraphs.length).toBe(3); // 1 for name + 2 for schedule
  });

  it('should render component without errors when all inputs are provided', () => {
    component.location = mockLocation;
    component.displayName = mockDisplayName;
    component.formattedSchedule = mockFormattedSchedule;

    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should handle premium and regular locations equally', () => {
    const premiumLocation: Location = {
      ...mockLocation,
      isPremium: true,
      name: 'Premium Test Unit'
    };

    component.location = premiumLocation;
    component.displayName = 'Premium Unit Display';
    component.formattedSchedule = mockFormattedSchedule;
    fixture.detectChanges();

    const nameElement = debugElement.query(By.css('strong'));
    expect(nameElement.nativeElement.textContent.trim()).toBe('Premium Unit Display');
  });
});
