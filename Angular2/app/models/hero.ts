import {IHero} from "../interfaces/IHero";

export class Hero implements IHero {
    constructor(public id: number, public name: string) {
        this.id = id;
        this.name = name;
    }
}