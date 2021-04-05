import { Car } from '../Car/car';
import { Office } from '../office/office';

export class RentService {
    serviceId: string;
    serviceName: string;
    location: string;
    img: string;
    description: string;
    about: string;
    priceTable: string;
    locationMap: string;
    contact: string;
    lat: number;
    lng: number;
    serviceCars: Car[];
    serviceOffice: Office[];
    rate: number;
    revenues: number;

    constructor(serviceName: string, location: string, description: string, img: string, about: string, cars: Array<Car>, contact: string, lat: number, lng: number, rate: number, revenues: number) {
        this.serviceName = serviceName;
        this.location = location;
        this.img = img;
        this.description = description;
        this.about = about;
        this.contact = contact;
        this.lat = lat;
        this.lng = lng;
        this.rate = rate;
        this.revenues = revenues;
    }
}