import { IParking } from './interfaces/IParking';
import { IParkingTimeSlot } from './interfaces/IParkingTimeSlot';
import { IVehicle } from './interfaces/IVehicle';
import { ParkingTimeSlot } from './models/ParkingTimeSlot';
import { Vehicle } from './models/Vehicle';

import moment from 'moment';

export class ParkingController {
    parking: IParking;
    vehicleTimeSlots: IParkingTimeSlot[];

    constructor(parking: IParking, vehicleTimeSlots: IParkingTimeSlot[] = []) {
        this.parking = parking;
        this.vehicleTimeSlots = vehicleTimeSlots;
    }

    static createInstance(
        parking: IParking,
        vehicleTimeSlots: IParkingTimeSlot[],
    ): ParkingController {
        return new ParkingController(parking, vehicleTimeSlots);
    }

    private getParked(): Array<IParkingTimeSlot> {
        return this.vehicleTimeSlots.filter((e) => !e.endDate);
    }

    private isParkFull(): boolean {
        return this.getParked().length >= this.parking.slots;
    }

    private canPark(carPlate: string): boolean {
        return !this.isParkFull() && !this.isCarInsideParking(carPlate);
    }

    private getCarTimeSlot(carPlate: string): IParkingTimeSlot | undefined {
        return this.getParked().find((e) => e.vehicle.carPlate == carPlate);
    }

    private isCarInsideParking(carPlate: string): boolean {
        const isInside = this.getParked().some(
            (e) => e.vehicle.carPlate == carPlate,
        );

        return isInside;
    }

    get parkedVehicles(): number {
        return this.getParked().length;
    }

    private getBalance(v: IParkingTimeSlot): number {
        if (!v) {
            throw new Error('Errore. Non posso calcolare il costo');
        }

        let difMin = (v as ParkingTimeSlot).getMinutes();
        difMin = difMin == 0 ? 15 : difMin;

        // 15 dovrebbe essere un valore costante da qualche parte
        const slots = Math.ceil(difMin / 15);

        // perchè 4? perchè 15 * 4 = 60 in un ora ci sono quattro blocchi anche questo dovrebbe essere da qualche parte
        const costsXQuarter = this.parking.hourlyCost / 4;

        const cost = Math.round(slots * costsXQuarter * 100) / 100;

        return cost;
    }

    enter(carPlate: string): IVehicle | null {
        if (!this.canPark(carPlate)) {
            throw new Error("Errore. Non posso parcheggiare l'auto ora");
        }

        const v = Vehicle.createInstance(carPlate);
        const slot = ParkingTimeSlot.createInstance(v, new Date(moment.now()));

        this.vehicleTimeSlots.push(slot);
        return v;
    }

    exit(carPlate: string): IParkingTimeSlot | null {
        const s = this.getCarTimeSlot(carPlate);

        if (!s) {
            return null;
        }

        s.endDate = new Date(moment.now());
        const c = this.getBalance(s);
        s.cost = c;

        return s;
    }

    listParked(): Array<IParkingTimeSlot> {
        const parkedVehicles = this.getParked();
        const plates = [];

        for (const v of parkedVehicles) {
            plates.push(v);
        }

        return plates;
    }

    getVehicleHistory(carPlate: string) {
        const h = this.vehicleTimeSlots
            .filter((e) => e.vehicle.carPlate == carPlate)
            .filter((e) => e.endDate != null);

        return h;
    }
}
