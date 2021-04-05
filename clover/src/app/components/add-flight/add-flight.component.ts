import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AllFligtsDetailsService } from 'src/app/services/allFligts/all-flights-details/all-flights-details.service'
import { ActivatedRoute, Params } from '@angular/router';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  addFlight : FormGroup
  id:number;
  flightData: FlightInfo;
  constructor(public service:AllFligtsDetailsService,public route: ActivatedRoute,public flightService :AllFligtsDetailsService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['flightID'];
        console.log(this.id);
        //this.data.refreshList();
        this.flightService.getFlightById(this.id).toPromise().then(
          dataV => {
            this.flightData = dataV;
            this.resetForm();

          }
        )
      }
    )
   // this.service.formData.price = 999;
    //
  }

  onSubmit(form: NgForm){
    form.value.flightID=Number.parseInt(form.value.flightID);
    this.service.putFlight(form.value,this.id).subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    )
   
    
  }
  onClear() {
    this.addFlight.reset();
  }

  getFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }


  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
      this.service.formData = {
        flightID:this.flightData.flightID,
        from:this.flightData.from,
        to:this.flightData.to,
        departing:this.flightData.departing,
        returning:this.flightData.returning,
        classf:this.flightData.classf,
        baggage:this.flightData.baggage,
        stops:this.flightData.stops,
        duration:this.flightData.duration,
        companyName:this.flightData.companyName,
        price:this.flightData.price,
        seatsNumber:this.flightData.seatsNumber,
        rateFlight:this.flightData.rateFlight,
        userDetailUserId:this.flightData.userDetailUserId,
        companyAboutAvioCompID:this.flightData.companyAboutAvioCompID,
        seatsList:this.flightData.seatsList,
        startTime:this.flightData.startTime,
        endTime:this.flightData.endTime,
        flightRates:this.flightData.flightRates
        
        
      }
    }
}
