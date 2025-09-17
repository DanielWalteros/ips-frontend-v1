import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationCardComponent } from './location-card.component';
import { Location } from '../../shared/models/location';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<LocationCardComponent>;

  const mockLocation: Location = {
    id: 'test-location',
    name: 'Test Location',
    address: 'Test Address',
    fullAddress: 'Test Address<br>Test Building',
    schedule: {
      weekdays: '6:30 a. m. a 7:00 p. m.',
      saturday: '7:00 a. m. a 1:00 p. m.',
      sunday: 'Cerrado'
    },
    services: ['Test Service'],
    contact: {
      phone: '#322',
      email: 'test@test.com'
    },
    imageUrl: 'test-image.jpg',
    isPremium: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationCardComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationCardComponent);
    component = fixture.componentInstance;
    component.location = mockLocation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display location information correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.location-title')?.textContent).toContain('Test Location');
    expect(compiled.querySelector('.location-address')?.innerHTML).toContain('Test Address<br>Test Building');
  });

  it('should display schedule information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('6:30 a. m. a 7:00 p. m.');
    expect(compiled.textContent).toContain('7:00 a. m. a 1:00 p. m.');
    expect(compiled.textContent).toContain('Cerrado');
  });

  it('should display the location image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.location-image') as HTMLImageElement;
    expect(img.src).toContain('test-image.jpg');
    expect(img.alt).toBe('Test Location');
  });
});
