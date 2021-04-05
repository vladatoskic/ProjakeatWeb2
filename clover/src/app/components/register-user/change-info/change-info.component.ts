import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/entities/User/user';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
  userId: number;
  user: User;
  constructor( public service: UserDetailsService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("regId"));
    this.service.getUserById(this.userId).toPromise().then(
      dataV => {
        this.user = dataV;
        this.resetForm();
      }
    )
  }

  onSubmit(form: NgForm){
    //form.value.userId=Number.parseInt(form.value.userId);
    this.user.name=form.value.name;
    this.user.email=form.value.email;
    this.user.city=form.value.city;
    this.user.phoneNumber=form.value.phoneNumber;
    this.user.password=form.value.password;
    



    this.service.putUserDetails(this.user,this.user.userId).subscribe(
      res => {
        //localStorage.setItem("email")
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    )
   
    
  }



  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        userId:this.user.userId,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        city: this.user.city,
        phoneNumber: this.user.phoneNumber,
        UserType: this.user.UserType,
        StringToken: this.user.StringToken,
        userFriends: this.user.userFriends,
        logOut: this.user.logOut
        
        
      }
    }



}
