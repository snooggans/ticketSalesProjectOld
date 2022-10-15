import {Component, OnInit} from '@angular/core';
import {ITour} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {TicketService} from "../../../services/tickets/ticket.service";

@Component({
	selector: 'app-ticket-item',
	templateUrl: './ticket-item.component.html',
	styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

	ticket: ITour | undefined;

	constructor(private route: ActivatedRoute,
	            private ticketService: TicketService,
	            private ticketStorage: TicketsStorageService) {
	}

	ngOnInit(): void {
		const routeIdParam = this.route.snapshot.paramMap.get('id');

		if(routeIdParam){
			const ticketStorage: ITour[] = this.ticketStorage.getStorage();

			this.ticket = ticketStorage.find(el => el.id === routeIdParam);
			console.log(this.ticket)
		}
	}

}
