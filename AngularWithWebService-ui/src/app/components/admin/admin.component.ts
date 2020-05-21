import { Component, OnInit, OnChanges } from '@angular/core';
import { PersonService } from './../../services/person.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/person';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  People: any;
  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.personService.getPeople().subscribe((data) => this.People = data);
  }

  deletepeople() {
    this.personService.deleteAllPeople().subscribe((data) =>
    this.People = data);
  }
}
