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
  duplicatePrioValue = 0;
  duplicateStartNumberValue = 0;
  addItemForm: FormGroup;
  duplicate: boolean;
  invalidForm: boolean;
  invalidFormMessage = '';

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
  newItem: boolean;

  ngOnInit() {

    this.getPrioAndStartNumberList();
    this.formGroupInit();

  }

  refresh(): void {
    window.location.reload();
  }

  createNewPerson() {
    this.getPrioAndStartNumberList();
    this.duplicateMessage = '';

    if (this.addItemForm.valid) {
      this.invalidForm = false;
      this.invalidFormMessage = '';

      if (this.addItemForm.get('startNumber').value === '') {
        this.item.startNumber = 0;
      } else {
        this.item.startNumber = +this.addItemForm.get('startNumber').value;
      }

      this.item.firstName = this.addItemForm.get('firstName').value;
      this.item.lastName = this.addItemForm.get('lastName').value;
      this.item.team = this.addItemForm.get('team').value;

      if (this.addItemForm.get('priority').value === '' || this.addItemForm.get('priority').value === 0) {
        this.item.priority = 0;
      } else {
        this.item.priority = +this.addItemForm.get('priority').value;
      }


      if (this.item.priority !== 0) {
        this.item.prio = true;
      } else {
        this.item.priority = 100;
        this.item.prio = false;
      }

      this.item.field = 0;
      this.item.level = 0;

      if (this.item.priority !== 100) {
        for (let i = 0; i < this.PrioList.length; i++) {
          if (+this.PrioList[i] === +this.item.priority) {
            this.duplicatePrioValue = this.PrioList[i];
            console.log(this.duplicatePrioValue);
            this.duplicate = true;

            this.duplicateMessage += `Ilyen kiemelt már létezik: ${this.duplicatePrioValue}`;
            this.addItemForm.reset();
            this.formGroupContinue();
            break;
          }
        }

      }

      for (let i = 0; i < this.StartNumberList.length; i++) {
        if (+this.StartNumberList[i] === +this.item.startNumber) {
          this.duplicateStartNumberValue = this.StartNumberList[i];
          this.duplicate = true;
          if (this.duplicateMessage === '') {

            this.duplicateMessage = `Ilyen Start szám már létezik: ${this.duplicateStartNumberValue}`;
            this.message = null;
            this.addItemForm.reset();
            this.formGroupContinue();
          } else {
            this.duplicateMessage += `, illetve Ilyen Start szám is már létezik: ${this.duplicateStartNumberValue}`;
            this.message = null;
            this.addItemForm.reset();
            this.formGroupContinue();
          }
          break;
        }
      }

      if (this.duplicatePrioValue === 0 && this.duplicateStartNumberValue === 0) {
        this.personService.createPerson(this.item).
          subscribe((data) => {
            this.item.prio = false;
            this.addItemForm.reset();
            this.addItemForm.patchValue({
              startNumber: '',
              priority: '',
            });
            this.getPrioAndStartNumberList();
            this.message = data;
          });

      } else {
        console.log(this.duplicateMessage);
      }
    } else {
      this.invalidForm = true;
      this.invalidFormMessage += 'Nem sikerült elmenteni a formot, van olyan mező, ami nem lett helyesen kitöltve!';
    }
    this.PrioList = [];
    this.StartNumberList = [];
    this.duplicatePrioValue = 0;
    this.duplicateStartNumberValue = 0;
    this.item.priority = 0;
    this.item.startNumber = 0;
  }

  formGroupInit() {
    this.addItemForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40),
      Validators.pattern(/^[a-zA-ZáéíóöőüúűÁÉÍÓÖŐÚŰ]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40),
      Validators.pattern(/^[a-zA-ZáéíóöőüúűÁÉÍÓÖŐÚŰ]+$/)]],
      startNumber: ['', [Validators.required, Validators.min(1), Validators.max(1200), Validators.pattern(/^[0-9]*$/)]],
      team: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      priority: ['', [Validators.max(99), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  formGroupContinue() {

    if (this.duplicateStartNumberValue !== 0 && this.duplicatePrioValue === 0 && this.item.priority === 100) {
      this.addItemForm.patchValue({
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        startNumber: '',
        team: this.item.team,
        priority: ''
      });
    }
    else if (this.duplicateStartNumberValue !== 0 && this.duplicatePrioValue === 0 && this.item.priority !== 100) {
      this.addItemForm.patchValue({
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        startNumber: '',
        team: this.item.team,
        priority: this.item.priority
      });
    }

    else if (this.duplicateStartNumberValue === 0 && this.duplicatePrioValue === 0) {
      this.addItemForm.patchValue({
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        team: this.item.team,
        startNumber: '',
        priority: '',
      });
    } else if (this.duplicateStartNumberValue !== 0 && this.duplicatePrioValue !== 0) {
      this.addItemForm.patchValue({
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        team: this.item.team,
        startNumber: this.item.startNumber,
        priority: '',
      });
    } else {
      this.addItemForm.patchValue({
        firstName: this.item.firstName,
        lastName: this.item.lastName,
        team: this.item.team,
        startNumber: this.item.startNumber,
        priority: '',
      });
    }

  }

  focusFunction() {
    if (this.duplicateMessage.length > 1 || this.message !== undefined) {
      console.log('működik a focus');
      this.newItem = true;
      this.duplicateMessage = '';
      this.message = undefined;
    }
    if (this.invalidForm === true) {
      this.invalidFormMessage = '';
      this.invalidForm = false;
    }

  }

  get firstName() { return this.addItemForm.get('firstName'); }
  get lastName() { return this.addItemForm.get('lastName'); }
  get startNumber() { return this.addItemForm.get('startNumber'); }
  get team() { return this.addItemForm.get('team'); }
  get priority() { return this.addItemForm.get('priority'); }

  getPrioAndStartNumberList() {

    this.personService.getPeople()
      .subscribe(
        (data) => {
          this.people = data;
          // tslint:disable-next-line: no-string-literal
          this.PrioList = this.people.map(data$ => data$['priority']);
          // tslint:disable-next-line: no-string-literal
          this.StartNumberList = this.people.map(data$ => data$['startNumber']);
          // this.PrioList = this.people.map(function (a) { return a['priority']; });

          console.log(this.PrioList);
          console.log(this.StartNumberList);
        },
        error => {
          return console.log('Server error');
        },
      );

  }
}
