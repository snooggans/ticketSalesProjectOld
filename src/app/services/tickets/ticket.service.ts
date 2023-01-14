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
    private ticketUpdateSubject = new Subject<ITour[]>();
    readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

	constructor(private ticketServiceRest: TicketRestService) {
	}

	getTicketTypeObservable(): Observable<ITourTypeSelect> {
		return this.ticketSubject.asObservable()
	}

	updateTour(type: ITourTypeSelect): void {
		this.ticketSubject.next(type);
	}

    updateTicketList(data: ITour[]){
        this.ticketUpdateSubject.next(data);
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

    getTicketById(id:string): Observable<ITour>{
        return this.ticketServiceRest.getTicketById(id)
    }

	getError(): Observable<any> {
		return this.ticketServiceRest.getRestError();
	}

	getNearestTickets(): Observable<any> {
		return this.ticketServiceRest.getNearestTickets()
	}

	getTicketsSearch(name:string): Observable<any> {
		return this.ticketServiceRest.getTicketsSearch(name)
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

	createTour(body: any){
		return this.ticketServiceRest.createTour(body)
	}

}
