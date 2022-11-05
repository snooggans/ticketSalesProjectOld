import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {BlocksStyleDirective} from "../../directive/blocks-style.directive";
import {SettingsComponent} from "../settings/settings.component";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {TabViewModule} from "primeng/tabview";
import {SettingsModule} from "../settings/settings.module";


@NgModule({
	declarations: [
		TicketsComponent,
		HeaderComponent,
		FooterComponent,
		TicketListComponent,
		SettingsComponent,
		AsideComponent,
		BlocksStyleDirective
	],
	imports: [
		CommonModule,
		TicketsRoutingModule,
		MenubarModule,
		ButtonModule,
		DropdownModule,
		FormsModule,
		CalendarModule,
		ToastModule,
		InputTextModule,
		TabViewModule,
		SettingsModule
	],
	providers: [MessageService]
})
export class TicketsModule { }
