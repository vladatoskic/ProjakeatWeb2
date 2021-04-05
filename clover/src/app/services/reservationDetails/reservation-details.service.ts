import { Injectable, EventEmitter, Output } from '@angular/core';
import { Reservation } from 'src/app/entities/reservation/reservation';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Car } from 'src/app/entities/Car/car';
import { User } from 'src/app/entities/User/user';

@Injectable({
  providedIn: 'root'
})
export class ReservationDetailsService {
  formData: Reservation;
  readonly rootUrl= 'http://localhost:5001/api/';
  list: Reservation[];

  private messageSource = new BehaviorSubject<Reservation>(null);
  currentMessage = this.messageSource.asObservable();

  @Output() messageEvent = new EventEmitter<Reservation[]>();

  constructor(private http:HttpClient) { }
  

  postReservation(formData: Reservation){
    return this.http.post(this.rootUrl + 'ReservationDetails/CreateReservationForCar', formData).toPromise().then(res => {
      this.getReservationForCar(formData.car.carId);
      console.log(formData.car.carId)
    });
  }

  getReservationForCar(carId: number){
    return this.http.get(this.rootUrl + 'ReservationDetails/GetReservationForCar/' + carId).toPromise().then(res => {
      this.list = res as Reservation[];
      console.log(carId);
    })
  }

  getReservationForCar2(carId: number) : Promise<Reservation[]>{
    return this.http.get<Reservation[]>(this.rootUrl + 'ReservationDetails/GetReservationForCar/' + carId).toPromise();
  }

  refreshList(){
    this.http.get(this.rootUrl + 'ReservationDetails').toPromise().then(res => {
      this.list = res as Reservation[];
      this.messageEvent.emit(this.list);
    });
  }

  putReservation(formData: Reservation, reservationId:string, rentServiceId: string){
    var rentService = parseInt(rentServiceId);
    //formData.reservationId = reservationId;
    return this.http.put(this.rootUrl + 'ReservationDetails/'+rentService, formData);
  }

  deleteReservation(reservationId: number){
    return this.http.delete(this.rootUrl + 'ReservationDetails/DeleteReservation/' + reservationId).toPromise();
  }

  getAllReservation(){
    return this.http.get<Reservation[]>(this.rootUrl + 'ReservationDetails/GetAllReservation').toPromise();
  }
  
}
