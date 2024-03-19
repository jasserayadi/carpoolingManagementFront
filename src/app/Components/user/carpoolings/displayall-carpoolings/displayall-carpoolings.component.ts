import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CarpoolingService} from "../../../../Services/carpooling.service";
import {Carpooling} from "../../../../entity/Carpooling";
import {BookingService} from "../../../../Services/booking.service";
import {Booking} from "../../../../entity/Booking";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-displayall-carpoolings',
  templateUrl: './displayall-carpoolings.component.html',
  styleUrls: ['./displayall-carpoolings.component.css']
})
export class DisplayallCarpoolingsComponent {

  carpoolings!: Carpooling[];
  //newBooking: Booking = new Booking();
  newBooking: Booking = new Booking();
  newCarpooling: Carpooling=new Carpooling();




  constructor(private carpoolingService: CarpoolingService,private bookingService: BookingService)  { }

  ngOnInit() {
    this.getCarpools();

  }

  getCarpools() {
    this.carpoolingService.getAllCarpooling().subscribe(
      data => {
        this.carpoolings = data;
      },
      error => {
        console.error('Error getting carpools:', error);
        // Handle errors
      }
    );
  }
  addBooking(carpoolingID: number): void {
    const newBooking = new Booking();
    newBooking.nb = this.newBooking.nb;

    this.bookingService.addBooking(newBooking, carpoolingID)
        .subscribe(
            (booking) => {
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
    if (confirm("Are you sure you want to delete this carpooling?")) {
      this.deleteCarpooling(carpoolingID);
    }
  }


  deleteCarpooling(carpoolingId: number): void {
    this.carpoolingService.deleteCarpooling(carpoolingId).subscribe(
      () => {
        this.carpoolings = this.carpoolings.filter(carpool => carpool.carpoolingID !== carpoolingId);
        alert('Booking successfully delated!');
        // Carpooling deleted successfully, perform any necessary actions here
      },
      (error) => {
        alert('Failed to add booking. Please try again later.');
        console.error('Error deleting carpooling:', error);
      }
    );
  }
/*  deleteBooking(bookingId: number): void {
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        // Booking deleted successfully, remove it from the list
        this.bookings = this.bookings.filter(booking => booking.bookingID !== bookingId);

      },
      (error) => {
        console.error('Error deleting booking:', error);

      }
    );
  }*/


}
