import { Flight } from "../flight/flight.model";

export interface Reservation {
    id: number;
    flight: Flight;
    noOfSeats: number;
}