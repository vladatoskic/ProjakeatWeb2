import { Injectable } from '@angular/core';
import { FlightRate } from 'src/app/entities/flightRate/flight-rate';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightRateSService {
  readonly rootUrl= 'http://localhost:5002/api/';
  constructor(private http:HttpClient) { }

  postFlightRate(formData: FlightRate){
    return this.http.post(this.rootUrl + 'flightRates', formData).toPromise();
  }

  refreshList(){
   return this.http.get<FlightRate[]>(this.rootUrl + 'flightRates');
  }

  // changeMessage(message: FlightRate){
  //   this.messageSource.next(message);
  // }

  getFlightRate(serviceId: number){
    return this.http.get<FlightRate>(this.rootUrl + 'flightRates/' + serviceId.toString());
  }

  putFlightRate(formData: FlightRate, avioCompID: number){
    formData.rateIdd =Number.parseInt(avioCompID.toString())  ;
    return this.http.put<FlightRate>(this.rootUrl + 'flightRates/' + avioCompID, formData);
  
}
}
