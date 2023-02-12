import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {debounceTime, forkJoin, fromEvent, Subscription} from "rxjs";
import {IOrder} from "../../../models/order";
import {formatDate} from "@angular/common";

@Component({
	selector: 'app-ticket-item',
	templateUrl: './ticket-item.component.html',
	styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

	ticket: ITour ;
	location: string;
	user: IUser;
	userForm: FormGroup;
	isLoggedIn: boolean = this.userService.isLoggedIn();
	maxDateValue = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
	minDateValue = new Date(new Date().setFullYear(new Date().getFullYear() - 90));
	age: string = '18';

	nearestTours: ITour[];
	// toursLocation: ITourLocation[];
	// toursWithLocation: INearestTourWithLocation[];
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
	            private userService: UserService,
	            private router: Router,
	            ) {
	}

	calcAge(): void{
		let timeDiff = Math.abs(Date.now() - this.userForm.getRawValue().birthDay.getTime());
		this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365)+'';
	}

	onSubmit(){
		const userData = this.userForm.getRawValue();
		const postData = {...this.ticket, ...userData};

        const userId = this.userService.getUser()?.id || null;

        const postObj: IOrder = {
	        clientName: postData.clientName,
	        clientSurname: postData.clientSurname,
            age: this.age,
            birthDay: postData.birthDay,
            cardNumber: postData.cardNumber,
	        citizen: postData.citizen,
            tourId: postData._id,
            userId: userId
        }
        this.ticketService.sendTourData(postObj).subscribe();
		this.router.navigate(['tickets/orders'])
	}


	loadTicket(){
        const paramValueId = this.routeIdParam || this.queryIdParam;
        if(paramValueId){
            this.ticketService.getTicketById(paramValueId).subscribe(data=>{
                data.img = 'http://localhost:3000/public/'+ data.img;
                this.ticket = data;
				this.location = data.location;
	            this.nearestTickets();
	            this.ticketStorage.setActiveTicket(this.routeIdParam);
            })
        }
	}

	initSearchTour(): void{
		const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
		this.searchTicketSub = fromEventObserver.pipe(
			debounceTime(200)).subscribe(ev => {
			if (this.ticketSearchValue) {
				this.ticketService.getTicketsSearch(this.ticketSearchValue).subscribe(data => this.nearestTours = data);
			}else{
				this.nearestTickets();
			}
		})

		if(this.ticketRestSub && !this.searchTicketSub.closed){
			this.ticketRestSub.unsubscribe()
		}
	}

	nearestTickets(){
		this.ticketService.getNearestTickets(this.location).subscribe( data => {
			this.nearestTours = data;
		})
	}

	ngOnInit(): void {
		this.user = this.userService.getUser();

		// Form Group
		this.userForm = new FormGroup({
			clientName: new FormControl('', [ Validators.required, Validators.minLength(2)]),
			clientSurname: new FormControl('', {validators: Validators.required}),
			cardNumber: new FormControl(this.userService.getActiveUserData()?.cardNumber),
			birthDay: new FormControl(),
			age: new FormControl({value: this.age, disabled: true}),
			citizen: new FormControl('Россия')
		})

		// Nearest Tours
			this.nearestTickets();

		// Load Tickets
		this.ticketService.getTickets().subscribe(
			(data) => {
				this.ticketStorage.setStorage(data);
				this.loadTicket();
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
