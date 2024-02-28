// Carpooling.ts
import {CarpoolingType} from "./CarpoolingType";
import {Day} from "./Day";
import {Booking} from "./Booking";

export class Carpooling {
  carpoolingID!: number;
  departureTime!: string;
  longitudeDeparture!: string;
  latitudeDeparture!: string;
  longitudeDestination!: string;
  latitudeDestination!: string;
  availableSeats!: number;
  costPerSeat!: number;
  day!: Day; // Enum type
  time!:String;
  carpoolingType!: CarpoolingType; // Enum type
  registrationNumber!: number;
  //user!: User; // Assuming you have a User class
  bookings!: Booking[]; // Assuming you have a Booking class
}
