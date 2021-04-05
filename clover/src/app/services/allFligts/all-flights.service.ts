import { Injectable } from '@angular/core';
import {FlightInfo} from 'src/app/entities/flightInfo/flight-info'
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { NumberFilterParam } from 'src/app/entities/number-filter-param/number-filter-param';

@Injectable({
  providedIn: 'root'
})
export class AllFlightsService {

  constructor() { }
 // getFlights() {
 //  return this.mockedFlights();
 // }

  searchFligts(allFlightss : FlightInfo[],filterParams: AbstractFilterParam[]): FlightInfo[]{
    let searchedFlights = new Array<FlightInfo>();
    for(const flight of allFlightss){
      let addFlight = true;
      for(const filterParam of filterParams){
        if(this.checkFlyingFrom(flight,filterParam)){
          addFlight=false;
          break;
        }
        if(this.checkFlyingTo(flight,filterParam)){
          addFlight=false;
          break;
        }
       
        if(this.checkBaggeg(flight,filterParam)){
          addFlight=false;
          break;
        }
        if(this.checkDeparting(flight,filterParam)){
          addFlight=false;
          break;
        }
        if(this.checkRetruning(flight,filterParam)){
          addFlight=false;
          break;
        }

        if(this.checkClassF(flight,filterParam)){
          addFlight=false;
          break;
        }
        
        if(this.checkFlyingFromR(flight,filterParam) && this.checkFlyingToR(flight,filterParam)){
          addFlight=false;
          break;
        }
        
        
       
      }
      if(addFlight)
        searchedFlights.push(flight);
    }
    return searchedFlights;
  }

  checkFlyingFrom(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchFromFilter' && !flight.from.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }

  checkFlyingTo(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchToFilter' && !flight.to.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }

  checkFlyingFromR(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchToFilter' && !flight.from.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }

  checkFlyingToR(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchFromFilter' && !flight.to.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }




  checkBaggeg(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchBaggegFilter' && !flight.baggage.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }
  checkDeparting(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchDepartingFilter' && !flight.departing.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }
  checkRetruning(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchReturningFilter' && !flight.returning.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }
  checkClassF(flight: FlightInfo, filterParam: AbstractFilterParam): boolean {
    return filterParam instanceof StringFilterParam && filterParam.getFilterParamName() === 'searchClassFFilter' && !flight.classf.toLowerCase().includes(filterParam.getFilterParamValue().toLowerCase());
  }
 
 





  mockedFlights(): Array<FlightInfo>{
    let allFlightss = new Array<FlightInfo>();
    
    

    return allFlightss;

}
}
