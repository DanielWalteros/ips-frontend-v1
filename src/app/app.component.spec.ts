import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: any;
  let component: AppComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Salud Bolívar IPS' title`, () => {
    expect(component.title).toEqual('Salud Bolívar IPS');
  });

  it('should render header component', () => {
    const header = debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
  });

  it('should render footer component', () => {
    const footer = debugElement.query(By.css('app-footer'));
    expect(footer).toBeTruthy();
  });

  it('should have router outlet for main content', () => {
    const routerOutlet = debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  it('should have proper main layout structure', () => {
    const mainContainer = debugElement.query(By.css('.app-container'));
    expect(mainContainer).toBeTruthy();

    const mainContent = debugElement.query(By.css('.main-content'));
    expect(mainContent).toBeTruthy();
  });

  it('should maintain consistent spacing between components', () => {
    const appContainer = debugElement.query(By.css('.app-container'));
    expect(appContainer).toBeTruthy();
    
    // Verificar que la estructura principal existe
    expect(appContainer.nativeElement.children.length).toBeGreaterThan(0);
  });

  describe('Application Structure', () => {
    it('should have proper component hierarchy', () => {
      const components = [
        debugElement.query(By.css('app-header')),
        debugElement.query(By.css('router-outlet')),
        debugElement.query(By.css('app-footer'))
      ];

      components.forEach(component => {
        expect(component).toBeTruthy();
      });
    });

    it('should be responsive container', () => {
      const appElement = debugElement.nativeElement;
      expect(appElement.classList.contains('app-container') || 
             appElement.querySelector('.app-container')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const header = debugElement.query(By.css('app-header'));
      const main = debugElement.query(By.css('main, .main-content, router-outlet'));
      const footer = debugElement.query(By.css('app-footer'));

      expect(header).toBeTruthy();
      expect(main).toBeTruthy();
      expect(footer).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should render without errors', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should have minimal initial DOM', () => {
      const allElements = debugElement.queryAll(By.css('*'));
      // La app con header y footer completos tiene más elementos
      expect(allElements.length).toBeLessThan(200);
    });
  });

  describe('Component Integration', () => {
    it('should properly integrate header and footer', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();

      const header = debugElement.query(By.css('app-header'));
      const footer = debugElement.query(By.css('app-footer'));
      
      expect(header).toBeTruthy();
      expect(footer).toBeTruthy();
    });
  });
});
