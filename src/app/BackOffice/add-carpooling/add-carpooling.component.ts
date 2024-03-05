import {Component, OnInit, ViewChild} from '@angular/core';
import { CarpoolingService } from '../../Services/carpooling.service';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { Carpooling } from '../../entity/Carpooling';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-carpooling',
  templateUrl: './add-carpooling.component.html',
  styleUrls: ['./add-carpooling.component.css']
})
export class AddCarpoolingComponent implements OnInit {
  carpoolingForm!: FormGroup;
  carpoolingType = ['DAILY', 'SPECIFIC'];
  @ViewChild('carpoolingForm') formDirective!: FormGroupDirective;

  constructor(private fb: FormBuilder, private carpoolingService: CarpoolingService) { }

  ngOnInit(): void {
    this.carpoolingForm = this.fb.group({
      longitudeDeparture: ['', Validators.required],
      latitudeDeparture: ['', Validators.required],
      longitudeDestination: ['', Validators.required],
      latitudeDestination: ['', Validators.required],
      availableSeats: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPerSeat: [null, [Validators.required, Validators.min(0), Validators.max(99999)]],
      carpoolingType: ['', Validators.required],
      day: [null, ],
      time: [null, ],
      departureTime: [null,],
      registrationNumber: [null, Validators.required]
    });

  }
  //getAvailableSeats(){
   // return this.carpoolingForm.get('fb')
 // }


    addCarpooling(): void {
        const carpoolingData: Carpooling = this.carpoolingForm.value;
        if (this.carpoolingForm.valid) {
            this.carpoolingService.addCarpooling(carpoolingData).subscribe(
                (response: any) => {
                    console.log(response);
                    alert('Success! Carpooling data added.');
                    this.carpoolingForm.reset();
                },
                (error) => {
                    console.error(error);
                    alert('Failed to add carpooling data. Please try again.');
                }
            );
        } else {
            alert('Please fill in all required fields.');
        }
    }

}
