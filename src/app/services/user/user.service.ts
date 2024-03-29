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
        let getActiveUser: any = window.localStorage.getItem('activeUser');
		return JSON.parse(getActiveUser)
	}

	isAdmin(): boolean{
		return this.getUser().login == 'Admin';
	}

	setActiveUser(): string {
		let getActiveUser: any = window.localStorage.getItem('activeUser');
		return JSON.parse(getActiveUser).login;
	}

	isLoggedIn(): boolean{
		if(this.getUser() && this.getUser().login != 'Гость' ) {
			return true
		}else {
			this.setUser({login: 'Гость', psw:''})
			return false
		}
	}

	getActiveUserData(): IUser{
		let getActiveUserId: any = window.localStorage.getItem('activeUser');
		const activeUserId = JSON.parse(getActiveUserId);

		let getActiveUser: any = window.localStorage.getItem(`user_${activeUserId}`);
		return JSON.parse(getActiveUser);
	}

	removeActiveUser(): void {
		window.localStorage.removeItem('activeUser')
	}

	removeUserTokenInStorage(): void {
		window.localStorage.removeItem('user_token');
	}

	logout(){
		this.removeActiveUser();
		this.removeUserTokenInStorage();
		window.location.reload()
	}

	setUser(user: IUser): void {
		if(user) {
			this.user = user;
			window.localStorage.setItem(`activeUser`, JSON.stringify(this.user));
		}else{
			this.user.login = 'Guest'
			}
	}


	setToken(token: string, store: boolean): void {
		this.token = token;
		if (store) {
			this.storeUserToken(token);
		}
	}

	storeUserToken(token: string): void {
		window.localStorage.setItem(`user_token`, JSON.stringify(token));
	}

	getUserTokenFromStorage(){
		let userTokenLocalStorage: any = window.localStorage.getItem('user_token');
		this.token = JSON.parse(userTokenLocalStorage);
		return userTokenLocalStorage;
	}

	getToken() {
		if(!this.token){
			this.getUserTokenFromStorage()
		}
		return this.token;
	}

}
