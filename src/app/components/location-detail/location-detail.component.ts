import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '../../shared/models/location';
import { LocationsService } from '../../shared/services/locations.service';

@Component({
  selector: 'app-location-detail',
  imports: [CommonModule],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss'
})
export class LocationDetailComponent implements OnInit {
  @Input() location!: Location;
  @Input() showTitle: boolean = true;

  mapUrl: SafeResourceUrl | null = null;

  constructor(
    private locationsService: LocationsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadLocationData();
  }

  private loadLocationData(): void {
    if (this.location) {
      const mapUrlString = this.locationsService.getMapUrl(this.location);
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrlString);
    }
  }
}
