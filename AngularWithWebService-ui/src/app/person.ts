export class Person {
  id?: number;
  firstName: string;
  lastName: string;
  startNumber: number;
  priority: number;
  team: string;
  prio: boolean;
  field: number;
  level: number;


  constructor(firstName: string, lastName: string, startNumber: number) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.startNumber = startNumber;
  }
}
