import { Component, OnInit } from '@angular/core';
import {AllFlightsService} from 'src/app/services/allFligts/all-flights.service';
import {FlightInfo} from 'src/app/entities/flightInfo/flight-info';

@Component({
  selector: 'app-book-a-flight',
  templateUrl: './book-a-flight.component.html',
  styleUrls: ['./book-a-flight.component.css']
})
export class BookAFlightComponent implements OnInit {
  allFlightss:Array<FlightInfo>;

  constructor(private flightService: AllFlightsService){
    //this.allFlightss=this.flightService.getFlights();
  }

  ngOnInit(): void {
  }

}
