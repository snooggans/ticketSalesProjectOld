import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  property: string = '';
  loginText = 'Логин';
  pswText = 'Пароль';
  constructor() { }

  ngOnInit(): void {
	  console.log('init')
  }

  ngOnDestroy() {
	  console.log('destroy')
  }

}
