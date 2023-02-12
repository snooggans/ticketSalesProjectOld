import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings/settings.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {ISettings} from "../../models/settings";
import {UserService} from "../../services/user/user.service";

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
	isTabCaching: boolean = false
	private subjectForSubscribe = new Subject();
	isAdmin: boolean = this.userService.isAdmin();

	constructor(private settingsService: SettingsService,
	            private userService: UserService) {
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
