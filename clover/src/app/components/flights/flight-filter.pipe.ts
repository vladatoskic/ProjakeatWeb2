import { PipeTransform, Pipe } from '@angular/core';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';

@Pipe({
    name:'flightFilter'
})
export class FlightFilterPipe implements PipeTransform{
    transform(flights:FlightInfo[], searchCompanyName:string
        //, searchDuration:string
        ):FlightInfo[] {
        const filteredArray=[];

        if(!flights || !searchCompanyName 
            //|| !searchDuration
            ){
            return flights;
        }
        return flights.filter(flight => flight.companyName.toLocaleLowerCase().indexOf(searchCompanyName.toLocaleLowerCase()) !==-1);
        // for(const item of flights){

        //     if(item[])


        // }
    }
}