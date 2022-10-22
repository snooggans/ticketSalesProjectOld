import {Injectable} from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {ITour, ITourTypeSelect} from "../../models/tours";
import {Observable, Subject} from "rxjs";


@Injectable({
	providedIn: 'root'
})

export class TicketService {

	private ticketSubject = new Subject<ITourTypeSelect>()
	readonly $ticketType = this.ticketSubject.asObservable();

	constructor(private ticketServiceRest: TicketRestService) {
	}

	getTicketTypeObservable(): Observable<ITourTypeSelect>{
		return this.ticketSubject.asObservable()
	}

	updateTour(type: ITourTypeSelect): void{
		this.ticketSubject.next(type);
	}

	getTickets(): Observable<ITour[]> {
		return this.ticketServiceRest.getTickets()
	}

}
