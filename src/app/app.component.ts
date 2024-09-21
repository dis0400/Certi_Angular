import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Person{
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
  person: Person = {
    name: 'Alexia',
    lastName: 'Marin',
    age: 22
  }

  constructor() {
    console.log('subtract ', this.subtract(8, 4))

    console.log('MAP:', this.animals.map((animal)=> (animal + ' new')))
    console.log('FOREACH:', this.animals.forEach((animal)=> (animal + ' new')))
    console.log('FIND:', this.animals.find((animal)=> animal==='z'))
    console.log('FILTER:', this.animals.filter((animal)=> animal==='y'))
    console.log('INDEXOF:', this.animals.indexOf('c'))
  }

  public sum(num1: number, num2: number): number {
    return num1 + num2
  }

  public subtract(num1: number, num2: number): number {
    return num1 - num2
  }

  public getArray() {
    const persons: number[] = [1, 2, 3, 4, 5, 6, 7, 8]

    const evenNumbers = persons.filter(person => person % 2 === 0);

    for (let i = 0; i < evenNumbers.length; i++) {
      console.log('even person =', evenNumbers[i]);
    }
  }
}
