import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../../services/tickets/ticket.service";

@Component({
	selector: 'app-tour-loader',
	templateUrl: './tour-loader.component.html',
	styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {

	tourForm: FormGroup;

	constructor(private ticketService: TicketService) {
	}

	ngOnInit(): void {

		this.tourForm = new FormGroup({
			name: new FormControl('', {validators: Validators.required}),
			description: new FormControl('', {validators: Validators.minLength(10)}),
			operator: new FormControl(),
			price: new FormControl(),
			location: new FormControl(),
			img: new FormControl()
		})
	}

	createTour(): void {
		const tourDataRow = this.tourForm.getRawValue();
		let formParams = new FormData();
		if(typeof tourDataRow === 'object'){
			for(let prop in tourDataRow){
				formParams.append(prop, tourDataRow[prop])
			}
		}
		this.ticketService.createTour(formParams).subscribe(data=>{})
	}

	selectFile(ev: any): void {
		if(ev.files.length > 0)	this.tourForm.patchValue({img: ev.files[0]})
	}

}
