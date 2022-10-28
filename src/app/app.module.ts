import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SettingsComponent } from './pages/settings/settings.component';
import {RestInterceptorsService} from "./services/interceptors/rest-interceptors.service";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true}
	],
	bootstrap: [AppComponent]
})

export class AppModule {
}
