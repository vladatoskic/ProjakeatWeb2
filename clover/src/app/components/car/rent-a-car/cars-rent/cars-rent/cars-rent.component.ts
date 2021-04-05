import { Component, OnInit } from '@angular/core';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { NumberFilterParam } from 'src/app/entities/number-filter-param/number-filter-param';
import { Car } from 'src/app/entities/Car/car';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { MatDialog } from '@angular/material/dialog';
import { CarService } from 'src/app/services/car/car.service';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';
import { AddCarComponent } from '../../../add-car/add-car.component';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/entities/office/office';
import { ReservationDetailsService } from 'src/app/services/reservationDetails/reservation-details.service';

export function getAverageRate(car: Car): number {
  var sum = 0;
  for (let i = 0; i < car.rateCar.length; i++) {
    const element = car.rateCar[i];
    sum += element.rateNumber;
  }

  return sum / car.rateCar.length;
}

@Component({
  selector: 'app-cars-rent',
  templateUrl: './cars-rent.component.html',
  styleUrls: ['./cars-rent.component.css']
})
export class CarsRentComponent implements OnInit {
  allCars: Array<Car> = new Array<Car>();
  filtredCars: Array<Car> = new Array<Car>();
  SearchCarForm: FormGroup;
  id: number;
  display = "cars-rent";

  rentService: RentService;
  startOffice: Office;
  endOffice: Office;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.rentServiceDetails.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;

            for (let i = 0; i < this.rentService.serviceCars.length; i++) {
              var a = this.rentService.serviceCars[i] as Car;
              a.averageRate = getAverageRate(this.rentService.serviceCars[i]);
            }
            this.allCars = this.rentService.serviceCars;
            this.filtredCars = this.allCars;
          }
        )
      }
    )
    this.service.refreshList();
    this.initForm();
  }

  constructor(public dialog: MatDialog, private carService: CarService, private rentServiceDetails: RentServiceDetailsService, public route: ActivatedRoute, public service: CarDetailsService, public router: Router, private reservationService: ReservationDetailsService) {
    this.service.refreshList();
    this.service.messageEvent.subscribe(x => {
    })
  }

  onAddCar() {
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/add-car');
    // const dialogRef = this.dialog.open(AddCarComponent, {
    //   height: '600px',
    //   width: '500px',
    // });

    // dialogRef.afterClosed().subscribe( result => {
    // });
  }

  check() {
    const userRole = JSON.parse(localStorage.getItem('role'));
    if (userRole === 'Admin' || userRole === "RentAdmin") {
      return false;
    }
    return true;
  }

  filterCars(): void {
    let filterParams = new Array<AbstractFilterParam>();
    if (this.getFilterFieldValue("startLocationFilter")) {
      filterParams.push(this.addNameServiceFilterParam());
    }

    if (this.getFilterFieldValue("endLocationFilter")) {
      filterParams.push(this.addEndLocationFilterParam());
    }

    if (this.getFilterFieldValue("carMaxPerDayPriceFilter")) {
      filterParams.push(this.addCarMaxPerDayPriceFilterParam());
    }

    if (this.getFilterFieldValue("carMinSeatsFilter")) {
      filterParams.push(this.addCarMinSeatsFilterParam());
    }

    this.filtredCars = this.carService.filterCars(this.allCars, filterParams);
  }


  DateForm: FormGroup = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  });
  filterAvelableCars(): void {
    var startDate = this.DateForm?.get('startDate').value;
    var endDate = this.DateForm?.get('endDate').value;

    this.checkDate(startDate, endDate);

  }

  addNameServiceFilterParam(): ReturnType<any> {
    return new StringFilterParam("startLocationFilter", this.getFilterFieldValue("startLocationFilter"));
  }

  addEndLocationFilterParam(): ReturnType<any> {
    return new StringFilterParam("endLocationFilter", this.getFilterFieldValue("endLocationFilter"));
  }

  addCarMaxPerDayPriceFilterParam(): ReturnType<any> {
    return new NumberFilterParam("carMaxPerDayPriceFilter", +this.getFilterFieldValue("carMaxPerDayPriceFilter"));
  }

  addCarMinSeatsFilterParam(): ReturnType<any> {
    return new NumberFilterParam("carMinSeatsFilter", +this.getFilterFieldValue("carMinSeatsFilter"));
  }

  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement>document.getElementById(filterFieldId)).value;
  }



  private initForm() {
    this.SearchCarForm = new FormGroup({
      'Place': new FormControl('', Validators.required),
      'StartDate': new FormControl('', Validators.required),
      'EndDate': new FormControl('', Validators.required)
    });
  }

  resetFilter(): void {
    this.filtredCars = this.allCars;
  }

  Sort1(value: string) {
    if (value == "brand") {
      this.allCars = this.allCars.sort((n1, n2) => {
        if (n1.brand > n2.brand)
          return 1;

        if (n1.brand < n2.brand)
          return -1;

        return 0;

      }
      );
    }

    if (value == "model") {
      this.allCars = this.allCars.sort((n1, n2) => {
        if (n1.model > n2.model)
          return 1;

        if (n1.model < n2.model)
          return -1;

        return 0;

      }
      );
    }
  }


  onHome() {
    this.display = "home";
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId);
  }

  onAbout() {
    this.display = "about-rent";
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/about');
  }

  onCars() {
    this.display = "cars-rent";
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/cars');
  }

  onLocations() {
    this.display = "locations-rent";
    this.router.navigateByUrl('car/rent-a-car/' + this.rentService.serviceId + '/locations');
  }



  checkDate(startDate: Date, endDate: Date) {
    if (endDate < startDate) {
      alert('Starting date must be lower then ending date.');
    }

    var start1 = new Date(startDate);
    var end1 = new Date(endDate);
    var now = new Date();
    if (start1 < now || end1 < now) {
      alert("ne moze u proslisti ");
    }

    this.filtredCars = [];
    // if (this.allCars != null) {
    for (let i = 0; i < this.allCars.length; i++) {
      var element = this.allCars[i];
      this.reservationService.getReservationForCar2(element.carId).then(x => {
        if (x.length != 0) {

          for (let i = 0; i < x.length; i++) {
            const reservation = x[i];

            var start2 = new Date(reservation.startDate);
            var end2 = new Date(reservation.endDate);

            var r1 = end1.setHours(0, 0) - start2.setHours(0, 0);
            var r2 = end2.setHours(0, 0) - start1.setHours(0, 0);

            if (r1 >= 0 && r2 >= 0) {

            }
            else {
              this.filtredCars.push(element);
            }
          }
        }
        else {
          this.filtredCars = this.allCars;
        }
      })
    }
  }

}
