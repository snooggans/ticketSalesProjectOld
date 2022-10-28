import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
	selector: 'app-authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
	loginText = 'Логин';
	pswText = 'Пароль';
	psw: string;
	login: string;
	selectedValue: boolean;
	hasCardNumber: boolean;
	cardNumber: string;
	authTextButton: string

	constructor(
		private authService: AuthService,
		private messageService: MessageService,
		private router: Router,
		private userService: UserService
	) {
	}

	ngOnInit(): void {
		this.authTextButton = "Авторизоваться"
	}

	ngOnDestroy(): void {
	}

	vipStatusSelected(): void {
	}

	onAuth(): void {
		const authUser: IUser = {
			psw: this.psw,
			login: this.login,
			cardNumber: this.cardNumber
		}


		if (this.authService.checkUser(authUser)) {

			this.userService.setToken('user-private-token');

			this.messageService.add({
				severity: 'success',
				summary: 'Вы авторизованы',
				detail: 'Поздравляем! Авторизация прошла успешно ' +
					`Логин: ${authUser.login} ` +
					`Пароль: ${authUser.psw} ` +
					`Карта: ${authUser.cardNumber}`
			});
			this.userService.setUser(authUser);
			this.router.navigate(['tickets/tickets-list'])
		} else {
			this.messageService.add({
				severity: 'error',
				summary: 'Проверьте логин и пароль',
				detail: 'Логин и пароль не совпадают'
			});
		}
	}
}
