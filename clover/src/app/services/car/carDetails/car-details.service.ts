import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/entities/Car/car';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {
  formData: Car;
  readonly rootUrl= 'http://localhost:5001/api/';
  list: Car[];

  private messageSource = new BehaviorSubject<Car>(null);
  currentMessage = this.messageSource.asObservable();

  @Output() messageEvent = new EventEmitter<Car[]>();


  constructor(private http:HttpClient) { }

  postCar(formData: Car){
    return this.http.post(this.rootUrl + 'CarInfoes', formData);
  }

  refreshList(){
    this.http.get(this.rootUrl + 'CarInfoes').toPromise().then(res => {
      this.list = res as Car[];
      this.messageEvent.emit(this.list);
    });
  }

  changeMessage(message: Car){
    this.messageSource.next(message);
  }

  putCar(formData: Car, carId:number, rentServiceId: string){
    var rentService = parseInt(rentServiceId);
    formData.carId = parseInt(carId.toString());
    return this.http.put(this.rootUrl + 'CarInfoes/'+carId, formData);
  }

  deleteCar(carId: number){
    return this.http.delete(this.rootUrl + 'CarInfoes/'+carId);
  }

  getCarById(carId: number){
    return this.http.get<Car>(this.rootUrl + 'CarInfoes/' + carId.toString());
  }
}
