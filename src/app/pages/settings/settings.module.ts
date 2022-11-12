import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {AuthRoutingModule} from "../auth/auth-routing.module";
import {SettingsRoutingModule} from "./settings-routing.module";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { StatisticComponent } from './statistic/statistic.component';
import {TableModule} from "primeng/table";




@NgModule({
	declarations: [
		ChangePasswordComponent,
  StatisticComponent
	],
	exports: [
		ChangePasswordComponent,
		StatisticComponent
	],
	imports: [
		CommonModule,
		InputTextModule,
		ReactiveFormsModule,
		ButtonModule,
		TableModule,
	]
})
export class SettingsModule { }
