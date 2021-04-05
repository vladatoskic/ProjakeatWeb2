import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { AvioCompanyDetailsService } from 'src/app/services/avioCompany/avio-company-details/avio-company-details.service';
import { AboutCompany } from 'src/app/entities/aboutCompany/about-company';


@Component({
  selector: 'app-add-about-company',
  templateUrl: './add-about-company.component.html',
  styleUrls: ['./add-about-company.component.css']
})
export class AddAboutCompanyComponent implements OnInit {
  addComapny : FormGroup;
  
companyForm:FormGroup=new FormGroup({
  avioCompName: new FormControl('', Validators.required),
  avioCompAddress: new FormControl('', Validators.required),
  avioCompAbout: new FormControl('', Validators.required),
  avioCompDestinations: new FormControl('', Validators.required),
  avioCompFastReservationDiscount: new FormControl('', Validators.required),
  avioCompSeats: new FormControl('', Validators.required),
  avioCompPrices: new FormControl('', Validators.required),

  
})

  constructor(public service: AvioCompanyDetailsService ) { }

  ngOnInit(): void {
    this.resetForm();
  }
  onSubmit(form: NgForm){
   // var cmpa = this.companyForm.value as AboutCompany;
    this.service.postCompanyDetails(form.value).subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    )
    
  }
  onClear() {
    this.addComapny.reset();
  }

  getFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

 
  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        avioCompID:0,
        avioCompName:"",
        avioCompAddress:"",
        avioCompAbout:"",
        avioCompDestinations:"",
        avioCompFastReservationDiscount:"",
        avioCompSeats:"",
        avioCompPrices:"",
        companyFlights:null
        
      }
      
  }

}
