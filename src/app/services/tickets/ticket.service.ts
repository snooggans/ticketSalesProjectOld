import {Injectable} from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {INearestTour, INearestTourWithLocation, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";
import {find, map, Observable, Subject, toArray} from "rxjs";


@Injectable({
	providedIn: 'root'
})

export class TicketService {

	private ticketSubject = new Subject<ITourTypeSelect>()
	readonly ticketType$ = this.ticketSubject.asObservable();
	private http: any;

	constructor(private ticketServiceRest: TicketRestService) {
	}

	getTicketTypeObservable(): Observable<ITourTypeSelect> {
		return this.ticketSubject.asObservable()
	}

	updateTour(type: ITourTypeSelect): void {
		this.ticketSubject.next(type);
	}

	getTickets(): Observable<ITour[]> {
		return this.ticketServiceRest.getTickets()
		.pipe(map(
			(value) => {
				const singleTours = value.filter(el => el.type === "single");
				return value.concat(singleTours)
			}
		))
	}

	getError(): Observable<any> {
		return this.ticketServiceRest.getRestError();
	}

	getNearestTickets(): Observable<any> {
		return this.ticketServiceRest.getNearestTickets()
	}

	getLocationList(): Observable<any> {
		return this.ticketServiceRest.getLocationList();
	}

	getNearestTourWithLocation(tours: INearestTour[], locations: ITourLocation[]): INearestTourWithLocation[] {
		const toursWithLoc: INearestTourWithLocation[] = [];
		tours.forEach(tour => {
			const newTour = <INearestTourWithLocation>{...tour};
			newTour.location = <INearestTourWithLocation>locations.find(loc =>
				tour.locationId === loc.id);
			toursWithLoc.push(newTour);
		})
		return toursWithLoc;
	}

	getRandomNearestEvent(type: number): Observable<INearestTour> {
		return this.ticketServiceRest.getRandomNearestEvent(type);
	}

	sendTourData(data: any): Observable<any> {
		return this.ticketServiceRest.sendTourData(data);
	}


}
