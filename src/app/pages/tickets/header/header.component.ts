import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	items: MenuItem[];
	time: Date;
	private timerInterval: number;
	public user: string;

	constructor(private userService: UserService) {
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
		}, 1000) // time

		this.user = this.userService.getUser().login
	}

	ngOnDestroy(): void{
		if(this.timerInterval){
			window.clearInterval(this.timerInterval)
		}
	}

}
