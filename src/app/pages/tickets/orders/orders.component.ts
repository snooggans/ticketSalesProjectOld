import {Component, OnInit} from '@angular/core';
import {IOrder} from "../../../models/order";
import {OrdersService} from "../../../services/orders/orders.service";
import {TicketService} from "../../../services/tickets/ticket.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    orders: any[];
    orderedTours: any;

    constructor(private ordersService: OrdersService,
                private ticketService: TicketService ) {
    }

    ngOnInit(): void {
       this.ordersService.getAllOrders().subscribe((data=>{
            this.orders = data;
        })
       )
    }

    getOrderedTours():void{
        console.log('ssss',this.orders[0].tourId)
         this.ticketService.getTicketById(this.orders[0].tourId).subscribe(data=>{
             this.orderedTours = data
        })
    }




}
