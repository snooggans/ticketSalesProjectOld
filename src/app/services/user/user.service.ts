import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private user: IUser;
	private token: string;

	constructor() {
	}

	getUser(): IUser {
		return this.user
	}

	setActiveUser(): string {
		let getActiveUser: any = window.localStorage.getItem('activeUser');
		return JSON.parse(getActiveUser);
	}

	removeActiveUser(): void {
		window.localStorage.removeItem('activeUser')
	}

	setUser(user: IUser): void{
		this.user = user;
		window.localStorage.setItem(`activeUser`, JSON.stringify(this.user.login));
	}

	setToken(token: string): void {
		this.token = token;
	}

	getToken(){
		return this.token;
	}

}
