import { Component, OnInit } from '@angular/core';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
  rentService: RentService;
  id: number;

  constructor(public route: ActivatedRoute, public service: RentServiceDetailsService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['rentid'];
        this.service.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;
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
