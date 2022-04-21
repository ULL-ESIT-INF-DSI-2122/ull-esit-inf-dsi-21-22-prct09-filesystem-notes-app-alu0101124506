/**
 * Clase base abstracta
 */
export abstract class BaseClass {

  constructor(protected arrayNumber: number[]){
    this.arrayNumber = arrayNumber;
  }

  /**
   * 
   * @param func funcion que filtra el array de numeros
   * @returns nuevo array con los numeros que pasan el filtro
   */
  filterNumber(func: Function): number[] {
    let array: number[] = [];
    this.arrayNumber.forEach((n) => {
      if(func(n)){
        array.push(n);
      }
    });
    return array;
  }

  /**
   * 
   * @param func funcion que hace una accion en cada elemento del array
   * @returns nuevo array con cada elemento cambiado
   */
  mapNumber(func: Function): number[] {
    let array: number[] = [];
    this.arrayNumber.forEach((n) => {
      array.push(func(n));
    });
    return array;
  }

  /**
   * Funcion abstracta la cual se implementara en cada sub-clase
   */
  abstract reduce (): number;

}