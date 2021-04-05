import { PipeTransform, Pipe } from '@angular/core';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';

@Pipe({
    name:'flightFilter2'
})
export class FlightFilterPipe2 implements PipeTransform{
    transform(flights:FlightInfo[], searchDuration:string):FlightInfo[] {
      

        if(!flights || !searchDuration ){
            return flights;
        }
        return flights.filter(flight => flight.duration.toLocaleLowerCase().indexOf(searchDuration.toLocaleLowerCase()) !==-1);
 
    }
}