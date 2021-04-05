import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { SingUpComponent } from './components/sing-in/sing-up/sing-up.component';
import { CarComponent } from './components/car/car.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { FlightsComponent } from './components/flights/flights.component';

import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

import { RentACarComponent } from './components/car/rent-a-car/rent-a-car.component';
import { BookAFlightComponent } from './components/book-a-flight/book-a-flight.component';
import { PomocnaComponent } from './components/pomocna/pomocna.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentACarFilterComponent } from './components/car/rent-a-car-filter/rent-a-car-filter.component';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';
import { AddRentACarComponent } from './components/car/add-rent-a-car/add-rent-a-car.component';
import { SearchFlightComponent } from './components/flights/search-flight/search-flight.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { RentCarComponent } from './components/car/car-filter/RentCar/rent-car/rent-car.component';

import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UserDetailsService } from './services/userDetails/user-details.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { ToastrModule } from 'ngx-toastr';
import { AddAboutCompanyComponent } from './components/add-about-company/add-about-company.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';


import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './AuthInterceptor';
import { AdminInfoComponent } from './components/car/rent-a-car-filter/admin-info/admin-info.component';
import { ChangeRentACarComponent } from './components/car/add-rent-a-car/change-rent-a-car/change-rent-a-car.component';
import { ChangeCarComponent } from './components/car/add-car/change-car/change-car.component';
import { ServiceRateComponent } from './components/car/rent-a-car-filter/admin-info/service-rate/service-rate.component';
import { CarRateComponent } from './components/car/rent-a-car-filter/admin-info/car-rate/car-rate.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { AboutRentComponent } from './components/car/rent-a-car/about-rent/about-rent/about-rent.component';
import { CarsRentComponent } from './components/car/rent-a-car/cars-rent/cars-rent/cars-rent.component';
import { LocationsRentComponent } from './components/car/rent-a-car/locations-rent/locations-rent/locations-rent.component';
import { AddOfficeComponent } from './components/car/rent-a-car/locations-rent/locations-rent/add-office/add-office/add-office.component';
import { SingUpRentAdminComponent } from './components/register-user/sing-up-rent-admin/sing-up-rent-admin/sing-up-rent-admin.component';
import { SingUpFlightAdminComponent } from './components/register-user/sing-up-flight-admin/sing-up-flight-admin/sing-up-flight-admin.component';
import { FlightFilterPipe } from './components/flights/flight-filter.pipe';
import { RentFilterPipe } from './components/car/rent-a-car-filter/rent-filter.pipe'
import { RentFilterPipe2 } from './components/car/rent-a-car-filter/rent-filter2.pipe';
import { FastRentCarComponent } from './components/car/car-filter/FastRentCar/fast-rent-car/fast-rent-car.component'
import { FlightFilterPipe2 } from './components/flights/flight-filter2.pipe';
import { FlightFilterPipe3 } from './components/flights/flight-filter3.pipe';
import { UsersPipe } from './components/register-user/users.pipe';

import { EditCompanyProfileComponent } from './components/flights/edit-company-profile/edit-company-profile.component';

import { ChangePasswordComponent } from './components/register-user/change-password/change-password/change-password.component';
import { ChangeInfoComponent } from './components/register-user/change-info/change-info.component';
import { RevenuesComponent } from './components/car/rent-a-car-filter/admin-info/revenues/revenues/revenues.component';



@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    SingUpComponent,
    CarComponent,
    RegisterUserComponent,
    FlightsComponent,
    RentACarComponent,
    CompanyProfileComponent,
    BookAFlightComponent,
    PomocnaComponent,
    PaymentComponent,
    RentACarFilterComponent,
    CarFilterComponent,
    AddRentACarComponent,
    SearchFlightComponent,
    AddCarComponent,
    RentCarComponent,
    AddAboutCompanyComponent,
    AddFlightComponent,
    AdminInfoComponent,
    ChangeRentACarComponent,
    ChangeCarComponent,
    ServiceRateComponent,
    CarRateComponent,
    AboutRentComponent,
    CarsRentComponent,
    LocationsRentComponent,
    AddOfficeComponent,
    SingUpRentAdminComponent,
    SingUpFlightAdminComponent,
    FlightFilterPipe,
    RentFilterPipe,
    RentFilterPipe2,
    FlightFilterPipe2,
    FlightFilterPipe3,
    UsersPipe,
    FastRentCarComponent,

    EditCompanyProfileComponent,

    ChangePasswordComponent,

    ChangeInfoComponent,

    RevenuesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZR9ncGXHSYJjwRsz4HTAv-d9XjT6MzUk'
    }),
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    SocialLoginModule
  ],
  providers: [
    UserDetailsService,
    AuthInterceptor,
    RegisterUserComponent,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '910535454357-cv1dfle5r07scko2u9rgtd7d9oq4dk5b.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('249894789308291'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RentCarComponent,
    AddRentACarComponent,
    AddCarComponent,
    ChangeRentACarComponent,
    ChangeCarComponent,
    ServiceRateComponent,
    CarRateComponent
  ]
})
export class AppModule { }
