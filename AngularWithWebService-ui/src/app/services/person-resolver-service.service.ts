import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Person } from '../person';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonResolverServiceService implements Resolve<Person> {

  constructor(private personService: PersonService) { }
  resolve(route: import('@angular/router').ActivatedRouteSnapshot,
          state: import('@angular/router').RouterStateSnapshot): Person | import('rxjs').Observable<Person>
   | Promise<Person> {
    return null;

  }
}
