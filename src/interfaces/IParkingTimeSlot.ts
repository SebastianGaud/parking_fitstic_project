import { IVehicle } from './IVehicle';

export interface IParkingTimeSlot {
    startDate: Date;
    endDate: Date | undefined;
    vehicle: IVehicle;
}
