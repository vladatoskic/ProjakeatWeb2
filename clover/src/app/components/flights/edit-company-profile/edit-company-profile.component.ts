import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AllFligtsDetailsService } from 'src/app/services/allFligts/all-flights-details/all-flights-details.service';
import { AvioCompanyDetailsService } from 'src/app/services/avioCompany/avio-company-details/avio-company-details.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AboutCompany } from 'src/app/entities/aboutCompany/about-company';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.css']
})
export class EditCompanyProfileComponent implements OnInit {
  addComapny : FormGroup
  // addFlight : FormGroup
  id:number;
  id2:number=100;
  ispis:string="srdjaan";
  companyData:AboutCompany;
  constructor(public service: AvioCompanyDetailsService,private router: Router,public route: ActivatedRoute,public companyService: AvioCompanyDetailsService ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['compID'];
        this.id2=params['flightID']
        console.log(this.id);
        //this.data.refreshList();
      //  this.iddd=this.id;
        this.companyService.getAvioCompanyById(this.id).toPromise().then(
          dataV => {
          this.companyData = dataV;
          this.resetForm();

        //    console.log(this.rentService);
          }
        )
      }
    )


   
  }

  onSubmit(form: NgForm){
    form.value.avioCompID=Number.parseInt(form.value.avioCompID);
    this.service.putAvioCompany(form.value,this.id).subscribe(
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


  editCompanyInfo(){

  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        avioCompID:this.companyData.avioCompID,
        avioCompName:this.companyData.avioCompName,
        avioCompAddress:this.companyData.avioCompAddress,
        avioCompAbout:this.companyData.avioCompAbout,
        avioCompDestinations:this.companyData.avioCompDestinations,
        avioCompFastReservationDiscount:this.companyData.avioCompFastReservationDiscount,
        avioCompSeats:this.companyData.avioCompSeats,
        avioCompPrices:this.companyData.avioCompPrices,
        companyFlights:null
        
      }
      
  }
}


