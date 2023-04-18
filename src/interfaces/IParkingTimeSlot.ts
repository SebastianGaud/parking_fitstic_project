import { IVehicle } from './IVehicle';

export interface IParkingTimeSlot {
    startDate: Date;
    endDate: Date | null;
    cost: number | null;
    vehicle: IVehicle;
}
