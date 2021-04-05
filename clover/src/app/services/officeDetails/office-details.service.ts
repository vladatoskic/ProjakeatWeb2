import { Injectable, Output, EventEmitter } from '@angular/core';
import { Office } from 'src/app/entities/office/office';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeDetailsService {

  formData: Office;
  readonly rootUrl= 'http://localhost:5001/api/';
  list: Office[];

  private messageSource = new BehaviorSubject<Office>(null);
  currentMessage = this.messageSource.asObservable();

  @Output() messageEvent = new EventEmitter<Office[]>();

  constructor(private http:HttpClient) { }

  postOffice(formData: Office){
    return this.http.post(this.rootUrl + 'OfficeDetails', formData);
  }

  refreshList(){
    this.http.get(this.rootUrl + 'OfficeDetails').toPromise().then(res => {
      this.list = res as Office[];
      this.messageEvent.emit(this.list);
    });
  }

  putOffice(formData: Office, officeId:string, rentServiceId: string){
    var rentService = parseInt(rentServiceId);
    formData.officeId = officeId;
    return this.http.put(this.rootUrl + 'OfficeDetails/'+rentService, formData);
  }

  deleteOffice(carId: number){
    return this.http.delete(this.rootUrl + 'OfficeDetails/'+carId);
  }
}
