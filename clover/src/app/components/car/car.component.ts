import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/entities/Car/car'
import { CarService } from 'src/app/services/car/car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { RentServicesService } from 'src/app/services/rentServices/rent-services.service';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { AddRentACarComponent } from './add-rent-a-car/add-rent-a-car.component';
import { MatDialog } from "@angular/material/dialog";
import { NodeWithI18n } from '@angular/compiler';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  SearchCarForm: FormGroup;
  rentService: string;
  display = false;

  allRentServices: Array<RentService>;
  filtredRentServices: Array<RentService> = new Array<RentService>();

  ngOnInit(): void {
    this.service.refreshList();
    this.initForm();
  }

  constructor(public dialog: MatDialog, private rentServices: RentServicesService, private router: Router, private route: ActivatedRoute, public service: RentServiceDetailsService) {
    this.service.refreshList2().then(x => {
      for (let i = 0; i < x.length; i++) {
        const element = x[i] as RentService;
        const e = x[i].serviceCars;
        var averageService = 0;
        for (let j = 0; j < e.length; j++) {
          const car = e[j];

          var averageRate = 0;
          for (let k = 0; k < car.rateCar.length; k++) {
            const rate = car.rateCar[k];
            averageRate += rate.rateNumber;
          }
          if (averageRate !== 0) {
            averageRate /= car.rateCar.length;
          }
          averageService += averageRate;
        }
        if (averageService !== 0) {
          averageService /= e.length;
        }
        x[i].rate = Number.parseInt(averageService.toFixed(2));
      }
      this.allRentServices = x;
      this.filtredRentServices = this.allRentServices;
    })
  }

  filterServices(): void {
    //this.filteredCars = new Array<Car>();
    let filterParams = new Array<AbstractFilterParam>();
    if (this.getFilterFieldValue("rentServiceFilter")) {
      filterParams.push(this.addNameServiceFilterParam());
    }
    if (this.getFilterFieldValue("rentServiceFilter2")) {
      filterParams.push(this.addLocationFilterParam());
    }

    this.filtredRentServices = this.rentServices.filterServices(this.allRentServices, filterParams);
  }

  resetFilter(): void {
    this.filtredRentServices = this.allRentServices;
  }

  addNameServiceFilterParam(): ReturnType<any> {
    return new StringFilterParam("rentServiceFilter", this.getFilterFieldValue("rentServiceFilter"));
  }

  addLocationFilterParam(): ReturnType<any> {
    return new StringFilterParam("rentServiceFilter2", this.getFilterFieldValue("rentServiceFilter2"));
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

  onSubmit() {
  }

  Prikaz(): boolean {
    return this.display;
  }

  Sort1(value: string) {
    if (value == "name") {
      this.allRentServices = this.allRentServices.sort((n1, n2) => {
        if (n1.serviceName > n2.serviceName)
          return 1;

        if (n1.serviceName < n2.serviceName)
          return -1;

        return 0;

      }
      );
    }

    if (value == "city") {
      this.allRentServices = this.allRentServices.sort((n1, n2) => {
        if (n1.location > n2.location)
          return 1;

        if (n1.location < n2.location)
          return -1;

        return 0;

      }
      );
    }
  }

  check() {
    const userRole = JSON.parse(localStorage.getItem('role'));
    if (userRole === 'Admin' || userRole === "RentAdmin") {
      return false;
    }

    return true;
  }

  onAddService() {
    this.dialog.open(AddRentACarComponent, {
      height: '520px',
      width: '500px',
    });
  }
}
