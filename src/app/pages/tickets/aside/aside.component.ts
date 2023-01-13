import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketService} from "../../../services/tickets/ticket.service";
import {MessageService} from 'primeng/api';
import {SettingsService} from "../../../services/settings/settings.service";
import {HttpClient} from "@angular/common/http";

@Component({
	selector: 'app-aside',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

	menuTypes: IMenuType[];
	selectedMenuType: IMenuType;

	tourTypes: ITourTypeSelect[] = [
		{label: 'Все', value: 'all'},
		{label: 'Одиночный', value: 'single'},
		{label: 'Групповой', value: 'multi'}
	]

	@Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();

	constructor(private ticketService: TicketService,
	            private messageService: MessageService,
	            private settingsService: SettingsService,
                private http: HttpClient) {
	}

	ngOnInit(): void {

		this.menuTypes = [
			{type: 'custom', label: 'Обычное'},
			{type: 'extended', label: 'Расширенное'}
		]
	}

	changeType(ev: { ev: Event, value: IMenuType }): void {
		console.log('ev', ev)
		this.updateMenuType.emit(ev.value);
	}

	changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
		this.ticketService.updateTour(ev.value)
	}

	selectDate(ev: string) {
		console.log('ev', ev)
		this.ticketService.updateTour({date: ev})
	}

	initSettingsData() {
		this.settingsService.loadUserSettingsSubject({
			saveToken: false
		})
	}

    initTours(): void{
        this.http.post<ITour[]>('http://localhost:3000/tours/',{})
            .subscribe((data) => this.ticketService.updateTicketList(data));
    }

    getAllTours(): void{
        this.http.get('http://localhost:3000/tours').subscribe((data) => {});
    }

    deleteTours(): void{
        this.http.delete('http://localhost:3000/tours/remove').subscribe((data) => this.ticketService.updateTicketList([]));;
    }

}
