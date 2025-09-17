import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyCardComponent } from '../policy-card/policy-card.component';
import { Policy } from '../../shared/models/policy';
import { PolicyService } from '../../shared/services/policy.service';

@Component({
  selector: 'app-institutional-policies-section',
  standalone: true,
  imports: [CommonModule, PolicyCardComponent],
  templateUrl: './institutional-policies-section.component.html',
  styleUrl: './institutional-policies-section.component.scss'
})
export class InstitutionalPoliciesSectionComponent implements OnInit {
  institutionalPolicies: Policy[] = [];
  isLoading: boolean = true;
  
  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  private loadPolicies(): void {
    this.policyService.getAllPolicies().subscribe({
      next: (policies) => {
        this.institutionalPolicies = policies;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
