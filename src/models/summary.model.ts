import { BaseModel } from "./base.model";
import { Person } from "./person.model";

export class Summary extends BaseModel {
    peopleCount: number;

    peopleReceiving: Person[];

    expensesPerPerson: number;

    constructor(
        peopleCount: number,
        peopleReceiving: Person[],
        expensesPerPerson: number
    ) {
        super();
        this.peopleCount = peopleCount;
        this.peopleReceiving = peopleReceiving;
        this.expensesPerPerson = expensesPerPerson;
    }
}
