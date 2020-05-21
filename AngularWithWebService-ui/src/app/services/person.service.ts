import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './../person';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  people: any;
  PrioList = [];

  constructor(private httpClient: HttpClient) { }

  getPeople() {

    return this.httpClient.get('/server/api/v1/people');

  }

  getPersonById(id: number) {
    return this.httpClient.get('/server/api/v1/people/' + id).subscribe((data) =>
      this.people = data);
  }

  deletePersonById(id: number) {
    return this.httpClient.delete('/server/api/v1/people/cancel/' + id).subscribe((data) =>
      this.people = data);
  }

  deleteAllPeople() {
    return this.httpClient.delete('/server/api/v1/people/cancel/all').subscribe((data) =>
      this.people = data);
  }

  createPerson(person: Person) {
    return this.httpClient.post('/server/api/v1/people/create', person, { responseType: 'text' as 'json' });
  }

}
