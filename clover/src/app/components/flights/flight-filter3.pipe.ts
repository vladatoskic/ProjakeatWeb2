import { PipeTransform, Pipe } from '@angular/core';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';

@Pipe({
    name:'flightFilter3'
})
export class FlightFilterPipe3 implements PipeTransform{
    transform(flights:FlightInfo[], searchPrice:number):FlightInfo[] {
      

        if(!flights || !searchPrice ){
            return flights;
        }
        return flights.filter(flight => (flight.price <= searchPrice) );
 
    }
}