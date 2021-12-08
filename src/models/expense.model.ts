import { BaseModel } from './base.model';
import { Person } from './person.model';

export class Expense extends BaseModel {
    person: Person;

    value: number;

    date: Date;

    constructor(person: Person, value: number, date: Date) {
      super();
      this.person = person;
      this.value = value;
      this.date = date;
    }
}
