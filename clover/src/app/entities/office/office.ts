export class Office {
    officeId: string;
    officeName: string;
    address: string;
    lat: number;
    lng: number;
    RentServiceServiceId: number;

    constructor(officeId: string, officeName: string, address: string, lat: number, lng: number, RentServiceServiceId: number) {
        this.officeId = officeId;
        this.officeName = officeName;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.RentServiceServiceId = RentServiceServiceId;
    }
}
