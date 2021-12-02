import { BaseModel } from './base.model';
import { Person } from './person.model';

export class Expense extends BaseModel {
    person: Person;

    value: number;

    constructor(person: Person, value: number) {
      super();
      this.person = person;
      this.value = value;
    }
}
