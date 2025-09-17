import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformationCard } from '../../shared/models/information-card';
import { InformationCardsService } from '../../shared/services/information-cards.service';

@Component({
  selector: 'app-information-relevant-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './information-relevant-section.component.html',
  styleUrl: './information-relevant-section.component.scss'
})
export class InformationRelevantSectionComponent implements OnInit {
  informationCards: InformationCard[] = [];

  constructor(private informationCardsService: InformationCardsService) {}

  ngOnInit(): void {
    this.informationCardsService.getAllInformationCards().subscribe(cards => {
      this.informationCards = cards;
    });
  }
}
