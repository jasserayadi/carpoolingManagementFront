import {Component, OnInit} from '@angular/core';
import {FeedBack} from "../../../../entity/FeedBack";
import {FeedbackService} from "../../../../Services/feedback.service";

@Component({
  selector: 'app-display-all-feedbacks',
  templateUrl: './display-all-feedbacks.component.html',
  styleUrls: ['./display-all-feedbacks.component.css']
})
export class DisplayAllFeedbacksComponent implements OnInit{
  feedbacks: FeedBack[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadAllFeedbacks();
  }

  loadAllFeedbacks(): void {
    this.feedbackService.getAllFeedback()
      .subscribe(
        feedbacks => {
          this.feedbacks = feedbacks;
        },
        error => {
          console.log('Error fetching feedbacks:', error);
        }
      );
  }
}
