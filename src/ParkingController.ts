import { IParking } from './interfaces/IParking';
import { IVehicle } from './interfaces/IVehicle';
import { Vehicle } from './models/Vehicle';

export class ParkingController {
    parking: IParking;
    vehicles: IVehicle[];

    constructor(parking: IParking, vehicles: IVehicle[]) {
        this.parking = parking;
        this.vehicles = [];
    }

    static createInstance(
        parking: IParking,
        vehicles: IVehicle[],
    ): ParkingController {
        return new ParkingController(parking, vehicles);
    }

    private isCarInsideParking(carPlate: string) {
        const isInside = this.vehicles.find((e) => e.carPlate == carPlate);
        return isInside;
    }

    enter(carPlate: string): IVehicle {
        const v = Vehicle.createInstance(carPlate);
        this.vehicles.push(v);
        return v;
    }

    listParked(): Array<string> {
        const plates = [];

        for (const v of this.vehicles) {
            plates.push(v.carPlate);
        }

        return plates;
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