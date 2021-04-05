import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/User/user';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required)
  });
  userId: number;
  user: User;

  constructor(public userService: UserDetailsService, private toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("regId"));
    this.userService.getUserById(this.userId).toPromise().then(
      dataV => {
        this.user = dataV;
      }
    )
  }

  onSubmit(){
    const newPassword = this.changePassword.get('password').value;
    this.user.password = newPassword;
    this.user.logOut = true;
    this.userService.putUserDetails(this.user, this.user.userId).subscribe(
      res => {
        this.toastr.success("Updated Successfully");
        this.router.navigateByUrl("/register-user");
      },
      err => {
        this.toastr.error('error');
      }
    )
  }

}
