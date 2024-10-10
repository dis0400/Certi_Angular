import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { ItemComponent } from './item/item.component';
import { data } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchComponent, ListComponent, CardComponent, ItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  people = Object.values(data);
  selectedPerson: any = null;

  selectPerson(person: any) {
    this.selectedPerson = person;
  }

  deletePerson(id: string) {
    this.people = this.people.filter((person) => person.id !== id);
    this.selectedPerson = null;
  }

  filterPeople(query: string) {
    this.people = Object.values(data).filter(
      (person) =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.lastName.toLowerCase().includes(query.toLowerCase())
    );
  }
}
