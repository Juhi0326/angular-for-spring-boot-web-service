import { Component, OnInit } from '@angular/core';
import { PersonService } from './../../services/person.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {

    this.personService.getPeople();
  }

  public deletePersonById(id: number) {
    this.personService.deletePersonById(id);
  }
}
