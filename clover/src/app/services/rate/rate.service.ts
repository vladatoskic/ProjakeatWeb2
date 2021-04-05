import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rate } from 'src/app/entities/rate/rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  readonly rootUrl= 'http://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  postRate(rate: Rate){
    return this.http.post(this.rootUrl + 'Rates/CreateRate', rate).toPromise();
  }
}
