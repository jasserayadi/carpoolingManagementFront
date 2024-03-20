import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CarpoolingService } from '../../../../Services/carpooling.service';
import { Carpooling } from '../../../../entity/Carpooling';
import { BookingService } from '../../../../Services/booking.service';
import { Booking } from '../../../../entity/Booking';
import * as L from 'leaflet';

@Component({
  selector: 'app-displayall-carpoolings',
  templateUrl: './displayall-carpoolings.component.html',
  styleUrls: ['./displayall-carpoolings.component.css']
})
export class DisplayallCarpoolingsComponent implements OnInit, AfterViewInit {

  carpoolings: Carpooling[] = [];
  newBooking: Booking = new Booking();

  constructor(private carpoolingService: CarpoolingService, private bookingService: BookingService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCarpools();
  }

  ngAfterViewInit(): void {
    // No need to initialize maps here
  }

  async initializeMaps(): Promise<void> {
    try {
      for (const carpool of this.carpoolings) {
        const latitudeDeparture = parseFloat(carpool.latitudeDeparture);
        const longitudeDeparture = parseFloat(carpool.longitudeDeparture);
        const latitudeDestination = parseFloat(carpool.latitudeDestination);
        const longitudeDestination = parseFloat(carpool.longitudeDestination);

        // Check if the coordinates are valid numbers
        if (isNaN(latitudeDeparture) || isNaN(longitudeDeparture) || isNaN(latitudeDestination) || isNaN(longitudeDestination)) {
          console.error('Invalid coordinates for carpooling:', carpool.carpoolingID);
          continue;  // Skip this carpooling and continue with the next one
        }

        const mapId = `map_${carpool.carpoolingID}`;
        const map = L.map(mapId, {
          center: [latitudeDeparture, longitudeDeparture],
          zoom: 10
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Fetch location names asynchronously
        const departureLocation = L.latLng(latitudeDeparture, longitudeDeparture);
        const destinationLocation = L.latLng(latitudeDestination, longitudeDestination);

        const departureName = await this.getLocationName(departureLocation);
        const destinationName = await this.getLocationName(destinationLocation);

        // Create custom icons for departure and destination markers
        const depIcon = L.icon({
          iconUrl: '/assets/backOffice/img/dep.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        });

        const destIcon = L.icon({
          iconUrl: '/assets/backOffice/img/dest.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        });

        // Add markers with custom icons and tooltips
        L.marker([latitudeDeparture, longitudeDeparture], { icon: depIcon })
          .addTo(map)
          .bindPopup('Departure Location')
          .bindTooltip(departureName, { direction: 'top', permanent: true })
          .openTooltip();

        L.marker([latitudeDestination, longitudeDestination], { icon: destIcon })
          .addTo(map)
          .bindPopup('Destination Location')
          .bindTooltip(destinationName, { direction: 'top', permanent: true })
          .openTooltip();

      }
    } catch (error) {
      console.error('Error initializing maps:', error);
    }
  }

  async getCarpools(): Promise<void> {
    try {
      const data = await this.carpoolingService.getAllCarpooling().toPromise();
      this.carpoolings = data;
      this.cd.detectChanges();  // Manually trigger change detection
      await this.initializeMaps();  // Initialize the maps here
    } catch (error) {
      console.error('Error getting carpools:', error);
      // Handle errors
    }
  }

  private async getLocationName(location: L.LatLng): Promise<string> {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.display_name) {
        return data.display_name;
      } else {
        return 'Location Name Not Found';
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      throw error;
    }
  }


  addBooking(carpoolingID: number): void {
    const newBooking = new Booking();
    newBooking.nb = this.newBooking.nb;

    this.bookingService.addBooking(newBooking, carpoolingID)
      .subscribe(
        () => {
          // Handle successful booking creation
          alert('Booking successfully added!');
        },
        (error) => {
          // Handle error
          alert('Failed to add booking. Please try again later.');
          console.error('Error adding booking:', error);
        }
      );
  }

  confirmDelete(carpoolingID: number): void {
    if (confirm('Are you sure you want to delete this carpooling?')) {
      this.deleteCarpooling(carpoolingID);
    }
  }

  deleteCarpooling(carpoolingId: number): void {
    this.carpoolingService.deleteCarpooling(carpoolingId).subscribe(
      () => {
        this.carpoolings = this.carpoolings.filter(carpool => carpool.carpoolingID !== carpoolingId);
        alert('Carpooling successfully deleted!');
      },
      (error) => {
        alert('Failed to delete carpooling. Please try again later.');
        console.error('Error deleting carpooling:', error);
      }
    );
  }
}
