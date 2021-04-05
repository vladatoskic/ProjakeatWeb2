import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/entities/User/user';
import { SingInComponent } from '../sing-in.component';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterUserService } from 'src/app/services/userDetails/registerUser/register-user.service';
import { Router } from '@angular/router';

export function passwordMatch(passwordGroup: FormGroup){
  if(passwordGroup.get('password').value !== passwordGroup.get('repeatPassword').value){
    return { match: true};
  }
  return null;
}

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})

export class SingUpComponent implements OnInit {

  singUpForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    city: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(3)])},
     {validators: passwordMatch}
    )
  })

  registerUser = new Array<User>();
  message: string = "SingIn";

  @Output() messageEvent = new EventEmitter<string>();

  constructor(public service: UserDetailsService, private toastr: ToastrService, private registerService: RegisterUserService, public router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }


  navigateTo(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  onSubmit() {
    var user = this.singUpForm.value as User;
    user.UserType = "User";
    user.password = this.singUpForm.value.passwordGroup.password;
    user.logOut = true;
    this.insertUser(user);
  }

  insertUser(user: User) {
    this.service.postUserDetails(user).subscribe(
      res => {
        this.toastr.success('User successfully added');
        location.reload();
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }

  sendMessage() {
    this.messageEvent.emit(this.message);
  }

  onClear() {
    this.singUpForm.reset();
  }

  getValue(Id: string) {
    return (<HTMLInputElement>document.getElementById(Id)).value;
  }

  resetForm(form?: NgForm) {
    if (form != null)
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
      userFriends: null,
      logOut: null
    }
  }

  valueChange(secEmail: string) {
  }
}
