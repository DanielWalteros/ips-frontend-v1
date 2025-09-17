import { TestBed } from '@angular/core/testing';
import { PolicyService } from './policy.service';
import { Policy } from '../shared/models/policy';

describe('PolicyService', () => {
  let service: PolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all policies', (done) => {
    service.getAllPolicies().subscribe(policies => {
      expect(policies).toBeDefined();
      expect(policies.length).toBe(4);
      expect(policies[0].id).toBe('quality-policy');
      expect(policies[1].id).toBe('humanization-policy');
      expect(policies[2].id).toBe('environmental-policy');
      expect(policies[3].id).toBe('patient-safety-policy');
      done();
    });
  });

  it('should return policy by path', (done) => {
    service.getPolicyByPath('politica-de-calidad').subscribe(policy => {
      expect(policy).toBeDefined();
      expect(policy?.id).toBe('quality-policy');
      expect(policy?.title).toBe('Política de calidad');
      expect(policy?.path).toBe('politica-de-calidad');
      done();
    });
  });

  it('should return undefined for non-existent path', (done) => {
    service.getPolicyByPath('politica-inexistente').subscribe(policy => {
      expect(policy).toBeUndefined();
      done();
    });
  });

  it('should return policy by id', (done) => {
    service.getPolicyById('humanization-policy').subscribe(policy => {
      expect(policy).toBeDefined();
      expect(policy?.id).toBe('humanization-policy');
      expect(policy?.title).toBe('Política de humanización');
      expect(policy?.path).toBe('politica-de-humanizacion');
      done();
    });
  });

  it('should return undefined for non-existent id', (done) => {
    service.getPolicyById('non-existent-policy').subscribe(policy => {
      expect(policy).toBeUndefined();
      done();
    });
  });

  it('should check if policy exists by path', (done) => {
    service.policyExists('politica-ambiental').subscribe(exists => {
      expect(exists).toBe(true);
      done();
    });
  });

  it('should return false for non-existent policy path', (done) => {
    service.policyExists('politica-inexistente').subscribe(exists => {
      expect(exists).toBe(false);
      done();
    });
  });

  it('should have all policies with correct structure', (done) => {
    service.getAllPolicies().subscribe(policies => {
      policies.forEach(policy => {
        expect(policy.id).toBeDefined();
        expect(policy.path).toBeDefined();
        expect(policy.title).toBeDefined();
        expect(policy.imageUrl).toBeDefined();
        expect(policy.routerLink).toBeDefined();
        expect(policy.dataSrcDesktop1x).toBeDefined();
        expect(policy.dataSrcMobile1x).toBeDefined();
        expect(policy.routerLink).toContain('/sobre-nuestra-ips/');
      });
      done();
    });
  });
});
