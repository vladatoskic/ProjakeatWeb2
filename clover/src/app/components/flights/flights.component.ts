import { Component, OnInit } from '@angular/core';
import {AllFlightsService} from 'src/app/services/allFligts/all-flights.service';
import {FlightInfo} from 'src/app/entities/flightInfo/flight-info';
import {SearchFlightService} from 'src/app/services/searchFlight/search-flight.service';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AboutCompany} from "src/app/entities/aboutCompany/about-company"
import {AvioCompanyService} from 'src/app/services/avioCompany/avio-company.service'
import {AvioCompanyDetailsService} from "src/app/services/avioCompany/avio-company-details/avio-company-details.service";
import { AllFligtsDetailsService } from 'src/app/services/allFligts/all-flights-details/all-flights-details.service';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})

export class FlightsComponent implements OnInit {

  //avioCompService = AvioCompanyService;
  allAvioCompanies:Array<AboutCompany>

  id:number;
  allFlightss = new Array<FlightInfo>();
  searchedFlights = new Array<FlightInfo>();
disable:boolean=false;

  constructor(private flightService: AllFlightsService,private avioCompService:AvioCompanyService, private router: Router, private route: ActivatedRoute,private data:AvioCompanyService,public service :AvioCompanyDetailsService, public service2 :AllFligtsDetailsService){
    
  }

  ngOnInit(): void {
    //$('.datepicker').pickadate();

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = params['compID'];
    //     console.log(this.id);
    //     //this.data.refreshList();
    //     //this.rentServiceDetails.getRentServiceById(this.id).subscribe(
    //     //  dataV => {
    //     //    this.rentService = dataV;
    //      //   console.log(this.rentService);
    //     //  }
    //   //  )
    //  }
  //  )

    this.service.refreshList().subscribe(
      data=>{
        this.allAvioCompanies=data;
      }
    );
    this.service2.refreshList().subscribe(
           data=>{
             this.allFlightss=data;
             this.searchedFlights = this.allFlightss;
            }
    ); 
   
  }

  filterServices(): void {
    //this.filteredCars = new Array<Car>();
    let filterParams = new Array<AbstractFilterParam>();
    if (this.getFilterFieldValue("searchFromFilter")) {
      filterParams.push(this.addSearchFromFilterParam());
    }
    if (this.getFilterFieldValue("searchToFilter")) {
      filterParams.push(this.addSearchToFilterParam());
    }

    if(this.getFilterFieldValue("searchBaggegFilter")){
      filterParams.push(this.addSearchBaggegParam());
    }
    if(this.getFilterFieldValue("searchDepartingFilter")){
      filterParams.push(this.addSearchDepartingParam());
    }
    if(this.getFilterFieldValue("searchReturningFilter")){
      filterParams.push(this.addSearchReturningParam());
    }
    if(this.getFilterFieldValue("searchClassFFilter")){
      filterParams.push(this.addSearchClassFParam());
    }
    if(this.getFilterFieldValue("searchFromFilter")){
      filterParams.push(this.addSearchFromFilterParamR());
    }
    if(this.getFilterFieldValue("searchToFilter")){
      filterParams.push(this.addSearchToFilterParamR());
    }


    this.searchedFlights = this.flightService.searchFligts(this.allFlightss, filterParams);
  }


  resetFilter(): void {
    this.searchedFlights = this.allFlightss;
  }

  addSearchFromFilterParam(): ReturnType<any> {
    return new StringFilterParam("searchFromFilter", this.getFilterFieldValue("searchFromFilter"));
  }
  addSearchToFilterParam(): ReturnType<any> {
    return new StringFilterParam("searchToFilter", this.getFilterFieldValue("searchToFilter"));
  }

  addSearchFromFilterParamR(): ReturnType<any> {
    return new StringFilterParam("searchFromFilter", this.getFilterFieldValue("searchFromFilter"));
  }
  addSearchToFilterParamR(): ReturnType<any> {
    return new StringFilterParam("searchToFilter", this.getFilterFieldValue("searchToFilter"));
  }
  


  addSearchBaggegParam(): ReturnType<any> {
    return new StringFilterParam("searchBaggegFilter", this.getFilterFieldValue("searchBaggegFilter"));
  }
  addSearchDepartingParam(): ReturnType<any> {
    return new StringFilterParam("searchDepartingFilter", this.getFilterFieldValue("searchDepartingFilter"));
  }
  addSearchReturningParam(): ReturnType<any> {
    return new StringFilterParam("searchReturningFilter", this.getFilterFieldValue("searchReturningFilter"));
  }
  addSearchClassFParam(): ReturnType<any> {
    return new StringFilterParam("searchClassFFilter", this.getFilterFieldValue("searchClassFFilter"));
  }

  onButtonClick(event : MouseEvent){
    this.disable=true;
  }
  onButtonClick2(event : MouseEvent){
    this.disable=false;
  }
  
  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }
  
  Sort1(value: string) {
    if (value == "name") {
      this.allAvioCompanies = this.allAvioCompanies.sort((n1, n2) => {
        if (n1.avioCompName > n2.avioCompName)
          return 1;

        if (n1.avioCompName < n2.avioCompName)
          return -1;

        return 0;

      }
      );
    }

    if (value == "city") {
      this.allAvioCompanies = this.allAvioCompanies.sort((n1, n2) => {
        if (n1.avioCompAddress > n2.avioCompAddress)
          return 1;

        if (n1.avioCompAddress < n2.avioCompAddress)
          return -1;

        return 0;

      }
      );
    }
  }

  onSubmit(){
    
  }
  onSelect(service: AboutCompany){
    this.router.navigateByUrl('/flights/company-profile/'+service.avioCompID);
    this.data.changeMessage(service);
  }
  check(){
    const userRole = JSON.parse(localStorage.getItem('role'));
      if (userRole === 'Admin' || userRole === "FlightAdmin") {
        return false;
      }
      
      return true;
  }
}

