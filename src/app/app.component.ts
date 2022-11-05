import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';

  constructor(private config: ConfigService) {}

  ngOnInit(){
	  this.config.configLoad()
  }

}
