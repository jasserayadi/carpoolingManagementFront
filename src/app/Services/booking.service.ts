import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Carpooling} from "../entity/Carpooling";
import {Observable} from "rxjs";
import {Booking} from "../entity/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }
  addBooking(booking: Booking, carpoolingID: number): Observable<Booking> {
    // Adjust the endpoint according to your API
    return this.http.post<Booking>(`${this.baseUrl}addBooking/${carpoolingID}`, booking);}

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'getALLBooking');
  }


  deleteBooking(bookingId: number): Observable<void> {
    const url = `${this.baseUrl}deleteBooking/${bookingId}`;
    return this.http.delete<void>(url);
  }

}

