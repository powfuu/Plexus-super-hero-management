import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../../models/hero.model';

describe('HeroesService', () => {
  let service: HeroesService;
  let heroes$: BehaviorSubject<Hero[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    heroes$ = service['heroes$'];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addHero', () => {
    it('should add a hero', () => {
      const initialLength = heroes$.getValue().length;
      const heroToAdd: Hero = { id: 1, name: 'Test Hero' } as Hero;
      service.addHero(heroToAdd);
      expect(heroes$.getValue().length).toBe(initialLength + 1);
      expect(heroes$.getValue()).toContain(heroToAdd);
    });
  });

  describe('updateHero', () => {
    it('should update a hero', () => {
      const heroToUpdate: Hero = { id: 1, name: 'Test Hero' } as Hero;
      service.addHero(heroToUpdate);
      const updatedHero: Hero = { id: 1, name: 'Updated Hero' } as Hero;
      service.updateHero(updatedHero);
      const heroes = heroes$.getValue();
      const updatedHeroIndex = heroes.findIndex(
        (hero) => hero.id === updatedHero.id
      );
      expect(updatedHeroIndex).toBeGreaterThanOrEqual(0);
      expect(heroes[updatedHeroIndex]).toEqual(updatedHero);
    });

    it('should not update a hero if it does not exist', () => {
      const initialHeroes = heroes$.getValue();
      const updatedHero: Hero = { id: 999, name: 'Updated Hero' } as Hero;
      service.updateHero(updatedHero);
      expect(heroes$.getValue()).toEqual(initialHeroes);
    });
  });

  describe('deleteHero', () => {
    it('should delete a hero', () => {
      const heroToDelete: Hero = { id: 1, name: 'Test Hero' } as Hero;
      service.addHero(heroToDelete);
      service.deleteHero(heroToDelete.id);
      expect(heroes$.getValue()).not.toContain(heroToDelete);
    });

    it('should not delete a hero if it does not exist', () => {
      const initialHeroes = heroes$.getValue();
      service.deleteHero(999);
      expect(heroes$.getValue()).toEqual(initialHeroes);
    });
  });
});
