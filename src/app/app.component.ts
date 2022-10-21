import { Component } from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';

  constructor(testing: ObservableExampleService) {
	  testing.initOservable()
  }
}
