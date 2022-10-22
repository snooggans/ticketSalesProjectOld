import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-ticket-list',
	templateUrl: './ticket-list.component.html',
	styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {

	tickets: ITour[];
	ticketsCopy: ITour[];
	blockCount: boolean = false;
	private tourUnsubscriber: Subscription;

	@ViewChild('blockDirective', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

	constructor(private ticketService: TicketService,
	            private ticketStorage: TicketsStorageService,
	            private router: Router) {
	}

	ngOnInit(): void {
		this.ticketService.getTickets().subscribe(
			(data) => {
				this.tickets = data;
				this.ticketsCopy = [...this.tickets];
				this.ticketStorage.setStorage(data);
			}
		)

		this.tourUnsubscriber = this.ticketService.$ticketType.subscribe((data: ITourTypeSelect) => {
			console.log('data', data);

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
		});

	}

	ngAfterViewInit(){

	}

	goToTicketInfoPage(item: ITour): void {
		this.router.navigate([`/tickets/ticket/${item.id}`])
	}

	directiveRenderComplete(ev:boolean){
		this.blockDirective.initStyle(2)
		this.blockCount = true;
	}

	ngOnDestroy() {
		this.tourUnsubscriber.unsubscribe();
	}
}
