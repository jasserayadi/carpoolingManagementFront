import { Component } from '@angular/core';
import {FeedbackService} from "./Services/feedback.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTCOEXIST';
    constructor(private feedbackService: FeedbackService) {
 }

}
