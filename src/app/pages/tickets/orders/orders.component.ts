import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IOrder} from "../../../models/order";
import {OrdersService} from "../../../services/orders/orders.service";
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {HttpClient} from "@angular/common/http";

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

	orders: any[] = [];

	constructor(private ordersService: OrdersService,
	            private ticketService: TicketService,
	            private http: HttpClient) {
	}

	ngOnInit(): void {
		this.initOrders();
	}

	initOrders(): void{
		let ids: any[] = [];
		this.ordersService.getAllUserOrders().subscribe((data => {
				const newData: any = [];
				data.forEach(d=>{
					this.ticketService.getTicketById(d.tourId+'').subscribe(data=>{
						newData.push({
							...d,
							img: data.img,
							tour: data.name,
							location: data.location,
							price: data.price
						})
					});
				});
				this.orders = newData
			})
		)
	}



	deleteOrder(id:string): void{
		this.http.delete(`http://localhost:3000/orders/${id}`).subscribe(()=>this.initOrders());
	}
}
