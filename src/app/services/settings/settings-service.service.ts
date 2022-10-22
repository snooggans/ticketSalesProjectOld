import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {

	private myBehaviorSubject = new BehaviorSubject('behavior subj');
	private mySubject = new Subject<string>()
	private myObservable = new Observable<string>((subscriber =>{
		setTimeout(()=>{
			subscriber.next('subscriber')
		})
	}))

  constructor() { }

	getSubject(){
		return this.mySubject
	}

}
