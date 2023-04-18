import moment from 'moment';
import { IParkingTimeSlot } from '../interfaces/IParkingTimeSlot';
import { IVehicle } from '../interfaces/IVehicle';

export class ParkingTimeSlot implements IParkingTimeSlot {
    readonly startDate: Date;
    readonly vehicle: IVehicle;

    private _endDate: Date | null;
    _cost: number | null;

    constructor(
        vehicle: IVehicle,
        startDate: Date,
        endDate: Date | null,
        cost = null,
    ) {
        this.startDate = startDate;
        this.vehicle = vehicle;
        this._endDate = endDate;
        this._cost = cost;
    }

    public get endDate(): Date | null {
        return this._endDate;
    }
    public set endDate(value: Date | null) {
        this._endDate = value;
    }

    set cost(cost: number) {
        this._cost = cost;
    }

    // da togliere in un secondo momento probabilmente
    getMinutes() {
        if (!this._endDate) {
            throw new Error("L'auto non è ancora uscita dal parcheggio");
        }

        const start = this.startDate.getTime();
        const exit = this._endDate.getTime();
        const diffMs = exit - start;
        const difMin = Math.round(diffMs / 1000 / 60);
        return difMin;
    }

    static createInstance(
        vehicle: IVehicle,
        startDate: Date,
        endDate: Date | null = null,
    ): IParkingTimeSlot {
        return new ParkingTimeSlot(vehicle, startDate, endDate);
    }
}
