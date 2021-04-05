import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-rate',
  templateUrl: './service-rate.component.html',
  styleUrls: ['./service-rate.component.css']
})
export class ServiceRateComponent implements OnInit {
  rentService: RentService;
  id: number;
  rate: number;

  constructor(public route: ActivatedRoute, public service: RentServiceDetailsService, public router: Router, config: NgbRatingConfig)
  {
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
            
            const element = this.rentService;
            const e = element.serviceCars;
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
            this.rate = Number.parseInt(averageService.toFixed(2));
          
          }
        )
      }
    );

    
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
