import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { Reservation } from 'src/app/entities/reservation/reservation';

// export function getRevenues(reservation: Reservation): number {
  
// }

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.css']
})
export class RevenuesComponent implements OnInit {
  rentService: RentService;
  id: number;

  constructor(public route: ActivatedRoute, public router: Router, public service: RentServiceDetailsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['rentid'];
        this.service.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;

            // for (let i = 0; i < this.rentService.serviceCars.length; i++) {
            //   const element = this.rentService.serviceCars[i];
            //   for (let j = 0; j < element..length; j++) {
            //     const element = element.[j];
                
            //   }
            // }
          }
        )
      }
    )
  }



  onServiceRate() {
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/service-rate');
  }

  onCarRate() {
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/car-rate');
  }

  onGraph() {
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/about');
  }

  onRevenues() {
    this.router.navigateByUrl('/car/admin-info/' + this.rentService.serviceId + '/revenues');
  }

}
