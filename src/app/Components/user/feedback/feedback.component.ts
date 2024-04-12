import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from '../../../entity/FeedBack';
import { FeedbackService } from '../../../Services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup; // Define a FormGroup
  feedback: FeedBack = new FeedBack();
  submitted: boolean = false; // Flag to track form submission

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) { }

  ngOnInit() {
    // Initialize the form group
    this.feedbackForm = this.fb.group({
      feed_Back: ['', Validators.required], // Add validators if needed
      rate: ['', Validators.required] // Add validators if needed
      // Add more form controls for other properties if needed
    });
  }

  addFeedback() {
    // Assign form values to feedback object
    this.feedback.feed_Back = this.feedbackForm.get('feed_Back').value;
    this.feedback.rate = this.feedbackForm.get('rate').value;

    // Add logic to set other properties of feedback object if needed

    this.feedbackService.addFeedback(this.feedback).subscribe(response => {
      // Handle successful feedback addition
      console.log('Feedback added:', response);
      this.submitted = true; // Set submitted flag to true
      // You can also redirect or show a success message here
    }, error => {
      // Handle error
      console.error('Error adding feedback:', error);
      // You can also show an error message to the user
    });
  }
}
