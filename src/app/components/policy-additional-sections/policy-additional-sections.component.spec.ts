import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAdditionalSectionsComponent } from './policy-additional-sections.component';
import { Policy, PolicyContentItem, PolicyContentSection } from '../../shared/models/policy';

describe('PolicyAdditionalSectionsComponent', () => {
  let component: PolicyAdditionalSectionsComponent;
  let fixture: ComponentFixture<PolicyAdditionalSectionsComponent>;

  // Mock data for testing
  const mockPolicyContentItems: PolicyContentItem[] = [
    {
      id: 'item-1',
      title: 'Test Item 1',
      description: 'Description for test item 1',
      icon: 'icon-1'
    },
    {
      id: 'item-2',
      title: 'Test Item 2',
      description: 'Description for test item 2',
      icon: 'icon-2'
    }
  ];

  const mockPolicyContentSections: PolicyContentSection[] = [
    {
      id: 'section-1',
      introText: 'Intro text for section 1',
      items: mockPolicyContentItems
    },
    {
      id: 'section-2',
      introText: 'Intro text for section 2',
      items: []
    }
  ];

  const mockPolicy: Policy = {
    id: 'policy-1',
    path: 'test-policy',
    title: 'Test Policy',
    imageUrl: '/test-image.jpg',
    routerLink: '/test-policy',
    imageAlt: 'Test image',
    dataSrcDesktop1x: '/test-desktop.jpg',
    dataSrcMobile1x: '/test-mobile.jpg',
    heroTitle: 'Test Hero Title',
    heroBackgroundImage: '/hero-bg.jpg',
    subtitle: 'Test Subtitle',
    code: 'TP-001',
    version: '1.0',
    revisionDate: '2024-01-01',
    contentTitle: 'Test Content Title',
    contentDescription: 'Test content description',
    contentIntroText: 'Test intro text',
    contentItems: mockPolicyContentItems,
    listStyle: 'checkmarks',
    contentSections: mockPolicyContentSections
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyAdditionalSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyAdditionalSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should have policy input as null by default', () => {
      expect(component.policy).toBeNull();
    });

    it('should accept policy input', () => {
      component.policy = mockPolicy;
      expect(component.policy).toBe(mockPolicy);
    });

    it('should handle null policy input', () => {
      component.policy = null;
      expect(component.policy).toBeNull();
    });
  });

  describe('trackByContentItemId function', () => {
    it('should return the id of a PolicyContentItem', () => {
      const testItem: PolicyContentItem = mockPolicyContentItems[0];
      const result = component.trackByContentItemId(0, testItem);
      
      expect(result).toBe('item-1');
      expect(result).toBe(testItem.id);
    });

    it('should return different ids for different items', () => {
      const item1 = mockPolicyContentItems[0];
      const item2 = mockPolicyContentItems[1];
      
      const result1 = component.trackByContentItemId(0, item1);
      const result2 = component.trackByContentItemId(1, item2);
      
      expect(result1).toBe('item-1');
      expect(result2).toBe('item-2');
      expect(result1).not.toBe(result2);
    });

    it('should return the same id for the same item regardless of index', () => {
      const testItem = mockPolicyContentItems[0];
      
      const result1 = component.trackByContentItemId(0, testItem);
      const result2 = component.trackByContentItemId(5, testItem);
      
      expect(result1).toBe(result2);
      expect(result1).toBe('item-1');
    });

    it('should work with items that have only required properties', () => {
      const minimalItem: PolicyContentItem = {
        id: 'minimal-item',
        description: 'Minimal item description'
      };
      
      const result = component.trackByContentItemId(0, minimalItem);
      expect(result).toBe('minimal-item');
    });
  });

  describe('trackByContentSectionId function', () => {
    it('should return the id of a PolicyContentSection', () => {
      const testSection = mockPolicyContentSections[0];
      const result = component.trackByContentSectionId(0, testSection);
      
      expect(result).toBe('section-1');
      expect(result).toBe(testSection.id);
    });

    it('should return different ids for different sections', () => {
      const section1 = mockPolicyContentSections[0];
      const section2 = mockPolicyContentSections[1];
      
      const result1 = component.trackByContentSectionId(0, section1);
      const result2 = component.trackByContentSectionId(1, section2);
      
      expect(result1).toBe('section-1');
      expect(result2).toBe('section-2');
      expect(result1).not.toBe(result2);
    });

    it('should return the same id for the same section regardless of index', () => {
      const testSection = mockPolicyContentSections[0];
      
      const result1 = component.trackByContentSectionId(0, testSection);
      const result2 = component.trackByContentSectionId(3, testSection);
      
      expect(result1).toBe(result2);
      expect(result1).toBe('section-1');
    });

    it('should work with sections that have empty items array', () => {
      const testSection = mockPolicyContentSections[1]; // This one has empty items array
      const result = component.trackByContentSectionId(0, testSection);
      
      expect(result).toBe('section-2');
    });

    it('should work with sections that have minimal properties', () => {
      const minimalSection: PolicyContentSection = {
        id: 'minimal-section',
        items: []
      };
      
      const result = component.trackByContentSectionId(0, minimalSection);
      expect(result).toBe('minimal-section');
    });
  });

  describe('Integration tests', () => {
    it('should handle policy with contentSections', () => {
      component.policy = mockPolicy;
      fixture.detectChanges();
      
      expect(component.policy.contentSections).toBeDefined();
      expect(component.policy.contentSections!.length).toBe(2);
    });

    it('should handle policy without contentSections', () => {
      const policyWithoutSections: Policy = { ...mockPolicy };
      delete policyWithoutSections.contentSections;
      
      component.policy = policyWithoutSections;
      fixture.detectChanges();
      
      expect(component.policy.contentSections).toBeUndefined();
    });

    it('should work with trackBy functions in realistic scenarios', () => {
      // Simulate what Angular would do when using trackBy in ngFor
      const sections = mockPolicyContentSections;
      const items = mockPolicyContentItems;
      
      // Test trackBy for sections
      const sectionTrackResults = sections.map((section, index) => 
        component.trackByContentSectionId(index, section)
      );
      expect(sectionTrackResults).toEqual(['section-1', 'section-2']);
      
      // Test trackBy for items
      const itemTrackResults = items.map((item, index) => 
        component.trackByContentItemId(index, item)
      );
      expect(itemTrackResults).toEqual(['item-1', 'item-2']);
    });

    it('should maintain trackBy consistency across multiple calls', () => {
      const testItem = mockPolicyContentItems[0];
      const testSection = mockPolicyContentSections[0];
      
      // Multiple calls should return consistent results
      for (let i = 0; i < 5; i++) {
        expect(component.trackByContentItemId(i, testItem)).toBe('item-1');
        expect(component.trackByContentSectionId(i, testSection)).toBe('section-1');
      }
    });
  });
});
