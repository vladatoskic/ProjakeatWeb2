import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/User/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  formData: User;
  readonly rootUrl= 'http://localhost:5002/api/';
  list: User[];

  private messageSource = new BehaviorSubject<string[]>(null);
  currentMessage = this.messageSource.asObservable();
  

  constructor(private http:HttpClient) { }

  postUserDetails(formData: User){
    return this.http.post(this.rootUrl + 'UserDetails', formData);
  }

  putUserDetails(user: User, Id: string){
    //user.userId=Number.parseInt(Id.toString());
    return this.http.put(this.rootUrl + 'UserDetails/' + Id, user);
  }

  refreshList(): Promise<User[]>{
   return this.http.get<User[]>(this.rootUrl + 'UserDetails').toPromise();
  }

  changeMessage(message: string[]){
    this.messageSource.next(message);
  }

  getUserById(userId: number){
    return this.http.get<User>(this.rootUrl + 'UserDetails/' + userId.toString());
  }
}
