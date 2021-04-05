import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import {AboutCompany} from "src/app/entities/aboutCompany/about-company"
@Injectable({
  providedIn: 'root'
})
export class AvioCompanyDetailsService {

  formData: AboutCompany;
  readonly rootUrl= 'http://localhost:5002/api/';
  list: AboutCompany[];
selectedServie2:AboutCompany;


  private messageSource = new BehaviorSubject<AboutCompany>(null);
  currentMessage = this.messageSource.asObservable();

  constructor(private http:HttpClient) { }

  postCompanyDetails(formData: AboutCompany){
    return this.http.post(this.rootUrl + 'CompanyAbouts', formData);
  }

  refreshList(){
   return this.http.get<AboutCompany[]>(this.rootUrl + 'CompanyAbouts');
  }

  changeMessage(message: AboutCompany){
    this.messageSource.next(message);
  }

  getAvioCompanyById(serviceId: number){
    return this.http.get<AboutCompany>(this.rootUrl + 'CompanyAbouts/' + serviceId.toString());
  }

  putAvioCompany(formData: AboutCompany, avioCompID: number){
    formData.avioCompID =Number.parseInt(avioCompID.toString())  ;
    return this.http.put<AboutCompany>(this.rootUrl + 'CompanyAbouts/' + avioCompID, formData);
  }

}