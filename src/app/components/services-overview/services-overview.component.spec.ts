import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ServicesOverviewComponent } from './services-overview.component';

describe('ServicesOverviewComponent', () => {
  let component: ServicesOverviewComponent;
  let fixture: ComponentFixture<ServicesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ServicesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component correctly', () => {
    expect(component).toBeInstanceOf(ServicesOverviewComponent);
  });

  it('should have constructor defined', () => {
    expect(component.constructor).toBeDefined();
  });

  it('should render overview section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar que la sección overview existe
    const overviewSection = compiled.querySelector('.services-overview');
    expect(overviewSection).toBeTruthy();
    expect(overviewSection?.classList.contains('py-5')).toBeTruthy();
  });

  it('should have container and row structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
    
    const row = compiled.querySelector('.row');
    expect(row).toBeTruthy();
    expect(row?.classList.contains('align-items-center')).toBeTruthy();
  });

  it('should display overview title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const overviewTitle = compiled.querySelector('.overview-title');
    expect(overviewTitle).toBeTruthy();
    expect(overviewTitle?.classList.contains('mb-0')).toBeTruthy();
    expect(overviewTitle?.textContent?.trim()).toBe(
      'Brindamos servicios de medicina general, especializada y de apoyo diagnóstico'
    );
  });

  it('should display overview description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const overviewDescription = compiled.querySelector('.overview-description');
    expect(overviewDescription).toBeTruthy();
    expect(overviewDescription?.classList.contains('mb-0')).toBeTruthy();
    
    const expectedText = 'Conozca nuestras tres unidades de atención médica y los servicios que podrá utilizar en cada una de ellas: exámenes de laboratorio, electrocardiogramas, ecografías, entre otros...';
    expect(overviewDescription?.textContent?.trim()).toBe(expectedText);
  });

  it('should have proper column layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const columns = compiled.querySelectorAll('.col-lg-6');
    expect(columns.length).toBe(2);
    
    // Primera columna debe contener el título
    const firstColumn = columns[0];
    const title = firstColumn.querySelector('.overview-title');
    expect(title).toBeTruthy();
    
    // Segunda columna debe contener la descripción
    const secondColumn = columns[1];
    const description = secondColumn.querySelector('.overview-description');
    expect(description).toBeTruthy();
  });

  it('should use h2 tag for the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const h2Element = compiled.querySelector('h2.overview-title');
    expect(h2Element).toBeTruthy();
  });

  it('should use p tag for the description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const pElement = compiled.querySelector('p.overview-description');
    expect(pElement).toBeTruthy();
  });

  it('should have semantic HTML structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar que es una sección semántica
    const section = compiled.querySelector('section');
    expect(section).toBeTruthy();
    
    // Verificar que hay un heading de nivel 2
    const heading = compiled.querySelector('h2');
    expect(heading).toBeTruthy();
    
    // Verificar que hay contenido de párrafo
    const paragraph = compiled.querySelector('p');
    expect(paragraph).toBeTruthy();
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should be responsive with Bootstrap classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verificar clases de columnas responsivas
    const columns = compiled.querySelectorAll('.col-lg-6');
    expect(columns.length).toBe(2);
    
    columns.forEach(column => {
      expect(column.classList.contains('col-lg-6')).toBeTruthy();
    });
  });

  it('should have proper content hierarchy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // El título debe aparecer antes que la descripción en el DOM
    const title = compiled.querySelector('.overview-title');
    const description = compiled.querySelector('.overview-description');
    
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    
    // Verificar orden en el DOM (título en primera columna, descripción en segunda)
    const titleColumn = title?.closest('.col-lg-6');
    const descriptionColumn = description?.closest('.col-lg-6');
    
    expect(titleColumn).toBeTruthy();
    expect(descriptionColumn).toBeTruthy();
    expect(titleColumn).not.toBe(descriptionColumn);
  });
});
