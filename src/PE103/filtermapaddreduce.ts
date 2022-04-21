import { BaseClass } from "./baseclase";

/**
 * Sub-clase que extienda de la clase base
 */
export class FilterMapAddReduce extends BaseClass {
  
  constructor(protected arrayNumber: number[]){
    super(arrayNumber);
  }

  /**
   * Implementacion de la funcion abstracta de la clase base
   * @returns devuelve un unico numero el cual es la suma del array
   */
  reduce(): number {
    let total: number = 0;
    this.arrayNumber.forEach((n) => {
      total += n;
    });
    return total;
  }

  /**
   * Clase que unifica todos los metodos para seguir los pasos requeridos
   * @returns devuelve un unico numero despues de filtrar y mapear el array
   */
  hook(): number {
    this.arrayNumber = this.filterNumber((x: number) => {return (x > 10)});
    this.arrayNumber = this.mapNumber((x: number) => {return x*x});
    return this.reduce();
  }

}

/*let tryNumber: number[] = [3, 4, 15, 16, 18];
let tryAdd = new FilterMapAddReduce(tryNumber);
console.log(tryAdd.hook());*/


