import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesService, City } from '../cities.service';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  public cities: City[] = [];
  public filteredCities: City[] = [];
  public newCityName: string = '';
  public filterText: string = '';
  public errorMessage: string = '';

  constructor(private _citiesService: CitiesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._citiesService.cities$.subscribe((res) => {
      this.cities = res;
      this.filteredCities = [...this.cities];
      this.cdr.detectChanges();
    });
  }
  addCity(): void {
    try {
      if (!this.newCityName.trim()) return;
      this._citiesService.addCity(this.newCityName);
      this.newCityName = '';
      this.errorMessage = '';
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  deleteCity(cityName: string): void {
    this._citiesService.deleteCity(cityName);
  }

  filterCities(): void {
    const filter = this.filterText.toLowerCase();
    this.filteredCities = this.cities.filter(city => city.name.toLowerCase().includes(filter));
  }
}