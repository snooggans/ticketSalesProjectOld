import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

	changePasswordForm: FormGroup;
	private oldPassword: string;
	private newPassword: string;
	private newPasswordCheck: string;
	private newUserData: IUser;

	constructor(private userService: UserService,
	            private authService: AuthService) {
	}

	changePassword(): void {
		const activeUserData = this.userService.getActiveUserData();
		this.oldPassword = activeUserData.psw;

		this.newPassword = this.changePasswordForm.controls['newPassword'].value;

		this.newPasswordCheck = this.changePasswordForm.controls['newPasswordCheck'].value

		if (activeUserData.psw !== this.changePasswordForm.controls['oldPassword'].value){
			console.log('wrong old password');
		}else {
			if (this.newPassword === this.newPasswordCheck && this.oldPassword){
				if (this.oldPassword !== this.newPassword){
				this.newUserData = {...activeUserData, psw: this.newPassword}
				window.localStorage.setItem(`user_${activeUserData.login}`, JSON.stringify(this.newUserData));
				this.userService.setUser(this.newUserData);
				console.log(this.newUserData)
				}else{
					console.log('пароль не изменился')
				}
			}else{
				console.log('Пароли не совпадают')
			}
		}
	}



	ngOnInit(): void {

		// Form
		this.changePasswordForm = new FormGroup({
			oldPassword: new FormControl(''),
			newPassword: new FormControl('', [Validators.required, Validators.minLength(0)]),
			newPasswordCheck: new FormControl('')
		})
	}

}
