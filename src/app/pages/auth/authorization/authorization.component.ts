import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

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
        private userService: UserService,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.authTextButton = "Авторизоваться";
        this.hasCardNumber = ConfigService.config.useUserCard;
    }

    ngOnDestroy(): void {
    }

    vipStatusSelected(): void {
    }

    onAuth(): void {
        const authUser: IUser = {
            id: '',
            psw: this.psw,
            login: this.login,
            cardNumber: this.cardNumber
        }

        this.http.post<{access_token: string, id: string}>(`http://localhost:3000/users/${authUser.login}`, authUser).subscribe(
            (data) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Вы авторизованы',
                    detail: 'Поздравляем! Авторизация прошла успешно ' +
                        `Логин: ${authUser.login} ` +
                        `Пароль: ${authUser.psw} ` +
                        `Карта: ${authUser.cardNumber}`
                });
                authUser.id = data.id;
                console.log(authUser.id)
                this.userService.setUser(authUser);
                const token: string = data.access_token;
                this.userService.setToken(token, true);
                setTimeout(() => {
					if (this.router.url == '/auth'){
                    this.router.navigate(['tickets/tickets-list'])
					}else{window.location.reload()}
                }, 1000)
            },
            (err: HttpErrorResponse) => {
                const serverError = <ServerError>err.error;
                this.messageService.add({
                    severity: 'warn',
                    summary: serverError.errorText,
                    detail: serverError.detailText
                });
            })

        // if (this.authService.checkUser(authUser)) {
        //
        // 	this.userService.setToken('user-private-token', true);
        //
        // 	this.messageService.add({
        // 		severity: 'success',
        // 		summary: 'Вы авторизованы',
        // 		detail: 'Поздравляем! Авторизация прошла успешно ' +
        // 			`Логин: ${authUser.login} ` +
        // 			`Пароль: ${authUser.psw} ` +
        // 			`Карта: ${authUser.cardNumber}`
        // 	});
        // 	this.userService.setUser(authUser);
        // 	this.router.navigate(['tickets/tickets-list'])
        // } else {
        // 	this.messageService.add({
        // 		severity: 'error',
        // 		summary: 'Проверьте логин и пароль',
        // 		detail: 'Логин и пароль не совпадают'
        // 	});
        // }
    }
}
