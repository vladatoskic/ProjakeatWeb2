export class Rate {
    rateId: number;
    rateNumber: number;
    carInfoCarId: number;

    constructor(rateId: number, rateNumber: number, carInfoCarId: number) {
        this.rateId = rateId;
        this.rateNumber = rateNumber;
        this.carInfoCarId = carInfoCarId;
    }
}
