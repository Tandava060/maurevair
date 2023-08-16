import { Seat } from "./seat.model";

export interface Flight {
  id: number;
  flightNo: string;
  name: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  seats: Seat[];
}
