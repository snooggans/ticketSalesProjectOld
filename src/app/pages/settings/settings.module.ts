import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {AuthRoutingModule} from "../auth/auth-routing.module";
import {SettingsRoutingModule} from "./settings-routing.module";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";




@NgModule({
	declarations: [
		ChangePasswordComponent
	],
	exports: [
		ChangePasswordComponent
	],
	imports: [
		CommonModule,
		InputTextModule,
		ReactiveFormsModule,
		ButtonModule,
	]
})
export class SettingsModule { }
