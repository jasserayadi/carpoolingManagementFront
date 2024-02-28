import {Component, OnInit} from '@angular/core';
import {CarpoolingService} from "../../Services/carpooling.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Carpooling} from "../../entity/Carpooling";

@Component({
  selector: 'app-add-carpooling',
  templateUrl: './add-carpooling.component.html',
  styleUrls: ['./add-carpooling.component.css']
})
export class AddCarpoolingComponent implements OnInit {
    carpoolingForm!: FormGroup;

    constructor(private fb: FormBuilder, private carpoolingService: CarpoolingService) { }

    ngOnInit(): void {
        this.carpoolingForm = this.fb.group({
            departureTime: ['', Validators.required],
            longitudeDeparture: [''],
            latitudeDestination: [''],
            latitudeDeparture: [''],
            longitudeDestination: [''],
            availableSeats: [null, Validators.required],
            costPerSeat: [null, Validators.required],
            day: [null, Validators.required],
            time: [null, Validators.required],
            carpoolingType: [null, Validators.required],
            registrationNumber: ['', Validators.required],
        });
    }

    addCarpooling(): void {
        const carpoolingData: Carpooling = this.carpoolingForm.value;

        this.carpoolingService.addCarpooling(carpoolingData).subscribe(
            (response: any) => {
                console.log(response);
                // Handle successful response here, e.g., show a success message
            },
            (error) => {
                console.error(error);
                // Handle error, e.g., show an error message
            }
        );
    }
}
