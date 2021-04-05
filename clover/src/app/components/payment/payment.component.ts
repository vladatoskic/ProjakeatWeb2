import { Component, OnInit } from '@angular/core';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AllFligtsDetailsService } from 'src/app/services/allFligts/all-flights-details/all-flights-details.service';
import { Seat } from 'src/app/entities/Seat/seat';
import { SeatService } from 'src/app/services/seat.service';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { User } from 'src/app/entities/User/user';
import { FlightReservation } from 'src/app/entities/FlightReservation/flight-reservation';
import { FlightReservationService } from 'src/app/services/flightReservation/flight-reservation.service';
import { Friends } from 'src/app/entities/Friends/friends';
import { FriendsService } from 'src/app/services/friends.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  brs: number;
  i: number;
  bbb: number;
  sediste: Seat;
  cena: number;
  constructor(public route: ActivatedRoute, public service: UserDetailsService, private friendService: FriendsService, public flightService: AllFligtsDetailsService, public seatService: SeatService, public userService: UserDetailsService, public reservationServation: FlightReservationService, public router: Router) { }
  allSeats = new Array<Seat>();
  sortedSeats = new Array<Seat>();
  id: number;
  flightData: FlightInfo;
  seatId: number;
  seatPrice: number;
  s: Seat;
  f: FlightInfo;
  u: User;
  ui: number;
  res: FlightReservation = new FlightReservation;
  disable: boolean = true;
  clicked2:boolean=false;
  allFriends = new Array<Friends>();
  pom1 = new Array<Friends>();
  acceptedFriends = new Array<Friends>();
  allRegistredUsers2 = new Array<User>();
  prijatelj:User;

  dalijeadmin(): boolean {

    const userRole = JSON.parse(localStorage.getItem('role'));
    if (userRole === 'Admin' || userRole === "FlightAdmin" ) {
      return true;
    } else {

      return false;
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['flightID'];
        console.log(this.id);
        //this.data.refreshList();
        this.flightService.getFlightById(this.id).toPromise().then(
          dataV => {
            this.flightData = dataV;
           

          }
        )
      }
    )

    this.friendService.getAllFriends().then(res=>{
      this.allFriends=res;
        });

        this.service.refreshList().then(res => {
          this.allRegistredUsers2 = res;
         
        });
        
    this.seatService.getAllSeats().then(
      data => {
        data.forEach(element => {
          if (element.flightInfo2Id == this.id && element.number2!=0)  {
            this.allSeats.push(element);
          }
        });


      }

    )
    // this.allSeats.sort();
    this.sortedSeats = this.allSeats.sort((n1, n2) => {
      if (n1.number2 > n2.number2)
        return 1;

      if (n1.number2 < n2.number2)
        return -1;

      return 0;
    })


  }


  invite(frie:Friends){


    this.seatService.getSeatById(this.seatId).toPromise().then(
      dataV => {
        this.s = dataV;
      }
    )

    this.flightService.getFlightById(this.id).toPromise().then(
      dataV => {
        this.f = dataV;
      }
    )

if(frie.userEmail1==localStorage.getItem("regEmail")){

this.allRegistredUsers2.forEach(element => {
  if(element.email==frie.userEmail2){
    this.prijatelj=element;
  }
});

}


    if (this.s.taken == false) {

      this.s.taken = true;
      this.seatService.putSeat(this.s);
      this.res.reservedSeat = this.s;
      this.res.reservedFlight = this.f;
      this.res.reservedUser = this.prijatelj;

      this.reservationServation.addReservation(this.res);
      alert('Usepsno ste pozvali prijatelja.');
    }
    alert('Greska pri pozivu prijatelja');

  }

  reserve(seat: Seat) {
    this.seatId = seat.id;
    this.seatPrice = seat.price;
  }

  removeSeat(){
    this.seatService.getSeatById(this.seatId).toPromise().then(
      dataV => {
        this.s = dataV;
      }
    )
    if(this.s.taken==false){
      this.seatService.deleteSeat(this.s.id);
    alert('Uspesno ste obrisali');

  }else{
    alert('Greska pri rezervaciji');

    }
    
  }

  inviteFriend(){

    if(!this.clicked2){
      this.allFriends.forEach(element => {
        if(element.userEmail1==localStorage.getItem("regEmail") &&element.accepted==true){
          this.acceptedFriends.push(element);
          this.clicked2=true;
        }
        if(element.userEmail2==localStorage.getItem("regEmail") &&element.accepted==true){
          this.pom1.push(element);
          this.clicked2=true;
        }
  
      });
    }
  }

  finalPay() {


    this.seatService.getSeatById(this.seatId).toPromise().then(
      dataV => {
        this.s = dataV;
      }
    )
    this.ui = JSON.parse(localStorage.getItem("regId"));
    this.userService.getUserById(this.ui).toPromise().then(
      dataV => {
        this.u = dataV;
      }
    )


    this.flightService.getFlightById(this.id).toPromise().then(
      dataV => {
        this.f = dataV;
      }
    )
    if (this.s.taken == false) {

      this.s.taken = true;
      this.seatService.putSeat(this.s);
      this.res.reservedSeat = this.s;
      this.res.reservedFlight = this.f;
      this.res.reservedUser = this.u;

      this.reservationServation.addReservation(this.res);
      alert('Usepsno ste rezervisali mesto.');
    }else{

      alert('Greska pri rezervaciji');
    }
  }

  onButtonClick(event : MouseEvent){
    this.disable=false;
  }

  rentCar() {
    this.router.navigateByUrl('flights/payment/' + this.id + '/fast-rent-car');
  }

}
