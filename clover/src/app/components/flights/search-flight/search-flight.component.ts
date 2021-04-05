import { Component, OnInit,Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FlightInfo } from 'src/app/entities/flightInfo/flight-info';
import { AllFligtsDetailsService } from 'src/app/services/allFligts/all-flights-details/all-flights-details.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  @Input() searchedFlights;
  searchCompanyName:string;
  searchDuration:string;
  searchPrice:number;
  
  constructor(public route: ActivatedRoute,public flightService :AllFligtsDetailsService,private router: Router) { }
  id:number;
  flightData:FlightInfo;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['flightID'];

      }
    )
  }

  dalijeadmin(): boolean {

    const userRole = JSON.parse(localStorage.getItem('role'));
    if (userRole === 'Admin' || userRole === "FlightAdmin") {
      return true;
    } else {

      return false;
    }

  }
  onSelect(flightService:FlightInfo){
    this.router.navigateByUrl('/flights/payment/'+flightService.flightID);
  
  }
  onSelect2(flightService:FlightInfo){
    this.router.navigateByUrl('/flights/add-flight/'+flightService.flightID);
  
  }

  
}
