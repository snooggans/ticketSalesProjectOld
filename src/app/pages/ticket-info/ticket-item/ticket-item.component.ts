import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {INearestTourWithLocation, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {debounceTime, forkJoin, fromEvent, Subscription} from "rxjs";
import {IOrder} from "../../../models/order";

@Component({
	selector: 'app-ticket-item',
	templateUrl: './ticket-item.component.html',
	styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

	ticket: ITour ;
	user: IUser;
	userForm: FormGroup;

	nearestTours: INearestTourWithLocation[];
	toursLocation: ITourLocation[];
	toursWithLocation: INearestTourWithLocation[];
	routeIdParam: any = this.route.snapshot.paramMap.get('id');
    queryIdParam = this.route.snapshot.queryParamMap.get('id');

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
		const userData = this.userForm.getRawValue();
		const postData = {...this.ticket, ...userData};

        const userId = this.userService.getUser()?.id || null;

        const postObj: IOrder = {
            age: postData.age,
            birthDay: postData.birthDay,
            cardNumber: postData.cardNumber,
            tourId: postData._id,
            userId: userId
        }
        this.ticketService.sendTourData(postObj).subscribe()
	}

	loadTicket(){
        const paramValueId = this.routeIdParam || this.queryIdParam;
        if(paramValueId){
            this.ticketService.getTicketById(paramValueId).subscribe(data=>{
                data.img = 'http://localhost:3000/public/'+ data.img;
                this.ticket = data
            })
        }
		this.ticketStorage.setActiveTicket(this.routeIdParam);
	}

	initSearchTour(): void{
		const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
		this.searchTicketSub = fromEventObserver.pipe(
			debounceTime(200)).subscribe(ev => {
			if (this.ticketSearchValue) {
				this.ticketService.getTicketsSearch(this.ticketSearchValue).subscribe(data => this.nearestTours = data);
			}else{
				this.ticketService.getNearestTickets().subscribe( data => {
					this.nearestTours = data;
				})
			}
		})

		if(this.ticketRestSub && !this.searchTicketSub.closed){
			this.ticketRestSub.unsubscribe()
		}
	}

	ngOnInit(): void {

		this.user = this.userService.getUser();

		// Form Group
		this.userForm = new FormGroup({
			firstName: new FormControl('', [ Validators.required, Validators.minLength(2)]),
			lastName: new FormControl('', {validators: Validators.required}),
			cardNumber: new FormControl(this.userService.getActiveUserData()?.cardNumber),
			birthDay: new FormControl(),
			age: new FormControl(18),
			citizen: new FormControl('Россия')
		})

		// Nearest Tours
			this.ticketService.getNearestTickets().subscribe( data => {
			this.nearestTours = data;
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
		const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
		this.searchTicketSub = fromEventObserver.subscribe(() =>{
			this.initSearchTour()
		});
	}
}
