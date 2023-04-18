# cose da risolvere in questa versione del progetto:

- [x] I modelli dovrebbero solo essere un vettore per i dati ad essi collegati e non devono contenere logica. eg:

```typescript
export class Vehicle {
  private readonly carPlate: string;
  cost: number | undefined;

  readonly startDate: Date;

  endDate: Date | undefined;
  isInsideParking: boolean;

  // omesso
}
```

> il costo non dovrebbe essere dentro il veicolo perchè il veicolo di per sè non ha il "senso" di un costo, il costo è dato dalla tariffa oraria del parcheggio, il veicolo non dovrebbe nemmeno avere un inizio ed una fine, queste sono peculirità del concetto "sosta" all'interno del parcheggio, non del veicolo.

```typescript
export class Parking {
  private name: string;
  private address: string;
  private slots: number;
  private hourlyCost: number;

  private vehicles: Vehicle[] = [];

  constructor(
    name: string,
    address: string,
    slots: number,
    hourlyCost: number
  ) {
    this.name = name;
    this.address = address;
    this.slots = slots;
    this.hourlyCost = hourlyCost;
  }

  ParkRecap() {
    return `Benvenuti al ${this.name} di ${this.address}. Numero massimo di posti disponibili ${this.slots} - Tariffa oraria ${this.hourlyCost}€`;
  }

  Find(targa: string) {
    let v = this.vehicles.find((e) => e.Plate === targa);
    return v;
  }

  IsParkFull() {
    const cars = this.NumParked();
    if (cars === this.slots) {
      return "Parcheggio pieno. Non ci sono posti disponibili";
    }
    return false;
  }

  // omesso per brevità
```

> Allo stesso modo il modello "Parking" Non deve contenere la logica di come si gestisce il parcheggio ma solo le informazioni su di esso

- [x] Rifacendoci al [Factory pattern](https://dev.to/luizcalaca/typescript-factory-design-pattern-in-practice-uml-6g9), è una buona idea implementare un metodo per inizializzare le classi:

```typescript
const p: Parking = new Parking(
  "Parcheggio 5",
  "Via Giovanni da Procida, 5",
  4,
  2.5
);
```

- [x] Invece di avere i modelli per le classi, Creare le interfacce, che definiscono i dati
- [x] Creare le classi che devono poi gestire i dati da passare al "program.ts" per la parte di presentazione
