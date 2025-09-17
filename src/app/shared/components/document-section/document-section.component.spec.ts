import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentSectionComponent } from './document-section.component';
import { DocumentCardComponent } from '../document-card/document-card.component';
import { Document } from '../../../shared/models/document';
import { CommonModule } from '@angular/common';
import 'reflect-metadata';

describe('DocumentSectionComponent', () => {
  let component: DocumentSectionComponent;
  let fixture: ComponentFixture<DocumentSectionComponent>;

  const mockDocuments: Document[] = [
    {
      id: 'aviso-privacidad',
      title: 'Aviso de Privacidad - Salud Bolívar IPS',
      downloadUrl: 'http://example.com/doc1.pdf',
      type: 'privacy',
      isAvailable: true
    },
    {
      id: 'epidemiological-bulletin',
      title: 'Epidemiological Bulletin',
      downloadUrl: 'http://example.com/doc1.pdf',
      isAvailable: true,
      type: 'epidemiological'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSectionComponent, DocumentCardComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title correctly', () => {
    const testTitle = 'Test Section Title';
    component.title = testTitle;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2');
    expect(titleElement?.textContent?.trim()).toBe(testTitle);
  });

  it('should render subtitle as text when allowHtmlInSubtitle is false', () => {
    const testSubtitle = 'Test <strong>subtitle</strong>';
    component.subtitle = testSubtitle;
    component.allowHtmlInSubtitle = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const subtitleElement = compiled.querySelector('p');
    expect(subtitleElement?.textContent?.trim()).toBe(testSubtitle);
    expect(subtitleElement?.innerHTML).not.toContain('<strong>');
  });

  it('should render subtitle as HTML when allowHtmlInSubtitle is true', () => {
    const testSubtitle = 'Test <strong>subtitle</strong>';
    component.subtitle = testSubtitle;
    component.allowHtmlInSubtitle = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const subtitleElement = compiled.querySelector('p');
    expect(subtitleElement?.innerHTML).toContain('<strong>subtitle</strong>');
  });

  it('should use fixed CSS classes', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sectionElement = compiled.querySelector('section');
    const titleElement = compiled.querySelector('h2');
    const subtitleElement = compiled.querySelector('p');

    expect(sectionElement?.classList).toContain('document-section');
    expect(titleElement?.classList).toContain('document-title');
    expect(subtitleElement?.classList).toContain('document-subtitle');
  });

  it('should render document cards when documents are provided', () => {
    component.documents = mockDocuments;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const documentCards = compiled.querySelectorAll('app-document-card');
    expect(documentCards.length).toBe(mockDocuments.length);
  });

  it('should not render document cards when no documents are provided', () => {
    component.documents = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const documentCards = compiled.querySelectorAll('app-document-card');
    expect(documentCards.length).toBe(0);
  });

  it('should have trackByDocumentId function', () => {
    expect(component.trackByDocumentId).toBeDefined();
    expect(typeof component.trackByDocumentId).toBe('function');

    const result = component.trackByDocumentId(0, mockDocuments[0]);
    expect(result).toBe(mockDocuments[0].id);
  });

  it('should use consistent CSS classes', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sectionElement = compiled.querySelector('section');
    const titleElement = compiled.querySelector('h2');
    const subtitleElement = compiled.querySelector('p');

    expect(sectionElement?.classList).toContain('document-section');
    expect(titleElement?.classList).toContain('document-title');
    expect(subtitleElement?.classList).toContain('document-subtitle');
  });

  it('should render correct Bootstrap grid structure', () => {
    component.documents = mockDocuments;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.container');
    const rows = compiled.querySelectorAll('.row');
    const documentColumns = compiled.querySelectorAll('.col-lg-4.col-md-6');

    expect(container).toBeTruthy();
    expect(rows.length).toBe(2); // Header row and content row
    expect(documentColumns.length).toBe(mockDocuments.length);
  });

  it('should be a standalone component', () => {
    // Verify component can be imported independently
    expect(component).toBeTruthy();
    // This test verifies the component works correctly, which implicitly tests it's standalone
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should use financial variant styles when variant is financial', () => {
    component.variant = 'financial';
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sectionElement = compiled.querySelector('section');
    const titleElement = compiled.querySelector('h2');
    const subtitleElement = compiled.querySelector('p');

    expect(sectionElement?.classList).toContain('financial-reports-section');
    expect(titleElement?.classList).toContain('financial-title');
    expect(subtitleElement?.classList).toContain('financial-subtitle');
  });

  it('should use default styles when variant is default', () => {
    component.variant = 'default';
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2');
    const subtitleElement = compiled.querySelector('p');

    expect(titleElement?.classList).toContain('document-title');
    expect(subtitleElement?.classList).toContain('document-subtitle');
  });

  it('should have helper methods for CSS classes', () => {
    component.variant = 'financial';
    expect(component.getSectionClasses()).toBe('financial-reports-section');
    expect(component.getTitleClasses()).toBe('financial-title');
    expect(component.getSubtitleClasses()).toBe('financial-subtitle');

    component.variant = 'default';
    expect(component.getSectionClasses()).toBe('');
    expect(component.getTitleClasses()).toBe('document-title');
    expect(component.getSubtitleClasses()).toBe('document-subtitle');
  });
});
