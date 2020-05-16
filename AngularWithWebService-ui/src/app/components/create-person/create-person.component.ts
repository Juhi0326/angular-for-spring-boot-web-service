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
  addItemForm: FormGroup;
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
  PrioList = [];
  PrioButton: number = this.PrioList[0];
  found: number;

  ngOnInit() {
    console.log(this.PrioList);
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
      console.log(this.item.priority);
      if (this.item.priority !== 0) {
        this.item.prio = true;
      } else { this.item.priority = 100; }

      this.item.field = 0;
      this.item.level = 0;

      this.personService.createPerson(this.item).
        subscribe((data) => this.message = data);

    }


  }

  // clickPrioButton(): void {
  //   this.PrioButton = this.PrioList.shift();
  //   this.PrioList.push(Math.max(...this.PrioList) + 1);
  //   this.addItemForm.controls.priority.setValue(this.PrioButton);
  //   this.PrioButton = this.PrioList[0];
  //   console.log(this.PrioList);
  // }

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



}
