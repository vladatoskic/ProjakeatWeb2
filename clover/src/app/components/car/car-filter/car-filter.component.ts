import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
//import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { RentCarComponent } from './RentCar/rent-car/rent-car.component';
import { Car } from 'src/app/entities/Car/car';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Inject } from '@angular/core'; 
import { AddCarComponent } from '../add-car/add-car.component';
import { ToastrService } from 'ngx-toastr';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { ChangeCarComponent } from '../add-car/change-car/change-car.component';
import { RentService } from 'src/app/entities/rentService/rent-service';

export function getAverageRate(car: Car): number {
  var sum = 0;
  for (let i = 0; i < car.rateCar.length; i++) {
      const element = car.rateCar[i];
      sum += element.rateNumber;
  }

  return sum / car.rateCar.length;
}

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
  providers: [NgbRatingConfig]
})
export class CarFilterComponent implements OnInit {

  @Input() filtredCars;
  dataCars: RentServiceDetailsService;
  id: number;
  rentService: RentService;

  constructor(private ref: ChangeDetectorRef, public dialog: MatDialog, dataCars: RentServiceDetailsService, private toastr: ToastrService, public service: CarDetailsService, public router: Router, private data: CarDetailsService, config: NgbRatingConfig,  public route: ActivatedRoute)//
  {
    config.max = 5;
    config.readonly = true;
    this.dataCars = dataCars;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        //this.data.refreshList();
        this.dataCars.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;

            for (let i = 0; i < this.rentService.serviceCars.length; i++) {
              var a = this.rentService.serviceCars[i] as Car;
              a.averageRate = getAverageRate(this.rentService.serviceCars[i]);
           }
          }
        )
      }
    )
    this.service.refreshList();

  }

  onRent(car: Car){
    // this.dialog.open(RentCarComponent, {
    //   height: '400px',
    //   width: '650px',
    // });
    // this.data.changeMessage(car);
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/rent/' + car.carId);
  }

  GetRate(car: Car) : number{
    return getAverageRate(car);
  }

  dalijeadmin():boolean{

    const userRole = JSON.parse(localStorage.getItem('role'));
    if (userRole === 'Admin' || userRole === "FlightAdmin"|| userRole==="User") {
      return true;
    }else{
  
      return false;
    }
  
  }

  

  onSelectCar(car: Car){
    this.data.formData = car;
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/change-car/' + car.carId);
    // this.dialog.open(ChangeCarComponent, {
    //   height: '600px',
    //   width: '500px',
    // });
    // this.data.changeMessage(car);
  }

  onDelete(carId: number){
    if(confirm('Are you sure to delete this car?')){
    this.service.deleteCar(carId).subscribe( res => {
      this.toastr.warning("Deleted Successfully");
      //this.dataCars.selectedService.serviceCars =  this.dataCars.list;
      this.dataCars.refreshList();
    },
    err => {
      this.toastr.error('error');
        }
      )
    }
    location.reload();
  }

  check(){
    const userRole = JSON.parse(localStorage.getItem('role'));
      if (userRole === 'Admin' || userRole === "RentAdmin") {
        return false;
      }

      return true;
  }
}
