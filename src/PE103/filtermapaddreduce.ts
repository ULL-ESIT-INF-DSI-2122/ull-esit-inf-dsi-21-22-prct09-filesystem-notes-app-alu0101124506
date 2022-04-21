import { BaseClass } from "./baseclase";


export class FilterMapAddReduce extends BaseClass {
  
  constructor(protected arrayNumber: number[]){
    super(arrayNumber);
  }

  reduce(): number {
    let total: number = 0;
    this.arrayNumber.forEach((n) => {
      total += n;
    });
    return total;
  }

  hook(): number {
    this.arrayNumber = this.filterNumber((x: number) => {return (x > 10)});
    this.arrayNumber = this.mapNumber((x: number) => {return x*x});
    return this.reduce();
  }

}

/*let tryNumber: number[] = [3, 4, 15, 16, 18];
let tryAdd = new FilterMapAddReduce(tryNumber);
console.log(tryAdd.hook());*/


