import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";
import {IOrder} from "../../models/order";
import {UserService} from "../user/user.service";

@Injectable({
	providedIn: 'root'
})
export class TicketRestService {

	constructor(private http: HttpClient,
                private userService: UserService) {
	}

	getTickets(): Observable<ITour[]> {
        return this.http.get<ITour[]>('http://localhost:3000/tours/')
	}

    getTicketById(id:string): Observable<ITour> {
        return this.http.get<ITour>('http://localhost:3000/tours/'+id)
    }

	getRestError(): Observable<any> {
		return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
	}

	getNearestTickets(loc:string): Observable<ITour[]> {
		return this.http.get<INearestTour[]>('http://localhost:3000/nearest-tours/'+loc);
	}

	getTicketsSearch(name:string): Observable<INearestTour[]> {
		return this.http.get<INearestTour[]>('http://localhost:3000/tour-search/'+name);
	}

	getLocationList(): Observable<ITourLocation[]> {
		return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
	}

	getRandomNearestEvent(type: number): Observable<INearestTour> {
		switch (type) {
			case 0:
				return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json')
			case 1:
				return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
			case 2:
				return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json')
			default:
				return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
		}
	}

	sendTourData(data: IOrder ){
		return this.http.post('http://localhost:3000/orders/', data)
	}

    getAllOrders(): Observable<IOrder[]>{
        const userId = this.userService.getUser().id;
        return this.http.get<IOrder[]>('http://localhost:3000/orders/'+userId)
    }

	createTour(body: any): Observable<any>{
		return this.http.post("http://localhost:3000/tour-item/", body, {headers:{}})
	}

}
