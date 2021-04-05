import { User } from '../User/user';
import { Seat } from '../Seat/seat';
import { FlightInfo } from '../flightInfo/flight-info';

export class FlightReservation {
    reservationID:number;
    reservedUser:User;
    reservedSeat:Seat;
    reservedFlight:FlightInfo;

    constructor(){
        
    }
}
