import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChannel } from '../../shared/models/service-channel';

@Component({
  selector: 'app-service-channel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-channel-card.component.html',
  styleUrl: './service-channel-card.component.scss'
})
export class ServiceChannelCardComponent {
  @Input() channel!: ServiceChannel;

  getFormattedDescription(): string {
    if (!this.channel.linkUrl || !this.channel.linkText) {
      return this.channel.description;
    }

    const target = this.channel.linkTarget === '_blank' ? ' target="_blank"' : '';
    const linkHtml = `<a href="${this.channel.linkUrl}" ${target}>${this.channel.linkText}</a>`;
    
    // Replace placeholder in description with actual link
    return this.channel.description.replace('{{LINK}}', linkHtml);
  }
}
