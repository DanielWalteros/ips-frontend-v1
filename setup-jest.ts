// Setup Jest para Angular - Salud Bolívar IPS

// Importar Zone.js requerido para Angular 19 + jest-preset-angular 15+
import 'zone.js';
import 'zone.js/testing';

// Inicialización requerida para jest-preset-angular 15+
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Inicializar el entorno de testing de Angular
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock para sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

// Mock para window.matchMedia (necesario para Bootstrap y Angular Material)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para ResizeObserver (necesario para Angular Material)
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
}));

// Mock para URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

// Mock para fetch (si se usa)
global.fetch = jest.fn();

// Configuración de zona para pruebas
import { ngMocks } from 'ng-mocks';

// Configuración global de ng-mocks para Jest
ngMocks.autoSpy('jest');

// Configurar globals para compatibilidad con las pruebas existentes
global.spyOn = jest.spyOn;

// Mock para console.warn durante las pruebas (opcional)
const originalWarn = console.warn;
beforeEach(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
});

// Configuración para Bootstrap (si se usa)
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

// Mock para Navigator
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(''),
  },
  writable: true,
});

// Configuración de timeout para pruebas asíncronas
jest.setTimeout(30000);

// Helper global para testing
declare global {
  interface Window {
    HTMLElement: typeof HTMLElement;
  }
  
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWithError(message?: string): R;
    }
  }
}

// Matcher personalizado para errores
expect.extend({
  toHaveBeenCalledWithError(received, expectedMessage) {
    const calls = received.mock.calls;
    const hasErrorCall = calls.some((call: any[]) => {
      return call.some(arg => {
        if (arg instanceof Error) {
          return expectedMessage ? arg.message.includes(expectedMessage) : true;
        }
        return false;
      });
    });

    return {
      message: () => expectedMessage 
        ? `Expected function to have been called with error containing "${expectedMessage}"`
        : 'Expected function to have been called with an error',
      pass: hasErrorCall,
    };
  },
});

// Configuración para suprimir advertencias específicas de Angular en pruebas
const originalConsoleError = console.error;
console.error = (...args) => {
  // Suprimir errores conocidos de Angular durante testing
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('NG0') || 
     message.includes('ExpressionChangedAfterItHasBeenCheckedError'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};
