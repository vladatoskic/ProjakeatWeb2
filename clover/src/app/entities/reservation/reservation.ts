import { User } from '../User/user';
import { Car } from '../Car/car';
import { Office } from '../office/office';

export class Reservation {
    reservationId: number;
    startDate: Date;
    endDate: Date;
    car: Car;
    user: User;
    startOffice: Office;
    endOffice: Office;
    price: number;

    constructor(startDate: Date, endDate: Date, car: Car, user:User, startOffice: Office, endOffice: Office, price: number){//, startOffice: Office, endOffice: Office) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.car = car;
        this.user = user;
        //this.reservationId = reservationId;
        this.startOffice = startOffice;
        this.endOffice = endOffice;
        this.price = price;
    }
}
