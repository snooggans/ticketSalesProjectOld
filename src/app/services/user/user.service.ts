import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private user: IUser;

	constructor() {
	}

	getUser(): IUser {
		return this.user
		// let userInlocalStorage: IUser = <IUser>{};
		// let getUserInlocalStorage = window.localStorage.getItem(`user_${user.login}`)
		// if (getUserInlocalStorage){
		// 	userInlocalStorage = JSON.parse(getUserInlocalStorage)
		// 	return userInlocalStorage
		// }
	}

	setUser(user: IUser): void{
		this.user = user
		// if (this.getUser(user)) {
		// 	this.user = this.getUser(user);
		// }
	}
}
