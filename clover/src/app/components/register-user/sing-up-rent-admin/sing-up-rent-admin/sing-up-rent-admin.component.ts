import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/app/entities/User/user';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterUserService } from 'src/app/services/userDetails/registerUser/register-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up-rent-admin',
  templateUrl: './sing-up-rent-admin.component.html',
  styleUrls: ['./sing-up-rent-admin.component.css']
})
export class SingUpRentAdminComponent implements OnInit {
  singUpForm: FormGroup;
  registerUser = new Array<User>();

  constructor(public service: UserDetailsService, private toastr: ToastrService, private registerService: RegisterUserService, public router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form: NgForm){
    //proveriti da li je dosla neka vrednost(RentAdmin, FlightAdmin) pa onda staviti user ili nesto od ta dva
    form.value.UserType="RentAdmin";
    form.value.logOut = false;
    this.insertUser(form);
  }

  insertUser(form: NgForm){
    console.log(form.value);

    this.service.postUserDetails(form.value).subscribe(
      res => {
        this.toastr.success('User successfully added');
        this.resetForm(form);
      },
      err => {
        this.toastr.success('error');
      }
    );
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        userId: null,
        name: "",
        email: "",
        password: "",
        city: "",
        phoneNumber: "",
        UserType: "",
        StringToken: "",
        userFriends:null,
        logOut: null
      }
  }

  valueChange(secEmail: string){
  }

}
