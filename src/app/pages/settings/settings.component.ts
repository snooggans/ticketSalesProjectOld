import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {ISettings} from "../../models/settings";

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
	isTabCaching: boolean = true
	private subjectForSubscribe = new Subject();

	constructor(private settingsService: SettingsService) {
	}

	ngOnInit(): void {
		this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForSubscribe)).subscribe((data) => {
			console.log('settings data', data)
		});

		this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForSubscribe)).subscribe((data) => {
			console.log('settings data from subject', data)
		})
	}

	ngOnDestroy(): void {
		this.subjectForSubscribe.next(true);
		this.subjectForSubscribe.complete()
	}

}
