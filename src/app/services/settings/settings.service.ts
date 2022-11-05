import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ISettings} from "../../models/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	private settingsSubject: Subject<ISettings> = new Subject<ISettings>();

	loadUserSettings(): Observable<ISettings>{
		const settingsObservable = new Observable<ISettings>(subscriber => {
			const settngsData: ISettings = {
				saveToken: true
			}
			subscriber.next(settngsData)
		})
		return settingsObservable
	}

	loadUserSettingsSubject(data: ISettings): any {
		this.settingsSubject.next(data)
	}


	// private myBehaviorSubject = new BehaviorSubject('behavior subj');
	// private mySubject = new Subject<string>()
	// private myObservable = new Observable<string>((subscriber =>{
	// 	setTimeout(()=>{
	// 		subscriber.next('subscriber')
	// 	})
	// }))

  constructor() { }

	getSettingsSubjectObservable(): Observable<ISettings>{
		return this.settingsSubject.asObservable()
	}

}
