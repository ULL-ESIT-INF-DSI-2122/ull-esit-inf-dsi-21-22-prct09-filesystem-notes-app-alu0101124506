import 'mocha';
import {expect} from 'chai';
import {FilterMapMultiplyReduce} from '../src/PE103/filtermapmultiplyreduce';


let tryNumber: number[] = [3, 4, 15, 16, 18];
let tryAdd = new FilterMapMultiplyReduce(tryNumber);

describe('Tests de la clase FilterMapMultiplyReduce', ()=>{
  it('Comprobando funcion de clase base: filterNumber ', ()=> {
    expect(tryAdd.filterNumber((x: number) => {return (x > 10)})).to.be.eql([15, 16, 18]);
  });

  it('Comprobando funcion de clase base: mapNumber ', ()=> {
    expect(tryAdd.mapNumber((x: number) => {return x*x})).to.be.eql([9, 16, 225, 256, 324]);
  });

  it('Comprobando funcion de propia clase: reduce ', ()=> {
    expect(tryAdd.reduce()).to.be.eql(51840);
  });

  it('Comprobando funcion de que une todas las anteriores, propia clase: hook ', ()=> {
    expect(tryAdd.hook()).to.be.eql(18662400);
  });

});