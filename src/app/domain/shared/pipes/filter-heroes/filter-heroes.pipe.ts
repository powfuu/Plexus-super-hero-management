import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../../models/hero.model';

@Pipe({
  name: 'filterHeroes',
})
export class FilterHeroesPipe implements PipeTransform {
  transform(heroes: Hero[] | null, searchTerm: string): Hero[] | null {
    if (!heroes) {
      return null;
    }

    if (!searchTerm) {
      return heroes;
    }

    const filteredHeroes = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredHeroes;
  }
}
