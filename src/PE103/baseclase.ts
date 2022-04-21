

export abstract class BaseClass {

  constructor(protected arrayNumber: number[]){
    this.arrayNumber = arrayNumber;
  }


  //filter(lista, (x: number) -> {x > 10})
  filterNumber(func: Function): number[] {
    let array: number[] = [];
    this.arrayNumber.forEach((n) => {
      if(func(n)){
        array.push(n);
      }
    });
    return array;
  }

  //map(lista, (x: number) -> {return x*x})
  mapNumber(func: Function): number[] {
    let array: number[] = [];
    this.arrayNumber.forEach((n) => {
      array.push(func(n));
    });
    return array;
  }

  abstract reduce (): number;

}