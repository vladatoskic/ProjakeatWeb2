import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { ToastrService } from 'ngx-toastr';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { Car } from 'src/app/entities/Car/car';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-change-rent-a-car',
  templateUrl: './change-rent-a-car.component.html',
  styleUrls: ['./change-rent-a-car.component.css']
})
export class ChangeRentACarComponent implements OnInit {

  AddRentCarForm: FormGroup;

  rentService: RentService;
  SelectedCar: Car;
  id: number;

  constructor(public service: RentServiceDetailsService, private toastr: ToastrService, public route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.resetForm();
    this.service.currentMessage.subscribe(rentService => this.rentService = rentService);
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

  getFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  onSubmit(form: NgForm){
    this.updateRentService(form);
  }

  updateRentService(form: NgForm){
    this.service.putRentService(form.value, this.rentService.serviceId).subscribe(
      res => {
        this.toastr.success("Updated Successfully");
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        this.toastr.error('error');
      }
    )
  }

  onClear() {
    this.AddRentCarForm.reset();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        serviceId: null,
        serviceName: "",
        location: "",
        img: "",
        description: "",
        priceTable: "",
        about: "",
        serviceCars: null,
        locationMap: "",
        contact: "",
        lat: 0,
        lng:0,
        serviceOffice: null,
        rate: 0,
        revenues: 0
      }
  }


}
