import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {Booking} from "../../entity/Booking";
import {BookingService} from "../../Services/booking.service";
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import {Carpooling} from "../../entity/Carpooling";
import {CarpoolingType} from "../../entity/CarpoolingType";
import {CarpoolingService} from "../../Services/carpooling.service"; // Import the geocoder control

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.css']
})
export class DynamicContentComponent implements AfterViewInit{
  bookings: Booking[] = [];
  totalBookingNumber: number = 0;
  myHeaders: Headers = new Headers();
  raw: string;
  requestOptions: RequestInit;
  carpoolings: Carpooling[] = [];
  newBooking: Booking = new Booking();
  departureLocationNames: string[] = [];
  destinationLocationNames: string[] = [];
  selectedCarpoolingType: CarpoolingType; // Variable to store the selected carpooling type
// Inside your component class
  carpoolingTypes: CarpoolingType[] = [CarpoolingType.SPECIFIC, CarpoolingType.DAILY]; // Replace with your actual carpooling types
  departureLocationFilter: string = '';

  // Chart options

  daily :number=0;
  specifics:number=0;
  chartData: any[];
  colorScheme = { domain: ['#5AA454', '#C7B42C'] };
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  constructor(private carpoolingService: CarpoolingService, private bookingService: BookingService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe(data => {
      console.log('Received bookings:', data);
      this.bookings = data;
      this.calculateTotalBookingNumber();
      this.getCarpools();
    });
  }


  calculateTotalBookingNumber(): void {
    this.totalBookingNumber = this.bookings.reduce((total, booking) => total + booking.nb, 0);
  }
  confirmDelete(bookingId: number): void {
    if (confirm("Are you sure you want to delete this carpooling?")) {
      this.deleteBooking(bookingId);
    }
  }
  deleteBooking(bookingId: number): void {
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        // Booking deleted successfully, remove it from the list
        this.bookings = this.bookings.filter(booking => booking.bookingID !== bookingId);

      },
      (error) => {
        console.error('Error deleting booking:', error);

      }
    );
  }
  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([14.094167, -87.206667], 15);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // First search bar

    // Second search bar
    const geocoder2 = (L.Control as any).geocoder().addTo(this.map);

    // Position the search bars
    const search1 = document.getElementsByClassName('leaflet-control-geocoder leaflet-control') as HTMLCollectionOf<HTMLElement>;
  }
  async getCarpools(): Promise<void> {
    try {
      const data = await this.carpoolingService.getAllCarpooling().toPromise();

      const departureLocationNames: string[] = []; // Array to store departure location names
      for (const carpool of data) {
        const departureLocation = L.latLng(parseFloat(carpool.latitudeDeparture), parseFloat(carpool.longitudeDeparture));
        // Fetch and store departure location name
        departureLocationNames.push(await this.getLocationName(departureLocation));
        if (carpool.carpoolingType === CarpoolingType.DAILY) {
          this.daily++;
        } else if (carpool.carpoolingType === CarpoolingType.SPECIFIC) {
          this.specifics++;
        }
      }
      this.chartData = [
        { name: 'DAILY', value: this.daily },
        { name: 'SPECIFIC', value: this.specifics }
      ];
      this.carpoolings = data;
      this.departureLocationNames = departureLocationNames; // Assign departure location names to component property
      this.cd.detectChanges();  // Manually trigger change detection
      await this.initializeMaps();
    } catch (error) {
      console.error('Error getting carpools:', error);
      // Handle errors
    }

  }
  updateChartData(): void {
    this.chartData = [
      { name: 'DAILY', value: this.daily },
      { name: 'SPECIFIC', value: this.specifics }
    ];
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
          zoom: 15
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
        L.marker([latitudeDeparture, longitudeDeparture], {icon: depIcon})
          .addTo(map)
          .bindPopup('Departure Location')
          .bindTooltip(departureName, {direction: 'top', permanent: true})
          .openTooltip();

        // Add destination marker with custom icon and tooltip
        L.marker([latitudeDestination, longitudeDestination], {icon: destIcon})
          .addTo(map)
          .bindPopup('Destination Location')
          .bindTooltip(destinationName, {direction: 'top', permanent: true})  // Ensure destination name is bound
          .openTooltip();

        // Create a routing control
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(latitudeDeparture, longitudeDeparture),
            L.latLng(latitudeDestination, longitudeDestination)
          ], routeWhileDragging: true,
          geocoder: (<any>L.Control).Geocoder.nominatim(),
          router: new L.Routing.OSRMv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          formatter: new L.Routing.Formatter(),
          createControl: false  // Prevent the creation of the control panel
        });

        // Add the routing control to the map
        routingControl.addTo(map);

        // Remove the route instructions control from the map
        const routeInstructionsContainer = routingControl.getContainer();
        if (routeInstructionsContainer) {
          map.removeControl(routeInstructionsContainer);
        }
      }
    } catch (error) {
      console.error('Error initializing maps:', error);
    }
  }
}
