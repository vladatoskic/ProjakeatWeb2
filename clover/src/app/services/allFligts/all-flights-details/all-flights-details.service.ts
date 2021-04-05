import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FlightInfo} from "src/app/entities/flightInfo/flight-info"
@Injectable({
  providedIn: 'root'
})
export class AllFligtsDetailsService {


  formData: FlightInfo;
  readonly rootUrl= 'http://localhost:5002/api/';
  list: FlightInfo[];

  private messageSource = new BehaviorSubject<FlightInfo>(null);
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient) { }


  postFlightDetails(formData: FlightInfo, companyId: number){
    let params = new HttpParams();
    params = params.set('companyId', companyId.toString());
    return this.http.post(this.rootUrl + 'FlightInfo2', formData, {params: params});
  }


    refreshList(){
      
     return this.http.get<FlightInfo[]>(this.rootUrl + 'FlightInfo2');
    }
    getFlightById(serviceId: number){
      return this.http.get<FlightInfo>(this.rootUrl + 'FlightInfo2/' + serviceId.toString());
    }

    putFlight(formData: FlightInfo, avioCompID: number){
      formData.flightID =Number.parseInt(avioCompID.toString())  ;
      return this.http.put<FlightInfo>(this.rootUrl + 'FlightInfo2/' + avioCompID, formData);
    }

  changeMessage(message: FlightInfo){
    this.messageSource.next(message);
  }
}