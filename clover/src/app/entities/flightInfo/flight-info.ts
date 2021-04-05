import { Time } from '@angular/common';
import { Seat } from '../Seat/seat';
import { FlightRate } from '../flightRate/flight-rate';

export class FlightInfo {
flightID:number;
from:string;
to:string;
departing:string;
returning:string;
classf:string;
baggage : string;
stops:number;
duration:string;
companyName:string;
price:number;
seatsNumber:number;
rateFlight:number;
companyAboutAvioCompID: number;
userDetailUserId: number;
seatsList: Seat[];
startTime:string;
endTime:string;
flightRates:FlightRate[];

constructor(from:string, to:string,departing:string,returning:string,classf:string,stops:number,duration:string,companyName:string,price:number,seatsNumber:number,
    rateFlight:number){
    this.from=from;
    this.to=to;
    this.departing=departing;
    this.returning=returning;
    this.classf=classf;

    this.stops=stops;
    this.duration=duration;
    this.companyName=companyName;
    this.price=price;
    this.seatsNumber=seatsNumber;
    
}
}
