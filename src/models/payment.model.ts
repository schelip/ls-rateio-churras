import { BaseModel } from './base.model';
import { Person } from './person.model';

export class Payment extends BaseModel {
    personPaying: Person;

    personReceiving: Person;

    value: number;

    constructor(
      personPaying: Person,
      personReceiving: Person,
      value: number,
    ) {
      super();
      this.personPaying = personPaying;
      this.personReceiving = personReceiving;
      this.value = value;
    }
}
