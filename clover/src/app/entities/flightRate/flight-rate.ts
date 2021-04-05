import { NumberFilterParam } from '../number-filter-param/number-filter-param';

export class FlightRate {

    rateIdd:number;
    userIdd:number;
    flightInfo2FlightID:number;
    ocena:number;
    companyIdd:number;

    constructor(   rateIdd:number,userIdd:number,flightIdd:number,ocena:number,companyIdd:number){
        this.rateIdd=rateIdd;
        this.userIdd=userIdd;
        this.flightInfo2FlightID=flightIdd;
        this.ocena=ocena;
        this.companyIdd=companyIdd;
    }
}



