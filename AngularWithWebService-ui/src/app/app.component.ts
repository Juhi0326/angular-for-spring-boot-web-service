import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setTheme } from 'ngx-bootstrap/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularWithWebService-ui';
  public isCollapsed = false;

  constructor(private httpClient: HttpClient) {

  }
}
