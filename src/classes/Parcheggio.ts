import { Veicolo } from "./Veicolo";

export class Parcheggio {
	readonly name: string = "Parcheggio 5";
	readonly address: string = "Via Giovanni da Procida, 5";
	readonly numPosti: number = 4;
	readonly rate: number = 2.5;

	private vehicles: Veicolo[] = [];   

	get Vehicles() {
		return this.vehicles;
	}

     ParkRecap(){
        return `Benvenuti al ${this.name} di ${this.address}. Numero massimo di posti disponibili ${this.numPosti} - Tariffa oraria ${this.rate}€`
    }

    Find(targa: string){
        let v = this.vehicles.find((e) => e.targa === targa);               
        return v;        
    }    

    IsParkFull(){
        const cars = this.NumParked();
        if (cars === this.numPosti) {
            return "Parcheggio pieno. Non ci sono posti disponibili";
        }
        return false;
    }

    CarExist(targa:string){
        let v = this.Find(targa);
        if (v !== undefined){
            return v;
        }
        return false;
    }
    

    IsCArParked(targa:string){
        let v =  this.CarExist(targa);      
        if ( v != false){
            if (v?.inParcheggio) {
                return "Macchina già presente nel parcheggio";
            }                       
        }   
        return false;
    }
	 
	Enter(targa: string) {
        let v = this.vehicles.find((e) => e.targa === targa && e.inParcheggio === true);        
		if (v === undefined ) {            
            v = new Veicolo(targa);
            v.saldo = 0;        
            this.vehicles.push(v);
            return v?.RiepilogoMacchina();		
	    }
        
    }     

	Exit(targa : string) {
        let v = this.vehicles.find((e) => e.targa === targa);        
        if(v !== undefined){ 
            v.dataUscita = new Date(new Date().setMinutes(59))          
            v.inParcheggio = false;
            this.BalanceCalc(v);                        
            return v.RiepilogoMacchina();
        }
		return "Macchina non presente nel parcheggio";
	}

	ListParked() {
        let veicoli :string[] = [];
        const array = this.vehicles.filter((e) => e.dataUscita === undefined);
        for(let v of array){
            veicoli.push(v.RiepilogoMacchina())
        }
        return veicoli;
	}

	NumParked() {
		const array = this.vehicles.filter((e) => e.dataUscita === undefined);
		const numVeicoli = array.length;
		return numVeicoli;
	}    

	RangeTimeCalc(d1: Date, d2: Date) {		
		const start = d1.getTime();
		const exit = d2.getTime();
		const diffMs = exit - start;
		const difMin = Math.round(diffMs / 1000 / 60);
		return difMin;
	}

	BalanceCalc(v: Veicolo) {
		if (v.dataUscita !== undefined) {            
			const difMin = this.RangeTimeCalc(v.dataIngresso, v.dataUscita);
			const numBlocchi = Math.ceil(difMin / 15);
			const tariffaBlocco = this.rate / 4;
			const saldo = Math.round(numBlocchi * tariffaBlocco * 100) / 100;
			v.saldo = saldo;            
			return saldo;
		}
		return "Il veicolo inserito è ancora parcheggiato. Impossibile calcolare il saldo prima dell'Exit del veicolo.";
	}

	RecapSoste(targa: string) {
        let veicoli : string[] = [];
		const array = this.vehicles.filter((e) => e.targa === targa);        
        for(let v of array){
            veicoli.push(v.RiepilogoMacchina())
        }
        return veicoli;		
	}
}
