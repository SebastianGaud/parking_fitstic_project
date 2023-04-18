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

    getBalance(carPlate: string): IParkingTimeSlot {
        const v = this.getCarTimeSlot(carPlate);

        if (!v) {
            throw new Error('Errore. Non posso calcolare il costo');
        }

        const difMin = (v as ParkingTimeSlot).getMinutes();
        // 15 dovrebbe essere un valore costante da qualche parte
        const slots = Math.ceil(difMin / 15);

        // perchè 4? perchè 15 * 4 = 60 in un ora ci sono quattro blocchi anche questo dovrebbe essere da qualche parte
        const costsXQuarter = this.parking.hourlyCost / 4;

        const cost = Math.round(slots * costsXQuarter * 100) / 100;
        v.cost = cost;
        return v;
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

// import { Vehicle } from "./vehicle";

// export class Parking {
//   private name: string;
//   private address: string;
//   private slots: number;
//   private hourlyCost: number;

//   private vehicles: Vehicle[] = [];

//   constructor(
//     name: string,
//     address: string,
//     slots: number,
//     hourlyCost: number
//   ) {
//     this.name = name;
//     this.address = address;
//     this.slots = slots;
//     this.hourlyCost = hourlyCost;
//   }

//   ParkRecap() {
//     return `Benvenuti al ${this.name} di ${this.address}. Numero massimo di posti disponibili ${this.slots} - Tariffa oraria ${this.hourlyCost}€`;
//   }

//   Find(targa: string) {
//     let v = this.vehicles.find((e) => e.Plate === targa);
//     return v;
//   }

//   IsParkFull() {
//     const cars = this.NumParked();
//     if (cars === this.slots) {
//       return "Parcheggio pieno. Non ci sono posti disponibili";
//     }
//     return false;
//   }

//   CarExist(targa: string) {
//     let v = this.Find(targa);
//     if (v !== undefined) {
//       return v;
//     }
//     return false;
//   }

//   IsCArParked(targa: string) {
//     let v = this.CarExist(targa);
//     if (v != false) {
//       if (v?.IsInsideParking) {
//         return "Macchina già presente nel parcheggio";
//       }
//     }
//     return false;
//   }

//   Enter(targa: string) {
//     let v = this.vehicles.find(
//       (e) => e.Plate === targa && e.IsInsideParking === true
//     );
//     if (v === undefined) {
//       v = new Vehicle(targa);
//       this.vehicles.push(v);
//       return v.toString();
//     }
//   }

//   Exit(targa: string) {
//     let v = this.vehicles.find((e) => e.Plate === targa);
//     if (v !== undefined) {
//       v.endDate = new Date(new Date().setMinutes(59));
//       v.isInsideParking = false;
//       this.BalanceCalc(v);
//       return v.toString();
//     }
//     return "Macchina non presente nel parcheggio";
//   }

//   ListParked() {
//     let veicoli: string[] = [];
//     const array = this.vehicles.filter((e) => e.endDate === undefined);
//     for (let v of array) {
//       veicoli.push(v.toString());
//     }
//     return veicoli;
//   }

//   NumParked() {
//     const array = this.vehicles.filter((e) => e.endDate === undefined);
//     const numVeicoli = array.length;
//     return numVeicoli;
//   }

//   RangeTimeCalc(d1: Date, d2: Date) {
//     const start = d1.getTime();
//     const exit = d2.getTime();
//     const diffMs = exit - start;
//     const difMin = Math.round(diffMs / 1000 / 60);
//     return difMin;
//   }

//   BalanceCalc(v: Vehicle) {
//     if (v.endDate !== undefined) {
//       const difMin = this.RangeTimeCalc(v.startDate, v.endDate);
//       const numBlocchi = Math.ceil(difMin / 15);
//       const tariffaBlocco = this.hourlyCost / 4;
//       const saldo = Math.round(numBlocchi * tariffaBlocco * 100) / 100;
//       v.cost = saldo;
//       return saldo;
//     }
//     return "Il veicolo inserito è ancora parcheggiato. Impossibile calcolare il saldo prima dell'Exit del veicolo.";
//   }

//   RecapSoste(targa: string) {
//     let veicoli: string[] = [];
//     const array = this.vehicles.filter((e) => e.Plate === targa);
//     for (let v of array) {
//       veicoli.push(v.toString());
//     }
//     return veicoli;
//   }
// }
