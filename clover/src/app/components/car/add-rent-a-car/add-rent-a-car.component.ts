import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { Car } from 'src/app/entities/Car/car';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-rent-a-car',
  templateUrl: './add-rent-a-car.component.html',
  styleUrls: ['./add-rent-a-car.component.css']
})
export class AddRentACarComponent implements OnInit {
  AddRentCarForm: FormGroup;

  display: boolean;

  rentService?: RentService = null;
  SelectedCar: Car;

  constructor(public service: RentServiceDetailsService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.resetForm();
    this.display=true;
    this.service.currentMessage.subscribe(rentService => this.rentService = rentService);
  }

  getFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  onSubmit(form: NgForm){
    form.value.rate = 0;
    this.insertRentService(form);
  }

  insertRentService(form: NgForm){
    this.service.postRentService(form.value).subscribe(
      res => {
        this.toastr.success("Inserted Successfully");
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        this.toastr.error('error');
      }
    );
    location.reload();
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
