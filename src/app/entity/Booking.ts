// Booking.ts
import {Carpooling} from "./Carpooling";
import {FeedBack} from "./FeedBack";

export class Booking {
  BookingID!: number;
  nb!: number;
  carpooling!: Carpooling; // Assuming you have a Carpooling class
  //user: User; // Assuming you have a User class
  feedBack!: FeedBack; // Assuming you have a FeedBack class
}
