import { Component } from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigServiceService} from "./services/config-service/config-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';

  constructor(config: ConfigServiceService) {
		// config.configLoad()
  }
}
