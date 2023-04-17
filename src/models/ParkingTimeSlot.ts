import moment from 'moment';
import { IParkingTimeSlot } from '../interfaces/IParkingTimeSlot';
import { IVehicle } from '../interfaces/IVehicle';

export class ParkingTimeSlot implements IParkingTimeSlot {
    readonly startDate: Date;
    readonly vehicle: IVehicle;

    endDate: Date | undefined;

    constructor(vehicle: IVehicle, startDate: Date, endDate: Date | undefined) {
        this.startDate = startDate;
        this.vehicle = vehicle;
        this.endDate = endDate;
    }

    static createInstance(
        vehicle: IVehicle,
        startDate: Date,
        endDate: Date | undefined = undefined,
    ): IParkingTimeSlot {
        return new ParkingTimeSlot(vehicle, startDate, endDate);
    }
}
