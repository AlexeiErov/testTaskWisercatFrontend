export class Filter {
    type: any;
    comparator: any;
    value: any;

    constructor(type?: any, comparator?: any, value?: any){
        this.type = type;
        this.comparator = comparator;
        this.value = value;
    }
}