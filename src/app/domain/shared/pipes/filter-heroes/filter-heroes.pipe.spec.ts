import { FilterHeroesPipe } from './filter-heroes.pipe';
import { Hero } from '../../models/hero.model';

describe('FilterHeroesPipe', () => {
  let pipe: FilterHeroesPipe;

  beforeEach(() => {
    pipe = new FilterHeroesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if no search term provided', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
      { id: 3, name: 'Wonder Woman' },
    ] as Hero[];
    const searchTerm = '';
    const result = pipe.transform(heroes, searchTerm);
    expect(result).toEqual(heroes);
  });

  it('should return filtered array based on search term', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
      { id: 3, name: 'Wonder Woman' },
    ] as Hero[];
    const searchTerm = 'man';
    const result = pipe.transform(heroes, searchTerm);
    expect(result).toEqual([
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
      { id: 3, name: 'Wonder Woman' },
    ] as Hero[]);
  });

  it('should return null if input array is null', () => {
    const searchTerm = 'man';
    const result = pipe.transform(null, searchTerm);
    expect(result).toBeNull();
  });

  it('should return null if input array is undefined', () => {
    const searchTerm = 'man';
    const result = pipe.transform(null, searchTerm);
    expect(result).toBeNull();
  });
});
