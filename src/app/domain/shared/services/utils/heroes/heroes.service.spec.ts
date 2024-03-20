import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HeroesDataService } from '../../data/heroes-data/heroes-data.service';
import { of } from 'rxjs';
import { Hero } from '../../../models/hero.model';

describe('HeroesService', () => {
  let service: HeroesService;
  let mockHeroesDataService: jasmine.SpyObj<HeroesDataService>;

  const mockHeroes: Hero[] = [
    {
      id: 1,
      photo: '',
      name: 'Test Hero',
      superpower: 'Invisibility',
      age: 30,
      canFly: false,
    },
  ];

  beforeEach(() => {
    mockHeroesDataService = jasmine.createSpyObj('HeroesDataService', [
      'saveHeroesData',
    ]);
    mockHeroesDataService.saveHeroesData.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        { provide: HeroesDataService, useValue: mockHeroesDataService },
      ],
    });
    service = TestBed.inject(HeroesService);
  });

  it('should initialize heroes', () => {
    service.initializeHeroes(mockHeroes).subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });
  });

  it('should get the current hero by ID', () => {
    service.initializeHeroes(mockHeroes);
    service.getCurrentHero(1).subscribe((hero) => {
      expect(hero).toEqual(mockHeroes[0]);
    });
  });

  it('should add a hero', () => {
    const newHero = {
      id: 2,
      photo: '',
      name: 'New Hero',
      superpower: 'Flight',
      age: 28,
      canFly: true,
    };
    service.initializeHeroes(mockHeroes);
    service.addHero(newHero);
    service.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual([...mockHeroes, newHero]);
    });
    expect(mockHeroesDataService.saveHeroesData).toHaveBeenCalledWith([
      ...mockHeroes,
      newHero,
    ]);
  });

  it('should update a hero', () => {
    const updatedHero = {
      id: 1,
      photo: '',
      name: 'Updated Hero',
      superpower: 'Super Strength',
      age: 31,
      canFly: false,
    };
    service.initializeHeroes(mockHeroes);
    service.updateHero(updatedHero);
    service.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual([updatedHero]);
    });
    expect(mockHeroesDataService.saveHeroesData).toHaveBeenCalledWith([
      updatedHero,
    ]);
  });

  it('should delete a hero', () => {
    const anotherHero = {
      id: 2,
      photo: '',
      name: 'Another Hero',
      superpower: 'Speed',
      age: 25,
      canFly: false,
    };
    service.initializeHeroes([...mockHeroes, anotherHero]);
    service.deleteHero(1);
    service.heroes$.subscribe((heroes) => {
      expect(heroes).toEqual([anotherHero]);
    });
    expect(mockHeroesDataService.saveHeroesData).toHaveBeenCalledWith([
      anotherHero,
    ]);
  });
});
