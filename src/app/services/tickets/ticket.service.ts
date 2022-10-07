import {Injectable} from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {ITour} from "../../models/tours";
import {Observable} from "rxjs";


@Injectable({
	providedIn: 'root'
})

export class TicketService {

	constructor(private ticketServiceRest: TicketRestService) {
	}

	getTickets(): Observable<ITour[]> {
		return this.ticketServiceRest.getTickets()
	}

}
