import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";

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

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	  console.log('init');

	  this.authTextButton = "Авторизоваться"
	}

	ngOnDestroy(): void {
	  console.log('destroy')
	}

	vipStatusSelected(): void{
	}

	onAuth(ev: Event): void{
		const authUser: IUser = {
			psw: this.psw,
			login: this.login
		}
		if (this.authService.checkUser(authUser)){
			console.log('login', authUser)
		}
	}
}
