import {Injectable} from '@angular/core';
import {ITour} from "../../models/tours";
import {TicketService} from "../tickets/ticket.service";

@Injectable({
	providedIn: 'root'
})
export class TicketsStorageService {

	private ticketStorage: ITour[]

	constructor(private ticketService: TicketService) {}

	setStorage(data: ITour[]): void{
		this.ticketStorage = data;
	}

	getStorage(): ITour[]{
		return this.ticketStorage;
	}

	setActiveTicket(id: string): void{

		this.ticketService.getTickets().subscribe(
			(data) => {
				this.ticketStorage = data;
			}
		);

		const activeTicket = this.ticketStorage.find(el => el.id === id)
		window.localStorage.setItem(`active_ticket`, JSON.stringify(activeTicket));
	}

	getActiveTicket(): ITour{
		let activeTicket: any = window.localStorage.getItem('active_ticket');
		return JSON.parse(activeTicket);
	}

}
