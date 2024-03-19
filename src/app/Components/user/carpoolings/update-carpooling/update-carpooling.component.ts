import { Component, OnInit } from '@angular/core';
import { Carpooling } from "../../../../entity/Carpooling";
import { CarpoolingService } from "../../../../Services/carpooling.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-update-carpooling',
    templateUrl: './update-carpooling.component.html',
    styleUrls: ['./update-carpooling.component.css']
})
export class UpdateCarpoolingComponent implements OnInit {
    carpoolingID: any;
    carpoolingForm!: FormGroup;
    carpooling: Carpooling = new Carpooling();

    constructor(
        private fb: FormBuilder,
        private carpoolingService: CarpoolingService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.carpoolingID = this.activatedRoute.snapshot.params['carpoolingID'];
        this.carpoolingForm = this.fb.group({
            longitudeDeparture: ['', Validators.required],
            latitudeDeparture: ['', Validators.required],
            longitudeDestination: ['', Validators.required],
            latitudeDestination: ['', Validators.required],
            availableSeats: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
            costPerSeat: [null, [Validators.required, Validators.min(0), Validators.max(99999)]],
            carpoolingType: ['', Validators.required],
            day: [null],
            time: [null],
            departureTime: [null],
            registrationNumber: [null, Validators.required]
        });
        this.findCarpoolingById();
    }

    findCarpoolingById() {
        this.carpoolingService.findCarpooling(this.carpoolingID).subscribe((res)=>{
            console.log(res);
            this.carpoolingForm.patchValue(res);
        });
    }
    updateCarpooling() {
        if (this.carpoolingForm.valid) {

            this.carpoolingService.updateCarpooling(this.carpoolingID, this.carpoolingForm.value).subscribe((res: any) => {
                console.log(res);
            });
            alert("update done");
        } else {
            alert("update failed");
        }
    }


    }
