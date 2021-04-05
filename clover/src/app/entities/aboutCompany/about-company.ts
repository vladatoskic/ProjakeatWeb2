import { FlightInfo } from '../flightInfo/flight-info';

export class AboutCompany {
    avioCompID:number;
    avioCompName: string;
    avioCompAddress: string;
    avioCompAbout:string;
    avioCompDestinations:string;
   // avioCompFlights:List<string>;
    avioCompFastReservationDiscount:string;
    avioCompSeats:string;
    avioCompPrices:string;
    companyFlights= new Array<FlightInfo>();

    constructor(avioCompName:string,avioCompAddress:string,avioCompAbout:string,avioCompDestinations:string,avioCompFastReservationDiscount: string,avioCompSeats:string,avioCompPrices: string){
        this.avioCompName= avioCompName;
        this. avioCompAddress= avioCompAddress;
        this.avioCompAbout = avioCompAbout;
        this.avioCompDestinations = avioCompDestinations;
        this.avioCompFastReservationDiscount= avioCompFastReservationDiscount;
        this.avioCompSeats= avioCompSeats;
        this.avioCompPrices=avioCompPrices;
    }

}

