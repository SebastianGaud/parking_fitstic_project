export class Veicolo {
    readonly dataIngresso: Date;
	inParcheggio: boolean;	
	dataUscita: Date | undefined = undefined;
	saldo: number = 0;

	constructor(readonly targa: string) {
		this.inParcheggio = true;
		this.dataIngresso = new Date();
	}

	RiepilogoMacchina() {
		if (this.dataUscita !== undefined) {
			return `Veicolo targato ${
				this.targa
			}. Sosta iniziata in data ${this.dataIngresso.toLocaleString()} e finita in data ${this.dataUscita.toLocaleString()}. Totale pagato: ${
				this.saldo
			}€`;
		}
		return `Veicolo targato ${
			this.targa
		}. Sosta iniziata in data ${this.dataIngresso.toLocaleString()} e non ancora terminata.`;
	}
}
