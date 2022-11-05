import {Component, OnInit} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin} from "rxjs";

@Component({
	selector: 'app-ticket-item',
	templateUrl: './ticket-item.component.html',
	styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

	ticket: ITour | undefined;
	user: IUser;
	userForm: FormGroup;

	nearestTours: INearestTour[];
	toursLocation: ITourLocation[];

	constructor(private route: ActivatedRoute,
	            private ticketService: TicketService,
	            private ticketStorage: TicketsStorageService,
	            private userService: UserService
	            ) {
	}

	onSubmit(){
		console.log('submit')
	}

	ngOnInit(): void {

		this.user = this.userService.getUser();

		// Form Group
		this.userForm = new FormGroup({
			firstName: new FormControl('', [ Validators.required, Validators.minLength(2)]),
			lastName: new FormControl('', {validators: Validators.required}),
			cardNumber: new FormControl(),
			birthDay: new FormControl(),
			age: new FormControl(),
			citizen: new FormControl('Россия')
		})

		// Nearest Tours
		forkJoin([
			this.ticketService.getNearestTickets(),   // data[0]
			this.ticketService.getLocationList()   // data[1]
		]).subscribe( data => {
			this.nearestTours = data[0];
			this.toursLocation = data[1]
		})

		// Params
		const routeIdParam = this.route.snapshot.paramMap.get('id');

		if(routeIdParam){
			const ticketStorage: ITour[] = this.ticketStorage.getStorage();

			this.ticket = ticketStorage.find(el => el.id === routeIdParam);
			console.log(this.ticket)
		}
	}

	ngAfterViewInit(): void{
		this.userForm.controls['cardNumber'].setValue(this.userService.getActiveUserData().cardNumber);
	}

}
