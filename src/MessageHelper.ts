import moment from 'moment';
import { IParkingTimeSlot } from './interfaces/IParkingTimeSlot';
import { IVehicle } from './interfaces/IVehicle';

export function enterVehicleMessage(v: IVehicle | null): string {
    if (v == null) {
        return `
            ************************************************************
            Errore, il veicolo non ha effettuato l'entrata correttamente
            ************************************************************
            `;
    }
    return `
        Il veicolo targato: ${v.carPlate}. Ha effettuato correttamente l'entrata
        `;
}

export function exitVehicleMessage(slot: IParkingTimeSlot | null): string {
    if (!slot) {
        return `
        ***********************************************************
        Errore, il veicolo non ha effettuato l'uscita correttamente
        ***********************************************************
        `;
    }

    const e = moment(slot.endDate);
    const s = moment(slot.startDate);
    return `
        Il veicolo targato: ${slot.vehicle.carPlate}.
        È entrato nel parcheggio alle: ${s.format('HH:mm')} del ${s.format(
        'DD-MM-yyyy',
    )}.
        Ha terminato la sosta alle: ${e.format('HH:mm')} del ${e.format(
        'DD-MM-yyyy',
    )}.
        Spendedo: ${slot.cost} €
    `;
}

export function vehiclesParkedDetails(slots: IParkingTimeSlot[]) {
    let sb = '';

    for (const s of slots) {
        const msg = vehicleParkedDetail(s);
        sb = sb + `\n${msg}\n`;
    }

    return sb;
}

export function vehicleSummary(carPlate: string, slots: IParkingTimeSlot[]) {
    let sb = `
        Riepilogo soste veicolo con targa ${carPlate}: 

    `;

    for (const s of slots) {
        sb =
            sb +
            `
           ${exitVehicleMessage(s)}
        
           `;
    }

    return sb;
}

function vehicleParkedDetail(slot: IParkingTimeSlot) {
    const s = moment(slot.startDate);
    return `
        Il veicolo targato: ${slot.vehicle.carPlate}.
        È entrato nel parcheggio alle: ${s.format('HH:mm')} del ${s.format(
        'DD-MM-yyyy',
    )}.`;
}
