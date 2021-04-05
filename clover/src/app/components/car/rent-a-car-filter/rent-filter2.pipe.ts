import { PipeTransform, Pipe } from '@angular/core';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';
import { RentService } from 'src/app/entities/rentService/rent-service';

@Pipe({
    name:'rentFilter2'
})
export class RentFilterPipe2 implements PipeTransform{
    transform(rentService: RentService[], searchCompanyLocation:string
        ):RentService[] {
        const filteredArray=[];

        if(!rentService || !searchCompanyLocation 
            ){
            return rentService;
        }
        return rentService.filter(rentService => rentService.location.toLocaleLowerCase().indexOf(searchCompanyLocation.toLocaleLowerCase()) !==-1);
    }
}