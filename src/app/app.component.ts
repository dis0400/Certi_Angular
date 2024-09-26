import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface IPerson{
  name: string,
  lastName: string,
  age?: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: number = 10;
  animals:string[] = ['a','b','c','d','e','f','g'];

  person: IPerson = {
    name: 'Alexia',
    lastName: 'Marin',
    age: 22
  }

  students:number[] = [1,2,3,4,5,6]
  parents:number[] = [7,8,9,10]

  var1 = 0
  var2 = null
  var3 = 'hola'

  constructor() {
    const {name, age} = this.person
    console.log('desestructuration  ', name, age)

    let both =[...this.students, ...this.parents]
    console.log('spreed operator: ', both)
    console.log('REST operator: ', this.sum(2,4,6))

    console.log('Nullish coalesing: ', this.var2 ?? this.var3)
    console.log('OR: ', this.var2 || this.var1)

    // console.log('subtract ', this.subtract(8, 4))

    // console.log('MAP:', this.animals.map((animal)=> (animal + ' new')))
    // console.log('FOREACH:', this.animals.forEach((animal)=> (animal + ' new')))
    // console.log('FIND:', this.animals.find((animal)=> animal==='z'))
    // console.log('FILTER:', this.animals.filter((animal)=> animal==='y'))
    // console.log('INDEXOF:', this.animals.indexOf('c'))
  }

  public sum(...persons:number[]){
    //return persons[0] + persons[1]
    return persons.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 10
    )
  }

  public sum2(num1: number, num2: number): number {
    return num1 + num2
  }

  public subtract(num1: number, num2: number): number {
    return num1 - num2
  }

  public getArray() {
    const persons: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

    const evenNumbers = persons.filter(person => person % 2 === 0);

    for (let i = 0; i < evenNumbers.length; i++) {
      // console.log('even person =', evenNumbers[i]);
    }
  }
}
