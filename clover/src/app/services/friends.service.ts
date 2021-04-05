import { Injectable } from '@angular/core';
import { Friends } from '../entities/Friends/friends';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  readonly rootUrl= 'http://localhost:5002/api/';

  constructor(private http:HttpClient) { }



  addFriends(friends: Friends): Promise<Friends>{
    return this.http.post<Friends>(this.rootUrl + 'Friends', friends).toPromise();    
  }

  getAllFriends(): Promise<Friends[]>{
    return this.http.get<Friends[]>(this.rootUrl + 'Friends').toPromise();
  }

  getFriends(email: string): Promise<Friends[]>{
    return this.http.get<Friends[]>(this.rootUrl + 'Friends/GetFriend/' + email).toPromise();
  }
  putFriends(formData:Friends){
    return this.http.put(this.rootUrl + 'Friends/'+formData.id, formData).toPromise();
  }
}
