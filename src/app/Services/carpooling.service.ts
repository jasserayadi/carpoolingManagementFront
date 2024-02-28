import { Injectable } from '@angular/core';
import {FeedBack} from "../entity/FeedBack";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Carpooling} from "../entity/Carpooling";

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  addCarpooling(carpooling: Carpooling): Observable<Carpooling> {
    return this.http.post<Carpooling>(this.baseUrl + 'addCarpooling', carpooling);
  }
}
