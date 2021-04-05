import { PipeTransform, Pipe } from '@angular/core';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';
import { RentService } from 'src/app/entities/rentService/rent-service';

@Pipe({
    name:'rentFilter'
})
export class RentFilterPipe implements PipeTransform{
    transform(rentService: RentService[], searchCompanyName:string
        ):RentService[] {
        const filteredArray=[];

        if(!rentService || !searchCompanyName 
            ){
            return rentService;
        }
        return rentService.filter(rentService => rentService.serviceName.toLocaleLowerCase().indexOf(searchCompanyName.toLocaleLowerCase()) !==-1);
    }
}