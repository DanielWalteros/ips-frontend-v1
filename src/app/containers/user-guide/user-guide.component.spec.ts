import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGuideComponent } from './user-guide.component';

describe('UserGuideComponent', () => {
  let component: UserGuideComponent;
  let fixture: ComponentFixture<UserGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGuideComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all section components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that all section components are present
    const heroComponent = compiled.querySelector('app-user-guide-hero');
    expect(heroComponent).toBeTruthy();
    
    const channelsComponent = compiled.querySelector('app-channels-section');
    expect(channelsComponent).toBeTruthy();
    
    const informationComponent = compiled.querySelector('app-information-relevant-section');
    expect(informationComponent).toBeTruthy();
    
    const dataManagementComponent = compiled.querySelector('app-document-section');
    expect(dataManagementComponent).toBeTruthy();
  });

  it('should have correct order of sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('app-user-guide-hero, app-channels-section, app-information-relevant-section, app-document-section');
    
    expect(sections.length).toBe(4);
    expect(sections[0].tagName.toLowerCase()).toBe('app-user-guide-hero');
    expect(sections[1].tagName.toLowerCase()).toBe('app-channels-section');
    expect(sections[2].tagName.toLowerCase()).toBe('app-information-relevant-section');
    expect(sections[3].tagName.toLowerCase()).toBe('app-document-section');
  });

  it('should be a standalone component', () => {
    // This test verifies the component can be instantiated independently
    expect(component).toBeInstanceOf(UserGuideComponent);
  });

  it('should have simple structure as container component', () => {
    // The main component should be simple, delegating functionality to sub-components
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Should contain exactly 4 child components
    const childComponents = compiled.children;
    expect(childComponents.length).toBe(4);
  });

  it('should have data management properties defined', () => {
    expect(component.dataManagementTitle).toBe('Manejo de datos');
    expect(component.dataManagementDocuments).toBeDefined();
    expect(component.dataManagementDocuments.length).toBeGreaterThan(0);
  });
});
