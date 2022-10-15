import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
	selector: 'app-ticket-list',
	templateUrl: './ticket-list.component.html',
	styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit, AfterViewInit {

	tickets: ITour[];
	blockCount: boolean = false;

	@ViewChild('blockDirective', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

	constructor(private ticketService: TicketService,
	            private ticketStorage: TicketsStorageService,
	            private router: Router) {
	}

	ngOnInit(): void {
		this.ticketService.getTickets().subscribe(
			(data) => {
				this.tickets = data;
				this.ticketStorage.setStorage(data);
			}
		);
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
}
