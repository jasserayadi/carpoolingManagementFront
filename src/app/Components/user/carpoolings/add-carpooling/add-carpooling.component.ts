import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarpoolingService } from '../../../../Services/carpooling.service';
import { Carpooling } from '../../../../entity/Carpooling';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-add-carpooling',
  templateUrl: './add-carpooling.component.html',
  styleUrls: ['./add-carpooling.component.css']
})
export class AddCarpoolingComponent implements OnInit, AfterViewInit {
  carpoolingForm!: FormGroup;
  carpoolingType = ['DAILY', 'SPECIFIC'];

  map: any;
  departureMarker: any;
  destinationMarker: any;

  constructor(private fb: FormBuilder, private carpoolingService: CarpoolingService) { }

  ngOnInit(): void {
    this.carpoolingForm = this.fb.group({
      availableSeats: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPerSeat: [null, [Validators.required, Validators.min(0), Validators.max(99999)]],
      carpoolingType: ['', Validators.required],
      day: [null],
      time: [null],
      departureTime: [null],
      registrationNumber: [null, Validators.required],
      longitudeDeparture: [null],
      latitudeDeparture: [null],
      longitudeDestination: [null],
      latitudeDestination: [null]
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '...' })
      ]
    });

    this.map.on('click', (e: any) => this.onMapClick(e));
    const geocoder1 = (<any>L.Control).geocoder().addTo(this.map);
  }

  async onMapClick(e: any) {
    if (!this.departureMarker) {
      if (confirm('Is this the departure location?')) {
        this.departureMarker = L.marker(e.latlng, { draggable: true, icon: this.getDepartureIcon() }).addTo(this.map);
        this.carpoolingForm.patchValue({
          longitudeDeparture: e.latlng.lng.toFixed(6),
          latitudeDeparture: e.latlng.lat.toFixed(6)
        });
        const locationName = await this.getLocationName(e.latlng);
        this.departureMarker.bindPopup(locationName).openPopup();
        this.departureMarker.on('dragend', async (event: any) => {
          const marker = event.target;
          const position = marker.getLatLng();
          this.carpoolingForm.patchValue({
            longitudeDeparture: position.lng.toFixed(6),
            latitudeDeparture: position.lat.toFixed(6)
          });
          const locationName = await this.getLocationName(position);
          marker.setPopupContent(locationName).openPopup();
        });
      }
    } else {
      if (confirm('Is this the destination location?')) {
        if (this.destinationMarker) {
          this.map.removeLayer(this.destinationMarker);
        }
        this.destinationMarker = L.marker(e.latlng, { draggable: true, icon: this.getDestinationIcon() }).addTo(this.map);
        this.carpoolingForm.patchValue({
          longitudeDestination: e.latlng.lng.toFixed(6),
          latitudeDestination: e.latlng.lat.toFixed(6)
        });
        const locationName = await this.getLocationName(e.latlng);
        this.destinationMarker.bindPopup(locationName).openPopup();
        this.destinationMarker.on('dragend', async (event: any) => {
          const marker = event.target;
          const position = marker.getLatLng();
          this.carpoolingForm.patchValue({
            longitudeDestination: position.lng.toFixed(6),
            latitudeDestination: position.lat.toFixed(6)
          });
          const locationName = await this.getLocationName(position);
          marker.setPopupContent(locationName).openPopup();
        });
      }
    }
  }

  private async getLocationName(location: L.LatLng): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.display_name) {
            resolve(data.display_name);
          } else {
            reject('Location name not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getDepartureIcon() {
    return L.icon({
      iconUrl: '/assets/backOffice/img/dep.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -30] // Adjust the vertical offset as needed
    });
  }

  private getDestinationIcon() {
    return L.icon({
      iconUrl: '/assets/backOffice/img/dest.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -30] // Adjust the vertical offset as needed
    });
  }

  addCarpooling(): void {
    const carpoolingData: Carpooling = this.carpoolingForm.value;
    if (this.carpoolingForm.valid) {
      this.carpoolingService.addCarpooling(carpoolingData).subscribe(
        (response: any) => {
          console.log(response);
          alert('Success! Carpooling data added.');
          this.carpoolingForm.reset();
        },
        (error) => {
          console.error(error);
          alert('Failed to add carpooling data. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
