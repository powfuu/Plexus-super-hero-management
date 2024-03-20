import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../../models/hero.model';

@Injectable({
  providedIn: 'root',
})
// Realiza peticiones HTTP para guardar/obtener los héroes dentro un archivo JSON
export class HeroesDataService {
  mockApiPath = 'http://localhost:3008';

  constructor(private http: HttpClient) {}

  saveHeroesData(heroes: Hero[]): Observable<Hero[]> {
    return this.http.post<Hero[]>(`${this.mockApiPath}/save-heroes`, heroes);
  }

  getHeroesData(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.mockApiPath}/heroes`);
  }
}
