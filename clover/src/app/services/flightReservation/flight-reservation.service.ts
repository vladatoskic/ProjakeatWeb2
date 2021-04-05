import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightReservation } from 'src/app/entities/FlightReservation/flight-reservation';

@Injectable({
  providedIn: 'root'
})
export class FlightReservationService {

  readonly rootUrl= 'http://localhost:5002/api/';

  constructor(private http:HttpClient) { }

  addReservation(seat: FlightReservation): Promise<FlightReservation>{
    return this.http.post<FlightReservation>(this.rootUrl + 'FlightReservations', seat).toPromise();    
  }
  getReservationtById(seatId: number){
    return this.http.get<FlightReservation>(this.rootUrl + 'FlightReservations/' + seatId.toString());
  }

  getAllReservation(){
      
    return this.http.get<FlightReservation[]>(this.rootUrl + 'FlightReservations').toPromise();
   }

   deleteFlightReservation(reservation: number){
    return this.http.delete(this.rootUrl + 'FlightReservations/'+reservation).toPromise();
  }
}
