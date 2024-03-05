import { Component } from '@angular/core';
import {Booking} from "../../entity/Booking";
import {BookingService} from "../../Services/booking.service";



@Component({
  selector: 'app-display-all-booking',
  templateUrl: './display-all-booking.component.html',
  styleUrls: ['./display-all-booking.component.css']
})
export class DisplayAllBookingComponent {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe(data => {
      this.bookings = data;
  });}
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



}
