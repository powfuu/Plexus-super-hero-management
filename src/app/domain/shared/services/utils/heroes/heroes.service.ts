import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Hero } from '../../../models/hero.model';
import { HeroesDataService } from '../../data/heroes-data/heroes-data.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  constructor(private heroesData: HeroesDataService) {}

  initializeHeroes(heroes: Hero[]): Observable<Hero[]> {
    this.heroes$.next(heroes);
    return this.heroes$;
  }

  getCurrentHero(id: number): Observable<Hero | undefined> {
    return this.heroes$.pipe(
      map((heroes) => heroes.find((hero) => hero.id === Number(id)))
    );
  }

  addHero(hero: Hero): void {
    const currentHeroes = this.heroes$.value;
    const updatedHeroes = [...currentHeroes, hero];
    this.heroes$.next(updatedHeroes);
    this.saveHeroesToMockServer(updatedHeroes);
  }

  updateHero(updatedHero: Hero): void {
    const heroId = updatedHero.id;
    const currentHeroes = this.heroes$.value;
    const index = currentHeroes.findIndex((hero) => hero.id === heroId);
    if (index !== -1) {
      const updatedHeroes = [...currentHeroes];
      updatedHeroes[index] = { ...updatedHero };
      this.heroes$.next(updatedHeroes);
      this.saveHeroesToMockServer(updatedHeroes);
    }
  }

  deleteHero(heroId: number): void {
    const currentHeroes = this.heroes$.value;
    const updatedHeroes = currentHeroes.filter((hero) => hero.id !== heroId);
    this.heroes$.next(updatedHeroes);
    this.saveHeroesToMockServer(updatedHeroes);
  }

  saveHeroesToMockServer(heroes: Hero[]): void {
    this.heroesData
      .saveHeroesData(heroes)
      .pipe(take(1))
      .subscribe(
        () => console.log('heroes data saved'),
        (error) => console.error('Error while saving heroes data', error)
      );
  }
}
