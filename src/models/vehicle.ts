import moment from "moment";

class Vehicle {
  private readonly carPlate: string;
  private readonly startDate: Date;
  private endDate: Date | undefined;

  private isInsideParking: boolean;
  private cost: number | undefined;

  constructor(carPlate: string) {
    this.carPlate = carPlate;
    this.startDate = new Date(moment.now());
    this.isInsideParking = false;
  }

  public toString(): string {
    if (this.endDate !== undefined) {
      return `Veicolo targato ${
        this.carPlate
      }. Sosta iniziata in data ${this.startDate.toLocaleString()} e finita in data ${this.endDate.toLocaleString()}. Totale pagato: ${
        this.cost
      }€`;
    }
    return `Veicolo targato ${
      this.carPlate
    }. Sosta iniziata in data ${this.startDate.toLocaleString()} e non ancora terminata.`;
  }
}
