import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedBack} from "../entity/FeedBack";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl:string='http://localhost:8000'
  constructor(private http:HttpClient) { }

  addFeedback(feedBack: FeedBack): Observable<FeedBack> {
    return this.http.post<FeedBack>(`${this.baseUrl}/addFeedback`, feedBack);
  }
  getAllFeedback(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(`${this.baseUrl}/getAllFeedback`);
  }





}
