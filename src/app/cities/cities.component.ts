import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../cities.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: any[] = [];
  newCity: string = '';
  filteredCities: any[] = [];

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    const savedCities = this.citiesService.getCitiesFromLocalStorage();
    if (savedCities) {
      this.cities = savedCities;
    } else {
      this.loadCitiesFromJson();
    }
    this.filteredCities = [...this.cities];
  }

  loadCitiesFromJson() {
    this.citiesService.loadCities().subscribe(data => {
      this.cities = data;
      this.filteredCities = [...this.cities];
      this.citiesService.saveToLocalStorage(this.cities);
    });
  }

  addCity() {
    if (this.newCity && !this.cities.some(city => city.name.toLowerCase() === this.newCity.toLowerCase())) {
      const newId = this.cities.length > 0 ? Math.max(...this.cities.map(c => c.id)) + 1 : 1;
      this.cities.push({ id: newId, name: this.newCity });
      this.filteredCities = [...this.cities];
      this.citiesService.saveToLocalStorage(this.cities);
      this.newCity = '';
    } else {
      alert('City already exists or name is empty.');
    }
  }

  deleteCity(cityName: string) {
    this.cities = this.cities.filter(city => city.name !== cityName);
    this.filteredCities = [...this.cities];
    this.citiesService.saveToLocalStorage(this.cities);
  }

  filterCities(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.filteredCities = this.cities.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
}
