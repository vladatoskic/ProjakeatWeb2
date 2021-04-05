import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';
import { Car } from 'src/app/entities/Car/car';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

export function getAverageRate(car: Car): number {
  var sum = 0;
  for (let i = 0; i < car.rateCar.length; i++) {
    const element = car.rateCar[i];
    sum += element.rateNumber;
  }

  return sum / car.rateCar.length;
}

@Component({
  selector: 'app-car-rate',
  templateUrl: './car-rate.component.html',
  styleUrls: ['./car-rate.component.css']
})
export class CarRateComponent implements OnInit {
  rentService: RentService;
  id: number;
  cars: Car[];

  constructor(private serviceCar: CarDetailsService, public route: ActivatedRoute, public service: RentServiceDetailsService, public router: Router, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['rentid'];
        this.service.getRentServiceById(this.id).subscribe(
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
  }

  onServiceRate(){
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/service-rate');
  }

  onCarRate(){
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/car-rate');
  }

  onGraph(){
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/about');
  }

  onRevenues(){
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/revenues');
  }

}
