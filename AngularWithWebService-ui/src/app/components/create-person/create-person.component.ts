import { Component, OnInit } from '@angular/core';
import { Person } from './../../person';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from './../../services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {

  people: any;
  PrioList = [];
  StartNumberList = [];
  duplicatePrioValue: number;
  duplicateStartNumberValue: number;
  addItemForm: FormGroup;
  duplicate: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
  ) { }

  item: Person = {
    startNumber: 0,
    firstName: '',
    lastName: '',
    priority: 0,
    team: '',
    prio: false,
    field: 0,
    level: 0
  };
  message: any;
  duplicateMessage = '';

  ngOnInit() {

    this.getPrioAndStartNumberList();
    console.log(`ez van most a prio listában: ${this.PrioList}`);

    this.addItemForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40),
      Validators.pattern(/^[a-zA-ZáéíóöőüúűÁÉÍÓÖŐÚŰ]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40),
      Validators.pattern(/^[a-zA-ZáéíóöőüúűÁÉÍÓÖŐÚŰ]+$/)]],
      startNumber: [0, [Validators.required, Validators.min(1), Validators.max(1200), Validators.pattern(/^\d{1,3}$/)]],
      team: ['', [Validators.required, Validators.minLength(2)]],
      priority: [0]
    });
  }

  createNewPerson() {

    if (this.addItemForm.valid) {

      this.item.startNumber = this.addItemForm.get('startNumber').value;
      this.item.firstName = this.addItemForm.get('firstName').value;
      this.item.lastName = this.addItemForm.get('lastName').value;
      this.item.team = this.addItemForm.get('team').value;
      this.item.priority = this.addItemForm.get('priority').value;

      if (this.item.priority !== 0) {
        this.item.prio = true;
      } else { this.item.priority = 100; }

      this.item.field = 0;
      this.item.level = 0;

      if (this.item.priority !== 100) {
        for (let i = 0; i < this.PrioList.length - 1; i++) {
          if (this.PrioList[i] !== 100
            && +this.PrioList[i] === +this.item.priority) {
            this.duplicatePrioValue = this.PrioList[i];
            this.duplicate = true;
            this.duplicateMessage += `Ilyen kiemelt már létezik: ${this.duplicatePrioValue}`;
            break;
          }
        }

      }

      for (let i = 0; i < this.StartNumberList.length - 1; i++) {
        if (+this.StartNumberList[i] === +this.item.startNumber) {
          this.duplicateStartNumberValue = this.StartNumberList[i];
          this.duplicate = true;
          if (this.duplicateMessage === '') {
            this.duplicateMessage = `Ilyen Start szám már létezik: ${this.duplicateStartNumberValue}`;
          } else {
            this.duplicateMessage += `, illetve Ilyen Start szám is már létezik: ${this.duplicateStartNumberValue}`;
          }
          break;
        }
      }

      if (this.duplicatePrioValue === undefined && this.duplicateStartNumberValue === undefined) {
        this.personService.createPerson(this.item).
          subscribe((data) => {
            this.addItemForm.reset();
            this.message = data;
          });

      } else {
        console.log(this.duplicateMessage);
      }
    }
  }

  clear(): void {
    this.item.startNumber = 0,
      this.item.firstName = '',
      this.item.lastName = '',
      this.item.priority = 0,
      this.item.team = '',
      this.item.prio = false;
    this.item.field = 0;
    this.item.level = 0;

  }

  getPrioAndStartNumberList() {

    this.personService.getPeople()
      .subscribe(
        (data) => {
          this.people = data;
          this.PrioList = this.people.map(data$ => { return data$['priority'] });
          this.StartNumberList = this.people.map(data$ => { return data$['startNumber'] });
          //this.PrioList = this.people.map(function (a) { return a['priority']; });

          console.log(this.PrioList);
          console.log(this.StartNumberList);
        },
        error => {
          return console.log('Server error');
        },
      );

  }
}
