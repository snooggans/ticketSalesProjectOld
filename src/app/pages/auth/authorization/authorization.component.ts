import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
	loginText = 'Логин';
   pswText = 'Пароль';
   psw: string;
   login: string;
   selectedValue: boolean;
   cardNumber: string;
	authTextButton: string

	constructor(
		private authService: AuthService,
		private messageService: MessageService) { }

	ngOnInit(): void {
	  console.log('init');

	  this.authTextButton = "Авторизоваться"
	}

	ngOnDestroy(): void {
	  console.log('destroy')
	}

	vipStatusSelected(): void{
	}

	onAuth(): void{
		const authUser: IUser = {
			psw: this.psw,
			login: this.login,
			cardNumber: this.cardNumber
		}
		if (this.authService.checkUser(authUser)){
			this.messageService.add({
				severity: 'success',
				summary: 'Вы авторизованы',
				detail: 'Поздравляем! Авторизация прошла успешно ' +
					`Логин: ${authUser.login} ` +
					`Пароль: ${authUser.psw} ` +
					`Карта: ${authUser.cardNumber}`
			});
		}else{
			this.messageService.add({
				severity: 'error',
				summary: 'Проверьте логин и пароль',
				detail: 'Логин и пароль не совпадают'
			});
		}
	}
}
