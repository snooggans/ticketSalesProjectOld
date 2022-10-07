import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private usersStorage: IUser[] = [];
	public hasCardNumber: boolean;

	constructor() {
	}

	// checkUserHasCardNumber(user: IUser){
	// 	if (user.cardNumber){
	// 		this.hasCardNumber = true;
	// 	}
	// }

	checkUser(user: IUser): boolean{
		let userInlocalStorage: IUser = <IUser>{};
		let getUserInlocalStorage = window.localStorage.getItem(`user_${user.login}`)
		if (getUserInlocalStorage){
			userInlocalStorage = JSON.parse(getUserInlocalStorage)
			this.usersStorage = [userInlocalStorage]
		}

		const isUserExist = this.usersStorage.find(el => el.login === user.login);
		if (isUserExist){
			return isUserExist.psw === user.psw
		}
		return false
	}

	isUserExists(user: IUser): boolean{
		const isUserExist = this.usersStorage.find(el => el.login === user.login);
		return !!isUserExist
	}

	setUser(user: IUser ): void {
		const isUserExist = this.usersStorage.find(el => el.login === user.login);
		if(!isUserExist && user?.login){
			this.usersStorage.push(user)
		}
	}
}
