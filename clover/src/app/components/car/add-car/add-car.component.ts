import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Car } from 'src/app/entities/Car/car';
import { CarDetailsService } from 'src/app/services/car/carDetails/car-details.service';
import { ToastrService } from 'ngx-toastr';
import { RentServiceDetailsService } from 'src/app/services/rentServices/rentServiceDetails/rent-service-details.service';
import { RentService } from 'src/app/entities/rentService/rent-service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  addCarForm: FormGroup;
  car: Car;
  id: number;
  rentService: RentService;

  constructor(public service: CarDetailsService, private toastr: ToastrService, public rentServiceServis: RentServiceDetailsService, public router: Router, public route: ActivatedRoute) 
  { 
  }

  ngOnInit(): void {
    this.resetForm();
    this.service.currentMessage.subscribe(car => this.car = car);
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.rentServiceServis.getRentServiceById(this.id).subscribe(
          dataV => {
            this.rentService = dataV;
            console.log(this.rentService);
          }
        )
      }
    )

  }

  onSubmit(form: NgForm){
      form.value.sale = false;
      this.insertCar(form);
      this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/cars');
  }

  insertCar(form: NgForm){
    console.log(form.value);

    this.rentService.serviceCars.push(form.value);

        this.rentServiceServis.putRentService(this.rentService, this.rentService.serviceId).subscribe(
          res => {  
            //this.rentService.selectedService.serviceCars.push(form.value);
            //this.rentService.putRentService(this.rentService.selectedService);
            this.toastr.success("Inserted Successfully");
            this.resetForm(form);
            this.service.refreshList();
          },
          err => {
            //this.toastr.error('error');
          }
        )
  }

  onClear() {
    this.addCarForm.reset();
  }

  onClose(){
    this.router.navigateByUrl('/car/rent-a-car/' + this.rentService.serviceId + '/cars');
  }

  getFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        carId: null,
        //serviceName: "",
        brand: "",
        model: "",
        year: 0,
        pricePerDay: 0,
        numOfSeats: 0,
        imgUrl: "",
        location: "",
        endLocation: "",
        typeOfCar: "",
        rateCar: null,
        RentServiceServiceId: 0,
        sale: false,
        averageRate: 0
      }
  }

}
