import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ServerError} from "../../../models/error";
import {UserService} from "../../../services/user/user.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    login: string;
    psw: string;
    pswRepeat: string;
    email: string;
    cardNumber: string;
    showCardNumber: boolean;
    isUserSave: boolean = false;


    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.showCardNumber = ConfigService.config.useUserCard
    }

    userSave(user: IUser): void {
        const userString = JSON.stringify(user);
        if (this.isUserSave) {
            window.localStorage.setItem(`user_${user.login}`, userString)
        }
    }

    registration(): void | boolean {
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

        this.http.post('http://localhost:3000/users/', userObj).subscribe((data) => {
                if (!this.authService.isUserExists(userObj)) {
                    this.authService.setUser(userObj);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Вы зарегистрированы',
                        detail: 'Поздравляем! Регистрация прошла успешно'
                    });
                    this.userSave(userObj);
                    this.userService.setUser(userObj);
                    setTimeout(() => {
                        this.router.navigate(['tickets/tickets-list'])
                    }, 1000)
                }
            },
            (err: HttpErrorResponse) => {
                const serverError = <ServerError>err.error;
                this.messageService.add({
                    severity: 'warn',
                    summary: serverError.errorText,
                    detail: serverError.detailText
                });
            })

        // if (!this.authService.isUserExists(userObj)) {
        // 	this.authService.setUser(userObj);
        // 	this.messageService.add({
        // 		severity: 'success',
        // 		summary: 'Вы зарегистрированы',
        // 		detail: 'Поздравляем! Регистрация прошла успешно'
        // 	});
        // 	this.userSave(userObj)
        // } else {
        // 	this.messageService.add({
        // 		severity: 'warn',
        // 		summary: 'Логин уже занят',
        // 		detail: 'Попробуйте другой логин'
        // 	});
        // }
    }
}
