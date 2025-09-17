import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../shared/services/policy.service';
import { Policy } from '../../shared/models/policy';
import { BreadcrumbConfig } from '../../shared/models/breadcrumb';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { PolicyHeroComponent } from '../../components/policy-hero/policy-hero.component';
import { PolicyContentComponent } from '../../components/policy-content/policy-content.component';
import { PolicyAdditionalSectionsComponent } from '../../components/policy-additional-sections/policy-additional-sections.component';

@Component({
  selector: 'app-policy-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    PolicyHeroComponent,
    PolicyContentComponent,
    PolicyAdditionalSectionsComponent
  ],
  templateUrl: './policy-detail.component.html',
  styleUrl: './policy-detail.component.scss'
})
export class PolicyDetailComponent implements OnInit {
  policyPath: string | null = null;
  policy: Policy | null = null;
  isLoading: boolean = true;
  breadcrumbConfig: BreadcrumbConfig | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.policyPath = this.route.snapshot.paramMap.get('policyId');
    
    if (this.policyPath) {
      this.loadPolicy(this.policyPath);
    } else {
      this.redirectToHome();
    }
  }

  private loadPolicy(path: string): void {
    this.policyService.getPolicyByPath(path).subscribe({
      next: (policy) => {
        if (policy) {
          this.policy = policy;
          this.breadcrumbConfig = this.generateBreadcrumbConfig(policy);
          this.isLoading = false;
        } else {
          this.redirectToHome();
        }
      },
      error: () => {
        this.redirectToHome();
      }
    });
  }

  private generateBreadcrumbConfig(policy: Policy): BreadcrumbConfig {
    return {
      items: [
        {
          label: 'Sobre nuestra IPS',
          routerLink: '/sobre-nuestra-ips',
          isActive: false
        },
        {
          label: policy.title,
          isActive: true
        }
      ],
      ariaLabel: 'Navegación de políticas'
    };
  }

  private redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
