import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {IMenuType} from "../../../models/menuType";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy,OnChanges {

	items: MenuItem[];
	time: Date;
	private timerInterval: number;
	public user: IUser;
	private isExtMenu: boolean = false;
	@Input() menuType: IMenuType;
	constructor(private userService: UserService) {
	}

	ngOnInit(): void {
		this.initMenuItems();
		this.timerInterval = window.setInterval(() => {
			this.time = new Date();
		}, 1000) // time

		this.user = this.userService.getUser()
	}

	ngOnDestroy(): void{
		if(this.timerInterval){
			window.clearInterval(this.timerInterval)
		}
	}

	ngOnChanges(ev: SimpleChanges): void{
		this.isExtMenu = this.menuType?.type === "extended";
		this.items = this.initMenuItems()
	}

	initMenuItems(): MenuItem[]{

		// menu items
		this.items = [
			{
				label: 'Билеты',
				routerLink: ['tickets-list']
			},
			{
				label: 'Настройки',
				routerLink: ['tickets-list'],
				visible: this.isExtMenu
			},
			{
				label: 'Выйти',
				routerLink: ['/auth']
			}
		];
		return this.items
	}

}
