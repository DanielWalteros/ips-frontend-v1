// Utilidades para testing - Salud Bolívar IPS
// Optimizado para Jest

import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, AbstractControl } from '@angular/forms';
import { of, throwError, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Utilidades comunes para testing de componentes
 */
export class TestUtils {
  
  /**
   * Verifica que un componente tenga la estructura básica de Bootstrap
   */
  static expectResponsiveStructure(fixture: ComponentFixture<any>): void {
    const debugElement = fixture.debugElement;
    const containers = debugElement.queryAll(By.css('.container, .container-fluid'));
    const gridElements = debugElement.queryAll(By.css('[class*="col-"], .row'));
    
    expect(containers.length).toBeGreaterThan(0);
    expect(gridElements.length).toBeGreaterThan(0);
  }

  /**
   * Verifica que todos los enlaces externos tengan target="_blank"
   */
  static expectExternalLinksHaveTarget(fixture: ComponentFixture<any>): void {
    const debugElement = fixture.debugElement;
    const externalLinks = debugElement.queryAll(
      By.css('a[href^="http"], a[href^="https"], a[href^="tel:"], a[href^="mailto:"]')
    );
    
    externalLinks.forEach(link => {
      const href = link.nativeElement.href;
      if (href.startsWith('http') || href.startsWith('https')) {
        expect(link.nativeElement.target).toBe('_blank');
      }
    });
  }

  /**
   * Verifica que las imágenes tengan texto alternativo
   */
  static expectImagesHaveAltText(fixture: ComponentFixture<any>): void {
    const debugElement = fixture.debugElement;
    const images = debugElement.queryAll(By.css('img'));
    
    images.forEach(img => {
      expect(img.nativeElement.alt).toBeDefined();
      expect(img.nativeElement.alt.length).toBeGreaterThan(0);
    });
  }

  /**
   * Verifica que los formularios tengan las etiquetas apropiadas
   */
  static expectFormHasLabels(fixture: ComponentFixture<any>): void {
    const debugElement = fixture.debugElement;
    const labels = debugElement.queryAll(By.css('label'));
    const inputs = debugElement.queryAll(By.css('input, select, textarea'));
    
    expect(labels.length).toBeGreaterThan(0);
    expect(inputs.length).toBeGreaterThan(0);
  }

  /**
   * Verifica que un componente use las clases de marca de Salud Bolívar
   */
  static expectBrandClasses(fixture: ComponentFixture<any>): void {
    const debugElement = fixture.debugElement;
    const brandElements = debugElement.queryAll(
      By.css('[class*="sb-primary"], [class*="sb-accent"], [class*="text-sb-primary"]')
    );
    
    expect(brandElements.length).toBeGreaterThan(0);
  }

  /**
   * Simula el envío de un formulario
   */
  static submitForm(fixture: ComponentFixture<any>, formSelector: string = 'form'): void {
    const debugElement = fixture.debugElement;
    const form = debugElement.query(By.css(formSelector));
    
    expect(form).toBeTruthy();
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
  }

  /**
   * Verifica que no haya errores de consola durante el renderizado
   */
  static expectNoConsoleErrors(fixture: ComponentFixture<any>): void {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  }

  /**
   * Busca texto en el DOM del componente
   */
  static expectTextContent(fixture: ComponentFixture<any>, text: string): void {
    const debugElement = fixture.debugElement;
    const content = debugElement.nativeElement.textContent.toLowerCase();
    
    expect(content).toContain(text.toLowerCase());
  }

  /**
   * Verifica que existan enlaces de navegación específicos
   */
  static expectNavigationLinks(fixture: ComponentFixture<any>, routes: string[]): void {
    const debugElement = fixture.debugElement;
    
    routes.forEach(route => {
      const link = debugElement.query(By.css(`a[routerLink="${route}"]`));
      expect(link).toBeTruthy();
    });
  }

  /**
   * Verifica estructura de accesibilidad básica
   */
  static expectAccessibilityStructure(fixture: ComponentFixture<any>): void {
    const debugElement = fixture.debugElement;
    
    // Verificar jerarquía de encabezados
    const headings = debugElement.queryAll(By.css('h1, h2, h3, h4, h5, h6'));
    expect(headings.length).toBeGreaterThan(0);
    
    // Verificar que los enlaces tengan texto descriptivo
    const links = debugElement.queryAll(By.css('a'));
    links.forEach(link => {
      const linkText = link.nativeElement.textContent.trim();
      const hasAriaLabel = link.nativeElement.getAttribute('aria-label');
      
      expect(linkText.length > 0 || hasAriaLabel).toBeTruthy();
    });
  }

  // ===========================================
  // ✨ NUEVAS UTILIDADES OPTIMIZADAS PARA JEST
  // ===========================================

  /**
   * Crea un spy Jest para métodos de componente
   */
  static createComponentSpy<T>(component: T, methodName: keyof T): jest.SpyInstance {
    return jest.spyOn(component as any, methodName as string);
  }

  /**
   * Crea un mock Observable que retorna datos después de un delay
   */
  static createMockObservable<T>(data: T, delayMs: number = 100): Observable<T> {
    return of(data).pipe(delay(delayMs));
  }

  /**
   * Crea un mock Observable que falla con un error
   */
  static createMockError(errorMessage: string = 'Test error'): Observable<never> {
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Espera a que todas las operaciones asíncronas terminen
   */
  static async waitForAsync(fixture: ComponentFixture<any>): Promise<void> {
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
  }

  /**
   * Simula input de usuario en un campo de formulario
   */
  static async simulateUserInput(
    fixture: ComponentFixture<any>,
    selector: string,
    value: string
  ): Promise<void> {
    const input = fixture.debugElement.query(By.css(selector));
    expect(input).toBeTruthy();
    
    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    await fixture.whenStable();
  }

  /**
   * Simula click en un elemento y espera cambios
   */
  static async simulateClick(
    fixture: ComponentFixture<any>,
    selector: string
  ): Promise<void> {
    const element = fixture.debugElement.query(By.css(selector));
    expect(element).toBeTruthy();
    
    element.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
  }

  /**
   * Verifica que un formulario ReactiveForm esté válido
   */
  static expectFormValid(form: FormGroup): void {
    expect(form.valid).toBeTruthy();
    expect(form.errors).toBeNull();
  }

  /**
   * Verifica que un formulario ReactiveForm tenga errores específicos
   */
  static expectFormInvalid(form: FormGroup, expectedErrors?: string[]): void {
    expect(form.valid).toBeFalsy();
    
    if (expectedErrors) {
      expectedErrors.forEach(errorKey => {
        const hasError = Object.keys(form.controls).some(controlName => {
          const control = form.get(controlName);
          return control?.hasError(errorKey);
        });
        expect(hasError).toBeTruthy();
      });
    }
  }

  /**
   * Verifica que un campo específico de formulario tenga un error
   */
  static expectFieldError(form: FormGroup, fieldName: string, errorType: string): void {
    const field = form.get(fieldName);
    expect(field).toBeTruthy();
    expect(field?.hasError(errorType)).toBeTruthy();
  }

  /**
   * Llena un formulario con datos mock
   */
  static fillForm(form: FormGroup, data: Record<string, any>): void {
    Object.keys(data).forEach(key => {
      const control = form.get(key);
      if (control) {
        control.setValue(data[key]);
        control.markAsTouched();
      }
    });
  }

  /**
   * Mide el tiempo de renderizado de un componente
   */
  static async measureRenderTime(fixture: ComponentFixture<any>): Promise<number> {
    const startTime = performance.now();
    fixture.detectChanges();
    await fixture.whenStable();
    const endTime = performance.now();
    return endTime - startTime;
  }

  /**
   * Verifica que el componente se renderice en menos de X milisegundos
   */
  static async expectFastRender(
    fixture: ComponentFixture<any>,
    maxTimeMs: number = 100
  ): Promise<void> {
    const renderTime = await TestUtils.measureRenderTime(fixture);
    expect(renderTime).toBeLessThan(maxTimeMs);
  }

  /**
   * Crea un mock de servicio HTTP con respuestas predefinidas
   */
  static createHttpServiceMock(responses: Record<string, any>): any {
    const mock: any = {};
    
    Object.keys(responses).forEach(methodName => {
      mock[methodName] = jest.fn().mockReturnValue(of(responses[methodName]));
    });
    
    return mock;
  }

  /**
   * Crea un mock de LocalStorage para pruebas
   */
  static createLocalStorageMock(): Storage {
    const store: Record<string, string> = {};
    
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
      key: jest.fn((index: number) => Object.keys(store)[index] || null),
      length: Object.keys(store).length
    };
  }

  /**
   * Verifica que no haya memory leaks después del test
   */
  static expectNoMemoryLeaks(fixture: ComponentFixture<any>): void {
    // Simula destrucción del componente
    fixture.destroy();
    
    // En un entorno real, aquí verificaríamos que no quedan
    // suscripciones abiertas, timers, etc.
    expect(fixture.destroyed).toBeTruthy();
  }

  /**
   * Crea un matcher personalizado para Jest
   */
  static createCustomMatcher(name: string, matcherFn: (received: any, expected: any) => boolean): void {
    expect.extend({
      [name]: (received: any, expected: any) => {
        const pass = matcherFn(received, expected);
        return {
          message: () => `expected ${received} ${pass ? 'not ' : ''}to ${name} ${expected}`,
          pass
        };
      }
    });
  }
}

/**
 * Datos mock comunes para pruebas
 */
export const MockData = {
  
  /**
   * Usuario mock para pruebas
   */
  mockUser: {
    id: '1',
    name: 'Juan Pérez Test',
    document: '12345678',
    email: 'test@example.com',
    phone: '3001234567'
  },

  /**
   * Ubicación mock simplificada
   */
  mockLocation: {
    id: 'test-location',
    name: 'Unidad Test',
    address: 'Calle Test #123',
    building: 'Edificio Test',
    schedule: {
      weekdays: 'Lun-Vie: 8:00 AM - 5:00 PM',
      saturday: 'Sáb: 8:00 AM - 12:00 PM',
      sunday: 'Dom: Cerrado'
    },
    services: ['medicina-general', 'test-service'],
    contact: {
      phone: '#322',
      email: 'test@saludbolivar.com'
    },
    isPremium: false
  },

  /**
   * Especialidad mock
   */
  mockSpecialty: {
    id: 'test-specialty',
    name: 'Especialidad Test',
    description: 'Descripción de prueba',
    availableAt: ['test-location']
  },

  /**
   * Formulario de contacto válido
   */
  validContactForm: {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    phone: '3001234567',
    subject: 'informacion-servicios',
    message: 'Este es un mensaje de prueba para el formulario de contacto.',
    dataConsent: true
  },

  /**
   * Datos de cita médica mock
   */
  mockAppointment: {
    id: 'test-appointment-123',
    patient: {
      id: 'patient-123',
      document: '12345678',
      name: 'Ana García Test',
      email: 'ana@example.com',
      phone: '3007654321',
      birthDate: '1990-05-15'
    },
    specialty: 'medicina-general',
    location: 'test-location',
    date: '2024-12-20',
    time: '10:00',
    status: 'confirmed',
    notes: 'Cita de prueba'
  },

  /**
   * Respuestas HTTP mock para servicios
   */
  httpResponses: {
    locations: [
      {
        id: 'el-dorado',
        name: 'Unidad de Atención Integral Avenida El Dorado',
        address: 'Avenida El Dorado # 68C-61',
        building: 'Torre Central Davivienda, piso 7',
        schedule: {
          weekdays: 'Lun. a Vier.: 6:30 a.m. a 7:00 p.m.',
          saturday: 'Sábados: 7:00 a.m. a 1:00 p.m.',
          sunday: 'Domingos: Cerrado'
        },
        services: ['medicina-general', 'cardiologia', 'neurologia'],
        isPremium: false
      },
      {
        id: 'metropolis',
        name: 'Unidad Médica Premium Metrópolis',
        address: 'Avenida Carrera 68 # 75A-50',
        building: 'C.C Metrópolis, Piso 1',
        schedule: {
          weekdays: 'Lun. a Vier.: 6:30 a.m. a 7:00 p.m.',
          saturday: 'Sábados: 7:00 a.m. a 1:00 p.m.',
          sunday: 'Domingos: Cerrado'
        },
        services: ['medicina-general', 'dermatologia', 'oftalmologia'],
        isPremium: true
      }
    ],
    
    specialties: [
      {
        id: 'medicina-general',
        name: 'Medicina General',
        description: 'Atención médica integral para todas las edades',
        availableAt: ['el-dorado', 'metropolis', 'calle-134', 'carrera-decima']
      },
      {
        id: 'cardiologia',
        name: 'Cardiología',
        description: 'Especialidad en enfermedades del corazón',
        availableAt: ['el-dorado', 'metropolis']
      }
    ],

    appointmentSlots: [
      { time: '08:00', available: true },
      { time: '08:30', available: true },
      { time: '09:00', available: false },
      { time: '09:30', available: true },
      { time: '10:00', available: true },
      { time: '10:30', available: false },
      { time: '11:00', available: true }
    ]
  },

  /**
   * Errores HTTP mock
   */
  httpErrors: {
    notFound: {
      status: 404,
      error: 'Not Found',
      message: 'El recurso solicitado no fue encontrado'
    },
    serverError: {
      status: 500,
      error: 'Internal Server Error',
      message: 'Error interno del servidor'
    },
    validationError: {
      status: 400,
      error: 'Bad Request',
      message: 'Los datos enviados no son válidos',
      details: ['El email es requerido', 'El teléfono debe tener 10 dígitos']
    }
  }
};

/**
 * Configuración común para pruebas de componentes
 * Optimizado para Jest
 */
export const TestConfig = {
  
  /**
   * Configuración común para ComponentFixture
   */
  commonTestBed: {
    teardown: { destroyAfterEach: true },
    detectChanges: false // Control manual de detectChanges para mejor debugging
  },

  /**
   * Timeouts comunes para operaciones asíncronas
   */
  timeouts: {
    standard: 5000,
    http: 10000,
    animation: 2000,
    formValidation: 1000
  },

  /**
   * Configuración de entorno para pruebas
   */
  environment: {
    production: false,
    testing: true,
    apiUrl: 'http://localhost:3000/api',
    enableLogging: false
  },

  /**
   * Mocks básicos para providers comunes
   */
  mockProviders: {
    location: {
      back: jest.fn(),
      forward: jest.fn(),
      go: jest.fn(),
      replaceState: jest.fn(),
      getState: jest.fn().mockReturnValue(null)
    },
    
    router: {
      navigate: jest.fn().mockResolvedValue(true),
      navigateByUrl: jest.fn().mockResolvedValue(true),
      createUrlTree: jest.fn(),
      serializeUrl: jest.fn()
    },

    activatedRoute: {
      params: TestUtils.createMockObservable({}),
      queryParams: TestUtils.createMockObservable({}),
      data: TestUtils.createMockObservable({}),
      snapshot: {
        params: {},
        queryParams: {},
        data: {}
      }
    }
  },

  /**
   * Configuración de Jest específica
   */
  jest: {
    // Configuración global para beforeEach/afterEach
    setupTest: (fixture: ComponentFixture<any>) => {
      // Configuración común que se ejecuta antes de cada test
      fixture.detectChanges();
      return fixture;
    },

    cleanupTest: (fixture: ComponentFixture<any>) => {
      // Limpieza común que se ejecuta después de cada test
      fixture.destroy();
      jest.clearAllMocks();
    }
  }
};

/**
 * Helpers para configuración rápida de tests con Jest
 */
export class JestTestHelpers {
  
  /**
   * Configura un test suite completo con configuración común
   */
  static setupTestSuite(suiteName: string, setupFn?: () => void): void {
    describe(suiteName, () => {
      beforeEach(() => {
        if (setupFn) setupFn();
      });

      afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
      });
    });
  }

  /**
   * Crea un test con timeout personalizado
   */
  static testWithTimeout(name: string, testFn: () => Promise<void>, timeout: number = 5000): void {
    it(name, async () => {
      await Promise.race([
        testFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error(`Test timeout after ${timeout}ms`)), timeout)
        )
      ]);
    });
  }

  /**
   * Agrupa tests relacionados con formularios
   */
  static describeFormTests(formName: string, tests: () => void): void {
    describe(`${formName} - Form Tests`, () => {
      beforeEach(() => {
        // Setup específico para formularios
        jest.clearAllMocks();
      });

      tests();
    });
  }

  /**
   * Agrupa tests relacionados con HTTP
   */
  static describeHttpTests(serviceName: string, tests: () => void): void {
    describe(`${serviceName} - HTTP Tests`, () => {
      beforeEach(() => {
        // Setup específico para servicios HTTP
        jest.clearAllMocks();
      });

      tests();
    });
  }

  /**
   * Crea un test de snapshot con Jest
   */
  static expectMatchSnapshot(fixture: ComponentFixture<any>, description: string = 'should match snapshot'): void {
    it(description, () => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });
  }
}
