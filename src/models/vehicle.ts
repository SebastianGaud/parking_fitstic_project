import { IVehicle } from '../interfaces/IVehicle';

export class Vehicle implements IVehicle {
    carPlate: string;

    constructor(carPlate: string) {
        this.carPlate = carPlate;
    }

    static createInstance(carPlate: string): IVehicle {
        return new Vehicle(carPlate);
    }
}
