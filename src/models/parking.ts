import { IParking } from '../interfaces/IParking';

export class Parking implements IParking {
    name: string;
    address: string;
    slots: number;
    hourlyCost: number;

    constructor(
        name: string,
        address: string,
        slots: number,
        hourlyCost: number,
    ) {
        this.name = name;
        this.address = address;
        this.slots = slots;
        this.hourlyCost = hourlyCost;
    }

    static createInstance(
        name: string,
        address: string,
        slots: number,
        hourlyCost: number,
    ): IParking {
        return new Parking(name, address, slots, hourlyCost);
    }
}
