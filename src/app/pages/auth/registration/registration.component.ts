import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

	login: string;
	psw: string;
	pswRepeat: string;
	email: string;
	cardNumber: string

	constructor(
		private messageService: MessageService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
	}

	registration(ev: Event): void|boolean {
		if (this.psw !== this.pswRepeat) {
			this.messageService.add({
				severity: 'error',
				summary: 'Пароли не совпадают',
				detail: 'Проверьте идентичность вводимых паролей'
			});
			return false;
		}

		const userObj: IUser = {
			login: this.login,
			psw: this.psw,
			cardNumber: this.cardNumber,
			email: this.email
		}
		if (!this.authService.isUserExists(userObj)) {
			this.authService.setUser(userObj);
			this.messageService.add({
				severity: 'success',
				summary: 'Вы зарегистрированы',
				detail: 'Поздравляем! Регистрация прошла успешно'
			});
		}else {
			this.messageService.add({
				severity: 'warn',
				summary: 'Логин уже занят',
				detail: 'Попробуйте другой логин'
			});
		}
	}
}
