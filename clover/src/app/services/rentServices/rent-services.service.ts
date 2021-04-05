import { Injectable } from '@angular/core';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { CarService } from '../car/car.service';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { Car } from 'src/app/entities/Car/car';


@Injectable({
  providedIn: 'root'
})
export class RentServicesService {

  carService: CarService;
  constructor() { }

  filterServices(allCars: RentService[], filterParams: AbstractFilterParam[]): RentService[] {
    let filteredCars = new Array<RentService>();
    for (const car of allCars) {
      let addCar = true;
      for (const filterParam of filterParams) {
        if (this.checkServiceName(car, filterParam)) {
            addCar = false;
            break;
        }

        if (this.checkLocation(car, filterParam)) {
            addCar = false;
            break;
        }
      }

      if (addCar)
        filteredCars.push(car);
    }

    return filteredCars;
  }

  checkServiceName(car: RentService, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'rentServiceFilter' && !car.serviceName.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }

  checkLocation(car: RentService, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'rentServiceFilter2' && !car.location.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }
}
