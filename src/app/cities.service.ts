import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
export interface City {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private storageKey = 'cities';
  private citiesSubject = new BehaviorSubject<City[]>([]);
  cities$ = this.citiesSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.loadCities();
  }

  private loadCities() {
    const cities = localStorage.getItem(this.storageKey);
    if (cities) {
      const parsedCities = JSON.parse(cities);
      console.log('Loaded cities from localStorage:', parsedCities);
      this.citiesSubject.next(parsedCities);
    } else {
      this._http.get<City[]>('assets/cities.json').subscribe({
        next: (data) => {
          console.log('Loaded cities from JSON file:', data);
          this.citiesSubject.next(data);
          this.updateLocalStorage(data);
        },
        error: (error) => {
          console.error('Error loading cities from JSON file:', error);
          this.citiesSubject.next([]);
        }
      });
    }
  }
  private updateLocalStorage(cities: City[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cities));
  }

  addCity(name: string) {
    const formattedName = toTitleCase(name);
    const currentCities = this.citiesSubject.getValue();
    if (currentCities.some(city => city.name === formattedName)) {
      throw new Error('City already exists');
    }

    const newCity: City = { id: Date.now(), name: formattedName };
    const updatedCities = [...currentCities, newCity];
    this.citiesSubject.next(updatedCities);
    this.updateLocalStorage(updatedCities);
  }

  deleteCity(name: string) {
    const updatedCities = this.citiesSubject.getValue().filter(city => city.name !== name);
    this.citiesSubject.next(updatedCities);
    this.updateLocalStorage(updatedCities);
  }
}

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}