import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SingUpComponent } from './sing-up/sing-up.component';
import {AllFlightsService} from 'src/app/services/allFligts/all-flights.service';
import {FlightInfo} from 'src/app/entities/flightInfo/flight-info';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { Router } from '@angular/router';
import { HttpBackend } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/entities/User/user';
import { RegisterUserService } from 'src/app/services/userDetails/registerUser/register-user.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {
  [x: string]: any;
  allFlightss:Array<FlightInfo>;
  singInForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required)
  })
  @ViewChild(SingUpComponent) sing_up: SingUpComponent;
  http: HttpClient;
  displayStr = "SingIn";
  user: User;

  constructor(private flightService: AllFlightsService, private registerService: RegisterUserService, public service: UserDetailsService, public router: Router, http: HttpClient,private authService: SocialAuthService, private toster: ToastrService)
   {
     //  this.allFlightss=this.flightService.getFlights();
       this.http = http;
  }
  
  ngOnInit(): void 
  {
      this.service.refreshList();
  }

  navigateTo(section: string){
    window.location.hash='';
    window.location.hash = section;
  }

  reciveMessage($event){
    this.displayStr="SingIn";
  }

  onSubmit() {
    const email = this.singInForm.get('email').value;
    const password = this.singInForm.get('password').value;
    this.registerService.logIn(email, password).then((res : any)=> {
      localStorage.setItem("user_token", res.StringToken);
      localStorage.setItem("regId", res.UserId);
      localStorage.setItem("regEmail",res.Email);
      localStorage.setItem("role", JSON.stringify(res.UserType));
      this.user = res as User;
      this.singInForm.reset();
      this.router.navigateByUrl('/register-user');
    }).catch(err=>{
      if(err.status === 400){
        if(err.error === "Not Verified"){
          this.toster.error("Not Verified");
        }
        if(err.error === "Wrong email"){
          this.toster.error("You must register");
        }
      }
      });
  }

  showRegister(){
    this.displayStr = "SingUp"
  }

  onClear() {
    this.singInForm.reset();
  }

  getValue(Id: string) {
    return (<HTMLInputElement> document.getElementById(Id)).value;
  }

  // SingInUser(email: string, password: string){
  //   let back = new Array<string>();
  //   back.push(email);
  //   back.push(password);
  //   this.service.changeMessage(back);
  // }

  // loginGroup = new FormGroup({
  //   email: new FormControl("", [Validators.required, Validators.email]),
  //   password: new FormControl("", [Validators.required, Validators.minLength(3)])
  // });

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

  OnFacebook() : void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    // var user=this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res=>{
    //   var user=new User(res.firstName,res.email,"","","","User",res.idToken);
    //   this.http.post<User>('http://localhost:5000/api/UserDetails/'+'SocialFB', user).toPromise().then((res: any) => {
    //     localStorage.setItem("user_token", res.StringToken);
    //     this.user=res as User;
    //     this.registerService.user = this.user;
    //     this.router.navigateByUrl('/register-user');
    //     });
    // });
  }

  OnGoogle() : void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res=>{
      var user=new User(res.firstName,res.email,"","","","User",res.idToken, true);
      this.http.post<User>('http://localhost:5002/api/UserDetails/'+'Social', user).toPromise().then((res: any) => {
        localStorage.setItem("user_token", res.StringToken);
        localStorage.setItem("role", JSON.stringify(res.UserType));
        localStorage.setItem("regEmail",res.Email);
        localStorage.setItem("regId", res.UserId);
        this.user=res as User;
        this.registerService.user = res as User;
        this.registerService.loggedIn.emit(res);
        this.router.navigateByUrl('/register-user');
        });
    });
    
  }
}

