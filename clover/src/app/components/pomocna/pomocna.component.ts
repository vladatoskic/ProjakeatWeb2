import { Component, OnInit } from '@angular/core';
import {AllFlightsService} from 'src/app/services/allFligts/all-flights.service';
import {FlightInfo} from 'src/app/entities/flightInfo/flight-info';
@Component({
  selector: 'app-pomocna',
  templateUrl: './pomocna.component.html',
  styleUrls: ['./pomocna.component.css']
})
export class PomocnaComponent implements OnInit {

  allFlightss:Array<FlightInfo>;
  constructor(private flightService: AllFlightsService){
   // this.allFlightss=this.flightService.getFlights();
  }

  ngOnInit(): void {
  }

}
