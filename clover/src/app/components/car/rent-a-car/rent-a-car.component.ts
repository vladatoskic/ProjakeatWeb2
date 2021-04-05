import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/entities/Car/car'
import { CarService } from 'src/app/services/car/car.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { NumberFilterParam } from 'src/app/entities/number-filter-param/number-filter-param';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';
import { AddCarComponent } from '../add-car/add-car.component';
import { MatDialog } from "@angular/material/dialog";
import { Router, Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {
  rentService: RentService;
  display="home";
  showStr = "Locations";
  id: number;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        //this.data.refreshList();
        this.rentServiceDetails.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;
            console.log(this.rentService);
          }
        )
      }
    )
    this.service.refreshList();
  }
  
  constructor(public dialog: MatDialog, private carService: CarService,private rentServiceDetails: RentServiceDetailsService, public route: ActivatedRoute, public service: CarDetailsService, public router: Router) {
    this.service.refreshList();
    this.service.messageEvent.subscribe( x => {
      //this.allCars = this.rentService.serviceCars;
      //this.filtredCars = this.allCars;
    })
   }

  navigateTo(section: string){
    window.location.hash='';
    window.location.hash = section;
  }

  onHome(){
    this.display="home";
  }

  onAbout(){
    this.display="about-rent";
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/about');
  }

  onCars(){
    this.display="cars-rent";
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/cars');
  }

  onLocations(){
    this.display="locations-rent";
    this.router.navigateByUrl('car/rent-a-car/' + this.rentService.serviceId + '/locations');
  }
}
