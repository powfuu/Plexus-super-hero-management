import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Hero } from '../../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private heroes: Hero[] = [];
  // Observable de héroes
  private heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  getCurrentHero(id: number): Observable<Hero | undefined> {
    return this.heroes$.pipe(
      map((heroes) =>
        heroes.find((hero) => {
          return hero.id === Number(id);
        })
      )
    );
  }

  addHero(hero: Hero): void {
    this.heroes.push(hero);
    this.heroes$.next(this.heroes);
  }

  updateHero(updatedHero: Hero): void {
    const heroId = updatedHero.id;
    const index = this.heroes.findIndex((hero) => hero.id === heroId);
    if (index !== -1) {
      this.heroes[index] = { ...updatedHero };
      this.heroes$.next(this.heroes);
    }
  }

  deleteHero(heroId: number): void {
    this.heroes = this.heroes.filter((hero) => hero.id !== heroId);
    this.heroes$.next(this.heroes);
  }
}
