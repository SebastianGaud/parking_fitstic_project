import { IVehicle } from '../interfaces/IVehicle'

export class Vehicle implements IVehicle {
    carPlate: string

    constructor(carPlate: string) {
        this.carPlate = carPlate
    }

    static createInstance(carPlate: string): IVehicle {
        return new Vehicle(carPlate)
    }
}

// export class Vehicle {
//   private readonly carPlate: string;
//   cost: number | undefined;

//   readonly startDate: Date;

//   endDate: Date | undefined;
//   isInsideParking: boolean;

//   constructor(carPlate: string) {
//     this.carPlate = carPlate;
//     this.startDate = new Date(moment.now());
//     this.isInsideParking = false;
//   }

//   get Plate(): string {
//     return this.carPlate;
//   }

//   get IsInsideParking(): boolean {
//     return this.isInsideParking;
//   }

//   public toString(): string {
//     if (this.endDate !== undefined) {
//       return `Veicolo targato ${
//         this.carPlate
//       }. Sosta iniziata in data ${this.startDate.toLocaleString()} e finita in data ${this.endDate.toLocaleString()}. Totale pagato: ${
//         this.cost
//       }€`;
//     }
//     return `Veicolo targato ${
//       this.carPlate
//     }. Sosta iniziata in data ${this.startDate.toLocaleString()} e non ancora terminata.`;
//   }
// }
