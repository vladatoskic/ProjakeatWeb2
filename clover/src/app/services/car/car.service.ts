import { Injectable } from '@angular/core';
import { Car } from 'src/app/entities/Car/car';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { NumberFilterParam } from 'src/app/entities/number-filter-param/number-filter-param';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  filterCars(allCars: Car[], filterParams: AbstractFilterParam[]): Car[] {
    let filteredCars = new Array<Car>();
    for (const car of allCars) {
      let addCar = true;
      for (const filterParam of filterParams) {
        if (this.checkStartLocationFilter(car, filterParam)) {
            addCar = false;
            break;
        }

        if (this.checkEndLocationFilter(car, filterParam)) {
          addCar = false;
          break;
        }  

        if (this.checkCarMaxPerDayPriceFilter(car, filterParam)) {
          addCar = false;
          break;
        }

        if (this.checkCarMinSeatsFilterParam(car, filterParam)) {
          addCar = false;
          break;
        }
      }

      if (addCar)
        filteredCars.push(car);
    }

    return filteredCars;
  }

  checkStartLocationFilter(car: Car, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'startLocationFilter' && !car.location.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }

  checkEndLocationFilter(car: Car, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'endLocationFilter' && !car.endLocation.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }

  checkCarMaxPerDayPriceFilter(car: Car, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof NumberFilterParam && filterParam.getFilterParamName() === 'carMaxPerDayPriceFilter' && (car.pricePerDay > filterParam.getFilterParamValue());
  }

  checkCarMinSeatsFilterParam(car: Car, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof NumberFilterParam && filterParam.getFilterParamName() === 'carMinSeatsFilter' && (car.pricePerDay > filterParam.getFilterParamValue());
  }
}