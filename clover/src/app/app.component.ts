import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './entities/User/user';
import { UserDetailsService } from './services/userDetails/user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clover';
  emaill: string;
  user: User;
  userId: number;

  ngOnInit(): void {

  }

  constructor(public router: Router, public userService: UserDetailsService) {

  }


  IsSignedIn(): boolean {
    return !!localStorage.getItem('regId');
  }
  LogOut() {
    this.userId = JSON.parse(localStorage.getItem("regId"));
    this.userService.getUserById(this.userId).toPromise().then(
      dataV => {
        this.user = dataV;
        if (this.user.logOut == false) {
          alert("Morate prvo promeniti lozinku");
        }
        else {
          localStorage.clear();
          this.router.navigateByUrl("/");
        }
      }
    );



  }
}
