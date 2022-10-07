import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	items: MenuItem[];
	time: Date;
	private timerInterval: number;

	constructor() {
	}

	ngOnInit(): void {

		// menu items
		this.items = [
			{
				label: 'Билеты',
				routerLink: ['tickets-list']
			},
			{
				label: 'Выйти',
				routerLink: ['/auth']
			}
		];		// menu items

		this.timerInterval = window.setInterval(() => {
			this.time = new Date();
		}, 1000)
	}

	ngOnDestroy(): void{
		if(this.timerInterval){
			window.clearInterval(this.timerInterval)
		}
	}

}
