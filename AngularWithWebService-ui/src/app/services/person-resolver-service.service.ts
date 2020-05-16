import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Person } from '../person';
import { PersonService } from './person.service';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonResolverServiceService implements Resolve<any> {

  constructor(private personService: PersonService) { }
  resolve(route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot): any
    | import('rxjs').Observable<any>
    | Promise<any> {
    return this.personService.getPeople().pipe(
      catchError((error) => {
        return empty();
      })
    );
  }
}
