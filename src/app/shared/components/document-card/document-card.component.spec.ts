import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Document } from '../../../shared/models/document';
import { DocumentCardComponent } from './document-card.component';

describe('DocumentCardComponent', () => {
  let component: DocumentCardComponent;
  let fixture: ComponentFixture<DocumentCardComponent>;
  
  const mockDocument: Document = {
    id: 'test-document',
    title: 'Test Document Title',
    downloadUrl: 'https://example.com/document.pdf',
    type: 'transparency',
    isAvailable: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DocumentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCardComponent);
    component = fixture.componentInstance;
    
    // Set the required input
    component.document = mockDocument;
    fixture.detectChanges();
    
    // Mock window.open to avoid JSDOM issues
    spyOn(window, 'open');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required document input', () => {
    expect(component.document).toBeDefined();
    expect(component.document).toEqual(mockDocument);
  });

  it('should render document title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const documentTitle = compiled.querySelector('.financial-card-title a');
    
    expect(documentTitle).toBeTruthy();
    expect(documentTitle?.textContent?.trim()).toBe('Test Document Title');
  });

  it('should render financial card structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const financialCard = compiled.querySelector('.financial-card');
    
    expect(financialCard).toBeTruthy();
    expect(financialCard?.classList.contains('text-center')).toBeTruthy();
    expect(financialCard?.classList.contains('p-4')).toBeTruthy();
    expect(financialCard?.classList.contains('h-100')).toBeTruthy();
  });

  it('should render PDF icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const pdfIcon = compiled.querySelector('.pdf-icon img');
    
    expect(pdfIcon).toBeTruthy();
    expect(pdfIcon?.getAttribute('alt')).toBe('PDF');
    expect(pdfIcon?.classList.contains('img-fluid')).toBeTruthy();
  });

  it('should render download link when available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const downloadLink = compiled.querySelector('.financial-card-title a');
    
    expect(downloadLink).toBeTruthy();
    expect(downloadLink?.getAttribute('href')).toBe('https://example.com/document.pdf');
    expect(downloadLink?.getAttribute('target')).toBe('_blank');
    expect(downloadLink?.classList.contains('text-decoration-underline')).toBeTruthy();
  });

  it('should handle unavailable document', () => {
    component.document = { ...mockDocument, isAvailable: false };
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const downloadLink = compiled.querySelector('.financial-card-title a');
    
    expect(downloadLink?.classList.contains('disabled')).toBeTruthy();
    expect(downloadLink?.getAttribute('target')).toBe('_self');
  });

  it('should handle placeholder URL', () => {
    component.document = { ...mockDocument, downloadUrl: '#' };
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const downloadLink = compiled.querySelector('.financial-card-title a');
    
    expect(downloadLink?.getAttribute('href')).toBe('#');
  });

  it('should have proper CSS structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const financialCard = compiled.querySelector('.financial-card');
    expect(financialCard).toBeTruthy();
    
    const pdfIcon = compiled.querySelector('.pdf-icon');
    expect(pdfIcon).toBeTruthy();
    expect(pdfIcon?.classList.contains('mb-3')).toBeTruthy();
    
    const cardTitle = compiled.querySelector('.financial-card-title');
    expect(cardTitle).toBeTruthy();
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for meaningful text content
    const link = compiled.querySelector('.financial-card-title a');
    expect(link).toBeTruthy();
    expect(link?.textContent?.trim()).toBe('Test Document Title');
    
    // Check for alt text on image
    const img = compiled.querySelector('.pdf-icon img');
    expect(img?.getAttribute('alt')).toBe('PDF');
  });

  it('should handle onDownload method correctly', () => {
    // Clear any previous calls
    jest.clearAllMocks();
    
    component.onDownload();
    
    expect(window.open).toHaveBeenCalledWith('https://example.com/document.pdf', '_blank');
  });

  it('should handle onDownload with placeholder URL', () => {
    component.document = { ...mockDocument, downloadUrl: '#' };
    jest.clearAllMocks();
    
    component.onDownload();
    
    expect(window.open).not.toHaveBeenCalled();
  });

  it('should not have any console errors', () => {
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).not.toHaveBeenCalled();
  });
});
