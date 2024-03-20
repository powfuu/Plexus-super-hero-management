import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesDataService } from './heroes-data.service';
import { Hero } from '../../../models/hero.model';

describe('HeroesDataService', () => {
  let service: HeroesDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesDataService],
    });
    service = TestBed.inject(HeroesDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save heroes data', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
    ] as Hero[];

    service.saveHeroesData(mockHeroes).subscribe((response) => {
      expect(response).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3008/save-heroes');
    expect(req.request.method).toBe('POST');
    req.flush(mockHeroes);
  });

  it('should get heroes data', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
    ] as Hero[];

    service.getHeroesData().subscribe((response) => {
      expect(response).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3008/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });
});
