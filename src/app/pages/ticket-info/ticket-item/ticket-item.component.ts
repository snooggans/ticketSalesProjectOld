import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {INearestTour, INearestTourWithLocation, ITour, ITourLocation, ITourTypeSelect} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";

@Component({
	selector: 'app-ticket-item',
	templateUrl: './ticket-item.component.html',
	styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

	ticket: ITour | undefined;
	user: IUser;
	userForm: FormGroup;

	nearestTours: INearestTourWithLocation[];
	toursLocation: ITourLocation[];
	toursWithLocation: INearestTourWithLocation[];
	routeIdParam: any = this.route.snapshot.paramMap.get('id');

	@ViewChild('ticketSearch') ticketSearch: ElementRef;

	ticketSearchValue: string;
	searchTicketSub: Subscription;
	ticketRestSub: Subscription;
	searchTypes = [1,2,3];

	constructor(private route: ActivatedRoute,
	            private ticketService: TicketService,
	            private ticketStorage: TicketsStorageService,
	            private userService: UserService
	            ) {
	}

	onSubmit(){
		console.log('submit')
	}

	loadTicket(){
		this.ticketStorage.setActiveTicket(this.routeIdParam);
		this.ticket = this.ticketStorage.getActiveTicket();
	}

	initSearchTour(): void{
		const type = Math.floor(Math.random() * this.searchTypes.length);

		if(this.ticketRestSub && !this.searchTicketSub.closed){
			this.ticketRestSub.unsubscribe()
		}

		this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data)=>{
			this.toursWithLocation = this.ticketService.getNearestTourWithLocation([data], this.toursLocation)
		})

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
			this.toursLocation = data[1];
			this.toursWithLocation = this.ticketService.getNearestTourWithLocation(data[0],data[1])
		})

		// Load Tickets
		this.ticketService.getTickets().subscribe(
			(data) => {
				this.ticketStorage.setStorage(data);
				this.loadTicket()
			}
		);
	}

	ngAfterViewInit(): void{
		this.userForm.controls['cardNumber'].setValue(this.userService.getActiveUserData().cardNumber);

		const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
		this.searchTicketSub = fromEventObserver.subscribe((ev: any) =>{
			this.initSearchTour()
		})
	}

}
