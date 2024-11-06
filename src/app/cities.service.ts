import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  loadCities(): Observable<any[]> {
    return this.http.get<any[]>('assets/cities.json');
  }

  saveToLocalStorage(cities: any[]): void {
    localStorage.setItem('cities', JSON.stringify(cities));
    localStorage.setItem('citiesTimestamp', Date.now().toString());
  }

  getCitiesFromLocalStorage(): any[] | null {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : null;
  }
}
