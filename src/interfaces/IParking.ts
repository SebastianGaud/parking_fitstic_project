import { Vehicle } from '../models/Vehicle'

export interface IParking {
    name: string
    address: string
    slots: number
    hourlyCost: number

    vehicles: Array<Vehicle>
}
