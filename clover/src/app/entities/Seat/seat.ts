export class Seat {
id:number;
number2:number;
class2:string;
price:number;
discount:number;
taken:boolean;
flightInfo2Id:number;

constructor( number: number, class2: string,price :number,discount :number,taken :boolean,flightId:number){

this.class2 = class2;
this.number2 = number;
this.price = price;
this.taken = false;
this.discount = 0;
}
}