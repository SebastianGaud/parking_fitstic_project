import * as rl from 'readline-sync';
import { ParkingController } from './ParkingController';
import { Parking } from './models/Parking';

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

// function ChooseAction(num: number) {
//     let targa: string;

//     switch (num) {
//         case 1:
//             targa = ChiediTarga();
//             let numParked = p.IsParkFull();
//             let carParked = p.IsCArParked(targa);
//             if (numParked != false) {
//                 console.log(numParked);
//                 break;
//             }
//             if (carParked != false) {
//                 console.log(carParked);
//                 break;
//             }
//             console.log(p.Enter(targa));
//             break;

//         case 2:
//             targa = ChiediTarga();
//             console.log(p.Exit(targa));
//             break;

//         case 3:
//             console.log('Elenco veicoli attualmente parcheggiati: ');
//             let lista = p.ListParked();
//             for (let e of lista) {
//                 console.log(e);
//             }
//             break;

//         case 4:
//             console.log('Numero veicoli attualmente parcheggiati: ');
//             console.log(p.NumParked());
//             break;

//         case 5:
//             targa = ChiediTarga();
//             console.log(`Riepilogo soste veicolo con targa ${targa}: `);
//             let listaSoste = p.RecapSoste(targa);
//             for (let e of listaSoste) {
//                 console.log(e);
//             }
//             break;

//         default:
//             console.log('Valore inserito non valido. Riprovare');
//             console.clear();
//             break;
//     }
// }

function ChooseAction(choice: number) {
    switch (choice) {
        case 1:
            const insertPlate = AskForPlate();
            pc.enter(insertPlate);
            break;
        case 2:
            const exitPlate = AskForPlate();
            console.log(pc.exit(exitPlate));
            break;
        case 3:
            const vehicles = pc.listParked();
            console.log(vehicles);
        case 4:
            console.log('Numero veicoli attualmente parcheggiati: ');
            console.log(pc.parkedVehicles);
            break;

        case 5:
            const carPlate = AskForPlate();
            console.log(`Riepilogo soste veicolo con targa ${carPlate}: `);

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
