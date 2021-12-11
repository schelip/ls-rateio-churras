import { BaseModel } from './base.model';

export class Person extends BaseModel {
    name: string;

    dates: Date[];

    constructor(name: string) {
      super();
      this.name = name;
      this.dates = [];
    }
}
