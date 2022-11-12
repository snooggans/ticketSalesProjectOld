import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../../services/statistic/statistic.service";
import {ICustomStatisticUser} from "../../../models/users";

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

	cols = [
		{field: 'name', header: 'Имя'},
		{field: 'company', header: 'Компания'},
		{field: 'phone', header: 'Телефон'},
		{field: 'city', header: 'Город'},
		{field: 'street', header: 'Улица'},
	]

	users: ICustomStatisticUser[];

	constructor(private statisticService: StatisticService) {
	}

	ngOnInit(): void {
		this.statisticService.getUserStatistic().subscribe((data) => {
			this.users = data
		})
	}

}
