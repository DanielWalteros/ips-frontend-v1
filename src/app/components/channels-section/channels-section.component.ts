import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChannelCardComponent } from '../service-channel-card/service-channel-card.component';
import { ServiceChannel } from '../../shared/models/service-channel';
import { ServiceChannelsService } from '../../shared/services/service-channels.service';

@Component({
  selector: 'app-channels-section',
  standalone: true,
  imports: [CommonModule, ServiceChannelCardComponent],
  templateUrl: './channels-section.component.html',
  styleUrl: './channels-section.component.scss'
})
export class ChannelsSectionComponent implements OnInit {
  serviceChannels: ServiceChannel[] = [];

  constructor(private serviceChannelsService: ServiceChannelsService) {}

  ngOnInit(): void {
    this.serviceChannelsService.getAllServiceChannels().subscribe(channels => {
      this.serviceChannels = channels;
    });
  }
}
