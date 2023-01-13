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
import { TourLoaderComponent } from './tour-loader/tour-loader.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";




@NgModule({
	declarations: [
		ChangePasswordComponent,
  StatisticComponent,
  TourLoaderComponent
	],
    exports: [
        ChangePasswordComponent,
        StatisticComponent,
        TourLoaderComponent
    ],
	imports: [
		CommonModule,
		InputTextModule,
		ReactiveFormsModule,
		ButtonModule,
		TableModule,
		InputTextareaModule,
		FileUploadModule,
	]
})
export class SettingsModule { }
