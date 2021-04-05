import { Component, OnInit } from '@angular/core';
import {AllFlightsService} from 'src/app/services/allFligts/all-flights.service';
import {FlightInfo} from 'src/app/entities/flightInfo/flight-info';
import { AvioCompanyService } from 'src/app/services/avioCompany/avio-company.service';
import {AboutCompany} from 'src/app/entities/aboutCompany/about-company'
import { AvioCompanyDetailsService } from 'src/app/services/avioCompany/avio-company-details/avio-company-details.service';
import { FormGroup, NgForm } from '@angular/forms';
import {AllFligtsDetailsService} from 'src/app/services/allFligts/all-flights-details/all-flights-details.service'
import { NumberFilterParam } from 'src/app/entities/number-filter-param/number-filter-param';
import { ActivatedRoute, Params} from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { browser } from 'protractor';
import { Seat } from 'src/app/entities/Seat/seat';
import { SeatService } from 'src/app/services/seat.service';
import { from } from 'rxjs';
import { all } from 'q';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { User } from 'src/app/entities/User/user';
import { FlightReservation } from 'src/app/entities/FlightReservation/flight-reservation';
import { FlightReservationService } from 'src/app/services/flightReservation/flight-reservation.service';
import { FlightRateSService } from 'src/app/services/flightRate/flight-rate-s.service';
import { FlightRate } from 'src/app/entities/flightRate/flight-rate';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  addFlight : FormGroup

  allFlightss:Array<FlightInfo>;
  companyData:AboutCompany;
  id:number;
  id2:number;
  brs:number;
  iddd:number;
  i:number;
  bbb:number;
  sediste:Seat;
  cena:number;
  allSeats = new Array<Seat>();
  firstSeat:Seat;
  ui:number;
  u:User;
  zbir:number=0;
  kolicina:number=0;
  prosek:number=0;
  res: FlightReservation = new FlightReservation;
  flRate = new Array<FlightRate>();
  constructor(private flightService: AllFlightsService, public flightRateService:FlightRateSService ,public reservationServation: FlightReservationService, public userService: UserDetailsService , private router: Router,public seatService:  SeatService, private toastr: ToastrService,public route: ActivatedRoute,private data:AvioCompanyService,public service :AllFligtsDetailsService,public companyService: AvioCompanyDetailsService ){
 // this.service.refreshList();
 //this.service.messageEvent.subscribe( x => {
//})
  }

  abtCompany : AboutCompany;
  abtC2:AvioCompanyDetailsService;
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['compID'];
        this.id2=params['flightID']
        console.log(this.id);
        //this.data.refreshList();
        this.iddd=this.id;
        this.companyService.getAvioCompanyById(this.id).toPromise().then(
          dataV => {
          this.companyData = dataV;
        //    console.log(this.rentService);
          }
        )
      }
    )


    this.resetForm();
    this.data.currentMessage.toPromise().then(abtCompany => this.abtCompany = abtCompany);
    this.service.refreshList().toPromise().then(
      data=>{
        this.allFlightss = new Array<FlightInfo>();
        data.forEach(item=>{
          if(item.companyAboutAvioCompID == this.id){
            this.allFlightss.push(item);
          }
        })
        // this.allFlightss=data;
      //  this.searchedFlights = this.allFlightss;
       }
); 
this.seatService.getAllSeats().then(
  data => {
    data.forEach(element => {
      if (element.flightInfo2Id == this.id) {
        this.allSeats.push(element);
      }
    });


  }



)



this.flightRateService.refreshList().toPromise().then(
  data=>{
    data.forEach(element => {
      if(element.companyIdd==this.id){
        this.flRate.push(element);

      }
      
    });
    this.flRate.forEach(element => {
      this.kolicina+=1;
      this.zbir+=element.ocena
    });
    this.prosek=this.zbir/this.kolicina;
  }
)

this.flRate.forEach(element => {
  this.zbir+=element.ocena
});
  }


  dalijeadmin(): boolean {

    const userRole = JSON.parse(localStorage.getItem('role'));
    if (userRole === 'Admin' || userRole === "FlightAdmin" ) {
      return true;
    } else {

      return false;
    }

  }
  fastRezervation(f:FlightInfo){

    this.seatService.getAllSeats().then(
      data => {
        data.forEach(element => {
          if (element.flightInfo2Id == f.flightID) {
            this.allSeats.push(element);
          }
        });
      }
    )

    this.allSeats.forEach(element => {
      if(element.flightInfo2Id==f.flightID && element.number2==0)
      this.firstSeat=element;
    });

    this.ui = JSON.parse(localStorage.getItem("regId"));
    this.userService.getUserById(this.ui).toPromise().then(
      dataV => {
        this.u = dataV;
      }
    )

    if (this.firstSeat.taken == false) {

      this.firstSeat.taken = true;
      this.seatService.putSeat(this.firstSeat);
      this.res.reservedSeat = this.firstSeat;
      this.res.reservedFlight =f;
      this.res.reservedUser = this.u;

      this.reservationServation.addReservation(this.res);
      alert("Uspesno ste rezervisali");
    }else{

      alert("Vise nema slobodnih mesta na popustu");
    }

  }

  onSubmit(form: NgForm){
    console.log(form.value);
     this.service.postFlightDetails(form.value, this.id).subscribe(
       (res : FlightInfo) => {
         this.resetForm(form);

         this.brs=res.seatsNumber;

         for(let bi=0;bi<this.brs;bi++){
           let sediste2:Seat;
           let sediste3=new Seat(0,"economy",0,0,false,0);
           sediste3.number2=Number.parseInt(bi.toString());
           sediste3.price=Number.parseInt(res.price.toString());
           sediste3.taken=false;
           sediste3.id = 0;
          // sediste3.flightInfo2Id=Number.parseInt(this.id.toString());
           sediste3.flightInfo2Id=res.flightID;
          this.seatService.addSeat(sediste3)
         }




      },
      err => {
        console.log(err);
      }
     )
   //izgleda da on tu josuvek nema informaciju koji je id
      // this.bbb=form.value.flightID;
      //  this.brs=form.value.seatsNumber;
  
      // for(let bi=1;bi<this.brs;bi++){
      //   let sediste2:Seat;
      //   let sediste3=new Seat("0","economy",0,0,false,0);
      //   sediste3.number2=bi.toString();
      //   sediste3.price=form.value.price;
      //   sediste3.taken=false;
      //   sediste3.flightInfo2FlightId=this.id;
      //   form.value.seatList= new Array<Seat>();
      //  this.seatService.addSeat(sediste3);
      // }

  }
  onClear() {
    this.addFlight.reset();
  }


  onSelect2(id:number){
    this.router.navigateByUrl('/edit-company/'+id);

  }

  getFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  insertFlight(form:NgForm){

    this.companyData.companyFlights.push(form.value);

    this.companyService.putAvioCompany(this.companyData,this.id).subscribe(
      res=>{
        this.toastr.success("Add Succesfully");
        this.resetForm(form);
        this.service.refreshList();

      },
      err=>{
        this.toastr.error('error');
      }
    )
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        flightID:0,
        from:"",
        to:"",
        departing:"",
        returning:"",  
        classf:"",
        baggage:"",
        stops:0,
        duration:"",
        companyName:"",
        price:0,
        seatsNumber:0,
        rateFlight:0,
        userDetailUserId:0,
        companyAboutAvioCompID:0,
        seatsList:null,
        startTime:"",
        endTime:"",
        flightRates:null
        
      }
}
}
