import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOfficeComponent } from './add-office/add-office/add-office.component';
import { OfficeDetailsService } from 'src/app/services/officeDetails/office-details.service';
import { ToastrService } from 'ngx-toastr';
import { Office } from 'src/app/entities/office/office';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';

@Component({
  selector: 'app-locations-rent',
  templateUrl: './locations-rent.component.html',
  styleUrls: ['./locations-rent.component.css']
})
export class LocationsRentComponent implements OnInit {
  rentService: RentService;
  id: number;
  allOffice: Array<Office> = new Array<Office>();
  display="locations-rent";

  constructor(public dialog: MatDialog, private rentServiceDetails: RentServiceDetailsService, public route: ActivatedRoute, public service: CarDetailsService, public router: Router, private toastr: ToastrService, private officeService: OfficeDetailsService) {
    this.service.refreshList();
    this.service.messageEvent.subscribe( x => {
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.rentServiceDetails.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;
            this.allOffice = this.rentService.serviceOffice;
            console.log(this.rentService);
          }
        )
      }
    )
    this.service.refreshList();
  }

  check(){
    const userRole = JSON.parse(localStorage.getItem('role'));
      if (userRole === 'Admin' || userRole === "RentAdmin") {
        return false;
      }

      return true;
  }

  onAddOffice(){
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/add-office');

    // this.dialog.open(AddOfficeComponent, {
    //   height: '600px',
    //   width: '500px',
    // });
  }

  onDelete(carId: number){
    if(confirm('Are you sure to delete this car?')){
    this.officeService.deleteOffice(carId).subscribe( res => {
      this.toastr.warning("Deleted Successfully");
    },
    err => {
      this.toastr.error('error');
        }
      )
    }
    location.reload();
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
