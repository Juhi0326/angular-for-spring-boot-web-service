import { Component, OnInit, OnChanges } from '@angular/core';
import { PersonService } from './../../services/person.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/person';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges {
  People: any;
  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute) { }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.personService.getPeople().subscribe((data) => this.People = data);
  }

  ngOnInit() {

    this.personService.getPeople().subscribe((data) => this.People = data);
  }

  public deletePersonById(id: number) {
    this.personService.deletePersonById(id);
  }
}
