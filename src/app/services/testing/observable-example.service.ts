import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ObservableExampleService {

	constructor() {
	}

	initOservable(): void {
		const observable = new Observable((subscriber =>{
			subscriber.next(4);
			subscriber.next(5);
			setTimeout(()=>{
				subscriber.next('async data 1');
				subscriber.next('async data 2');
				subscriber.next('async data 3');
				subscriber.error('data error');
			})
		}))

		const subsObj = observable.subscribe((data)=>{
			console.log('observable data: ', data)
		}, (error =>{
			console.log('error: ', error)
			}))
		console.log(subsObj);
	}

}
