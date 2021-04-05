import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';

@Component({
  selector: 'app-about-rent',
  templateUrl: './about-rent.component.html',
  styleUrls: ['./about-rent.component.css']
})
export class AboutRentComponent implements OnInit {
  
  rentService: RentService;
  id: number;
  display="about-rent";

  constructor(private rentServiceDetails: RentServiceDetailsService, public route: ActivatedRoute, public service: CarDetailsService, public router: Router) {
    this.service.refreshList();
    this.service.messageEvent.subscribe( x => {
    })
   }

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


  onHome(){
    this.display="home";
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId);
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
