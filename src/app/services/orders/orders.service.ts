import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {Observable} from "rxjs";
import {IOrder} from "../../models/order";
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private ticketRestService: TicketRestService) { }

    getAllOrders(): Observable<IOrder[]>{
      return this.ticketRestService.getAllOrders()
    }

	getAllUserOrders(): Observable<IOrder[]>{
		return this.ticketRestService.getAllUserOrders()
	}
}
