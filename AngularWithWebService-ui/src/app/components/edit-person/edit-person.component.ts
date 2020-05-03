import { Component, OnInit } from '@angular/core';
import { PersonService } from './../../services/person.service';
import { Person } from 'src/app/person';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
person: any;
  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getPeople();
  }

}
