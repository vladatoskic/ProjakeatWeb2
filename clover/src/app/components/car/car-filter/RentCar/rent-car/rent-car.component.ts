import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/entities/Car/car';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { User } from 'src/app/entities/User/user';
import { UserDetailsService } from 'src/app/services/userDetails/user-details.service';
import { ReservationDetailsService } from 'src/app/services/reservationDetails/reservation-details.service';
import { Reservation } from 'src/app/entities/reservation/reservation';
import { Office } from 'src/app/entities/office/office';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {
  car: Car;
  NumOfDays: number;
  idCar: number;
  idRent: number;
  idUser: number;
  rentService: RentService;
  user: User;
  startOffice: Office;
  endOffice: Office;
  totalPrice: number;
  days: number;

  reservationForm: FormGroup = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  })

  constructor(public reservationService: ReservationDetailsService, public service: CarDetailsService, private formBuilder: FormBuilder, public route: ActivatedRoute, public rentServiceServis: RentServiceDetailsService, public userService: UserDetailsService, public router: Router) { }

  ngOnInit(): void {
    this.resetForm();

    this.route.params.subscribe(
      (params: Params) => {
        this.idRent = params['id'];
        this.rentServiceServis.getRentServiceById(this.idRent).subscribe(
          dataV => {
            this.rentService = dataV;
          }
        )
      }
    )

    this.route.params.subscribe(
      (params: Params) => {
        this.idCar = params['carid'];
        this.service.getCarById(this.idCar).subscribe(
          dataV => {
            this.car = dataV;
            this.reservationService.getReservationForCar(this.idCar);
          }
        )
      }
    )

    this.idUser = JSON.parse(localStorage.getItem("regId"));
    this.userService.getUserById(this.idUser).subscribe(
      dataV => {
        this.user = dataV;
      }
    )
  }

  onSubmit() {
    if (this.checkDate(this.reservationForm.get("startDate").value, this.reservationForm.get("endDate").value)) {

      this.days = this.calculatePrice(this.reservationForm.get("startDate").value, this.reservationForm.get("endDate").value);
      this.totalPrice = this.car.pricePerDay * this.days;

      var reservation = new Reservation(this.reservationForm.get("startDate").value, this.reservationForm.get("endDate").value, this.car, this.user, this.startOffice, this.endOffice, this.totalPrice);
      this.insertReservation(reservation);

      alert("Uspesno ste rezervisali. Ukupna cena je: " + this.totalPrice);
      this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/cars');
    }
  }

  calculatePrice(startDate, endDate): number {
    let days = new Array<Date>();
    let start = new Date(startDate);
    let end = new Date(endDate);
    let daysNum = (end.setHours(0, 0).valueOf() - start.setHours(0, 0).valueOf()) / 86400000;

    for (let i = 0; i < daysNum; i++) {
      let date = new Date();
      date.setDate(start.getDate() + i);
      days.push(date);
    }

    return days.length;
  }

  insertReservation(reservation: Reservation) {
    this.reservationService.postReservation(reservation);
  }

  checkDate(startDate: Date, endDate: Date): boolean {
    if (endDate < startDate) {
      alert('Starting date must be lower then ending date.');
      return false;
    }

    var start1 = new Date(startDate);
    var end1 = new Date(endDate);
    var now = new Date();
    if (start1 < now || end1 < now) {
      alert("ne moze u proslisti ");
      return false;
    }

    for (let i = 0; i < this.reservationService.list.length; i++) {
      var element = this.reservationService.list[i];
      console.log(this.reservationService.list);

      var start2 = new Date(element.startDate);
      var end2 = new Date(element.endDate);

      var start1 = new Date(startDate);
      var end1 = new Date(endDate);

      var r1 = end1.setHours(0, 0) - start2.setHours(0, 0);
      var r2 = end2.setHours(0, 0) - start1.setHours(0, 0);

      if (r1 >= 0 && r2 >= 0) {
        alert('Selected span of dates is already taken.');
        return false;
      }
    }
    return true;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.reservationService.formData = {
      reservationId: null,
      startDate: null,
      endDate: null,
      car: null,
      user: null,
      startOffice: null,
      endOffice: null,
      price: 0
    }
  }
}
