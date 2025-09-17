import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyHeroComponent } from './policy-hero.component';

describe('PolicyHeroComponent', () => {
  let component: PolicyHeroComponent;
  let fixture: ComponentFixture<PolicyHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
