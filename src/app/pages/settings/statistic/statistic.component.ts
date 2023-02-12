import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../../services/statistic/statistic.service";
import {ICustomStatisticUser} from "../../../models/users";
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {OrdersService} from "../../../services/orders/orders.service";
import {IOrder} from "../../../models/order";
import {UserService} from "../../../services/user/user.service";

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

	cols = [
		{field: 'tour', header: 'Тур'},
		{field: 'company', header: 'Тур-оператор'},
		{field: 'price', header: 'Цена'},
		{field: 'orders', header: 'Всего заказов'},
		{field: 'priceSumm', header: 'Сумма'}
	]

	tours: any[] = [];
	orders: IOrder[] = [];
	isAdmin: boolean = this.userService.isAdmin();

	constructor(private statisticService: StatisticService,
	            private ticketService: TicketService,
	            private ordersService: OrdersService,
	            private userService: UserService) {
	}

	ngOnInit(): void {
		const newData: any[] = [];
		let orderListType = this.ordersService.getAllUserOrders();
		if (this.userService.isAdmin()){
			orderListType = this.ordersService.getAllOrders();
		}

		orderListType.subscribe(data=>{
			this.orders = data;
			this.ticketService.getTickets().subscribe(data=>{
				data.forEach(t=>{
					const ordersCount = this.orders.filter(order=>order.tourId == t._id).length;
					if (ordersCount > 0) {
						newData.push(
							{
								tour: t.name,
								company: t.tourOperator,
								price: t.price + ' руб.',
								orders: ordersCount,
								priceSumm: ordersCount * Number(t.price) + ' руб.'
							})
					}
				})
			})
		})
		this.tours = newData;
	}

}
