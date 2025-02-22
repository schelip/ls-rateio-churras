/* eslint-disable no-shadow */
import { BaseModel } from './base.model';
import { Person } from './person.model';

export enum ReceivingEnum {
    yes = 'A receber',
    no = 'A restituir',
    equal = 'Nada a fazer',
}
export class Total extends BaseModel {
    person: Person;

    expensesValue: number;

    totalValue: number;

    remainingValue: number

    isReceiving: ReceivingEnum;

    constructor(
      person: Person,
      expensesValue: number,
      totalValue: number,
      remainingValue: number,
      isReceiving: ReceivingEnum,
    ) {
      super();
      this.person = person;
      this.expensesValue = expensesValue;
      this.totalValue = totalValue;
      this.remainingValue = remainingValue;
      this.isReceiving = isReceiving;
    }
}
