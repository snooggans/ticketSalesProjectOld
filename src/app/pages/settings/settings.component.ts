import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsServiceService} from "../../services/settings/settings-service.service";
import {Subject, Subscription} from "rxjs";

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

	private subjectScope: Subject<string>;
	private subjectUnsubscribe: Subscription;

	constructor(private settings: SettingsServiceService) {
	}

	ngOnInit(): void {
		this.subjectScope = this.settings.getSubject();
		this.subjectScope.subscribe((data: string) => {
			console.log('data', data)
		})
		this.subjectScope.next('subData not for subscribe');

		this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
			console.log('data', data)
		})

	}

	ngOnDestroy() {
		this.subjectUnsubscribe.unsubscribe()
	}

}
