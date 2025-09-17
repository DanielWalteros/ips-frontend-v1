import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InformationCard } from '../../shared/models/information-card';
import { InformationCardsService } from '../../shared/services/information-cards.service';
import { BreadcrumbConfig } from '../../shared/models/breadcrumb';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { InformationHeaderComponent } from '../../components/information-header/information-header.component';
import { InformationContentComponent } from '../../components/information-content/information-content.component';

@Component({
  selector: 'app-information-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, InformationHeaderComponent, InformationContentComponent],
  templateUrl: './information-detail.component.html',
  styleUrl: './information-detail.component.scss'
})
export class InformationDetailComponent implements OnInit {
  informationCard: InformationCard | undefined;
  isLoading = true;
  breadcrumbConfig: BreadcrumbConfig | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private informationCardsService: InformationCardsService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.params['path'];
    
    this.informationCardsService.getInformationCardByPath(path).subscribe({
      next: (card) => {
        this.informationCard = card;
        this.isLoading = false;
        
        if (!card) {
          // Redirigir a la página principal de guía de usuario si no se encuentra la tarjeta
          this.router.navigate(['/guia-para-el-usuario']);
        } else {
          this.breadcrumbConfig = this.generateBreadcrumbConfig(card);
        }
      },
      error: () => {
        this.isLoading = false;
        // Redirigir en caso de error
        this.router.navigate(['/guia-para-el-usuario']);
      }
    });
  }

  /**
   * Generate breadcrumb configuration for information card
   */
  private generateBreadcrumbConfig(card: InformationCard): BreadcrumbConfig {
    return {
      items: [
        {
          label: 'Guía del usuario',
          routerLink: '/guia-para-el-usuario',
          isActive: false
        },
        {
          label: card.breadcrumbTitle,
          isActive: true
        }
      ],
      ariaLabel: 'Navegación de guía del usuario'
    };
  }
}
