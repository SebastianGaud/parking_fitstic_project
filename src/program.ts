import * as rl from 'readline-sync';
import { ParkingController } from './ParkingController';
import { Parking } from './models/Parking';
import {
    enterVehicleMessage,
    exitVehicleMessage,
    vehicleSummary,
    vehiclesParkedDetails,
} from './MessageHelper';

// le informazioni iniziali le passiamo nel costruttore nel caso in cui volessimo
// creare un altro parcheggio

const p: Parking = Parking.createInstance(
    'Parcheggio 5',
    'Via Giovanni da Procida, 5',
    4,
    2.5,
);

const pc: ParkingController = ParkingController.createInstance(p, []);

function AskForPlate() {
    let targa = rl.question('Inserisci targa veicolo: ');
    return targa;
}

function ChooseAction(choice: number) {
    switch (choice) {
        case 1:
            const insertPlate = AskForPlate();
            const inVehicle = pc.enter(insertPlate);
            const message = enterVehicleMessage(inVehicle);
            console.log(message);
            break;
        case 2:
            const exitPlate = AskForPlate();
            const exitVehicle = pc.exit(exitPlate);
            const exitMessage = exitVehicleMessage(exitVehicle);
            console.log(exitMessage);
            break;
        case 3:
            const vehicles = pc.listParked();
            const parkedMessage = vehiclesParkedDetails(vehicles);
            console.log(parkedMessage);
            break;
        case 4:
            console.log('Numero veicoli attualmente parcheggiati: ');
            console.log(pc.parkedVehicles);
            break;

        case 5:
            const carPlate = AskForPlate();
            const h = pc.getVehicleHistory(carPlate);
            const hMessage = vehicleSummary(carPlate, h);
            console.log(hMessage);
        default:
            break;
    }
}

// non c'è bisogno di fare una classe "Program -> Main". In Javascript/Typescript
// il codice all'interno dei file viene sempre eseguito dall'altro verso il basso
// quindi il while viene eseguito come fosse nel "Main" di C#
while (true) {
    //console.log(p.ParkRecap());
    console.log('-------------------');
    console.log('');
    console.log('1) Entrata veicolo');
    console.log('2) Uscita Veicolo');
    console.log('3) Stampa lista veicoli parcheggiati');
    console.log('4) Stampa numero veicoli parcheggiati');
    console.log('5) Ricerca soste veicolo');
    console.log('');
    console.log('9) Esci');
    console.log('');

    let num = rl.questionInt('Inserisci la tua scelta:  ');

    if (num == 9) {
        console.log('Grazie per aver usato il nostro parcheggio. A presto.');
        console.clear();

        // invece di fare return per uscire dal metodo faccio break per rompere il ciclo while
        break;
    }

    ChooseAction(num);
}
