import { Seat } from "./seat.model";

export interface FlightApi {
  id: number;
  flightNo: string;
  name: string;
  originId: number;
  destinationId: number;
  departureTime: string;
  arrivalTime: string;
  seats: Seat[];
}
