export class Friends {

    id:number;
    accepted:boolean;
    removed:boolean;
    added:boolean;
    userEmail1:string;
    userEmail2:string;


    constructor(){
        this.accepted=false;
        this.removed=false;
        this.added=false;
    }
}
