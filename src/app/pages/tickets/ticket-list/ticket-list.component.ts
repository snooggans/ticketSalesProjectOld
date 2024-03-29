import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";

@Component({
	selector: 'app-ticket-list',
	templateUrl: './ticket-list.component.html',
	styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {

	tickets: ITour[];
	ticketsCopy: ITour[];
	blockCount: boolean = false;
	tourUnsubscriber: Subscription;

	@ViewChild('blockDirective', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

	@ViewChild('ticketSearch') ticketSearch: ElementRef;
	searchTicketSub: Subscription;
	ticketSearchValue: string;

	constructor(private ticketService: TicketService,
	            private ticketStorage: TicketsStorageService,
				private userService: UserService,
	            private router: Router) {
	}

	ngOnInit(): void {
		this.userService.isLoggedIn();
		this.ticketService.ticketUpdateSubject$.subscribe(data => {
			this.tickets = data;
		})
		this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {

			let ticketType: string;
			switch (data.value) {

				case "single":
					this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
					console.log(this.tickets)
					break;

				case "multi":
					this.tickets = this.ticketsCopy.filter((el) => (el.type) === "multi");
					console.log(this.tickets)
					break;

				case "all":
					this.tickets = [...this.ticketsCopy];
					console.log(this.tickets)
					break;
			}
			setTimeout(() => {
				this.blockDirective.updateItems();
				this.blockDirective.initStyle(0);
			}, 300);

		});

		this.ticketService.getTickets().subscribe(
			(data) => {
				this.tickets = data;
				this.ticketsCopy = [...this.tickets];
				this.ticketStorage.setStorage(data);
			}
		);
	}

	ngAfterViewInit() {
		const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
		this.searchTicketSub = fromEventObserver.pipe(
			debounceTime(200)).subscribe(ev => {
			if (this.ticketSearchValue) {
				this.tickets = this.ticketsCopy.filter(
					el => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
			} else {
				this.tickets = [...this.ticketsCopy]
			}
		})
	}

	goToTicketInfoPage(item: ITour): void {
		this.router.navigate(
			[`/tickets/ticket/${item._id}`])
	}

	directiveRenderComplete(ev: boolean) {
		this.blockDirective.initStyle(1)
		this.blockCount = true;
	}


	ngOnDestroy() {
		this.tourUnsubscriber.unsubscribe();
		this.searchTicketSub.unsubscribe()
	}
}
