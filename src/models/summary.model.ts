import { BaseModel } from './base.model';
import { Person } from './person.model';

export class Summary extends BaseModel {
  peopleCount: number;

  peopleReceiving: Person[];

  expensesTotal: number;

  expensesPerPerson: number;

  date: Date;

  constructor(
    peopleCount: number,
    peopleReceiving: Person[],
    expensesTotal: number,
    expensesPerPerson: number,
    date: Date,
  ) {
    super();
    this.peopleCount = peopleCount;
    this.peopleReceiving = peopleReceiving;
    this.expensesTotal = expensesTotal;
    this.expensesPerPerson = expensesPerPerson;
    this.date = date;
  }
}
