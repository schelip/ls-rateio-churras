import { BaseModel } from "./base.model";

export class Person extends BaseModel {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
