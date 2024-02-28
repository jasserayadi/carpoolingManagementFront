import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from '../entity/FeedBack';
import { FeedbackService } from '../Services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!:FormGroup;
  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackForm = this.fb.group({
      feedBack: ['', Validators.required],
      rate: [null, Validators.required]
    });
  }

  submitFeedback() {
    const feedback: FeedBack = this.feedbackForm.value;
    this.feedbackService.addFeedback(feedback).subscribe(
        (response) => {
          console.log('Feedback added successfully:', response);
          // Do something with the successful response, e.g., redirect the user, show a success message, etc.
        },
        (error) => {
          console.error('Error adding feedback:', error);
          // Handle errors here, e.g., show an error message to the user
        }
    );
  }

  protected readonly onsubmit = onsubmit;
}
