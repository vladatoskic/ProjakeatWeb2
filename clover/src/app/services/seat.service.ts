import { Injectable } from '@angular/core';
import { Seat } from '../entities/Seat/seat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  readonly rootUrl= 'http://localhost:5002/api/';

  constructor(private http:HttpClient) { }

  addSeat(seat: Seat): Promise<Seat>{
    return this.http.post<Seat>(this.rootUrl + 'Seats', seat).toPromise();    
  }
  getSeatById(seatId: number){
    return this.http.get<Seat>(this.rootUrl + 'Seats/' + seatId.toString());
  }

  getAllSeats(){
      
    return this.http.get<Seat[]>(this.rootUrl + 'Seats').toPromise();
   }

   putSeat(formData:Seat){
    return this.http.put(this.rootUrl + 'Seats/'+formData.id, formData).toPromise();
  }
  deleteSeat(br: number){
    return this.http.delete(this.rootUrl + 'Seats/'+br).toPromise();
  }
}
