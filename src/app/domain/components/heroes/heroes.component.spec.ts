import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { HeroesService } from '../../shared/services/utils/heroes/heroes.service';
import { LoadingService } from '../../shared/services/utils/loading/loading.service';
import { ToastService } from '../../shared/services/utils/toast/toast.service';
import { of } from 'rxjs';
import { Hero } from '../../shared/models/hero.model';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const heroesServiceSpyObj = jasmine.createSpyObj('HeroesService', [
      'getHeroes',
      'deleteHero',
    ]);
    const loadingServiceSpyObj = jasmine.createSpyObj('LoadingService', [
      'startLoader',
      'stopLoader',
    ]);
    const toastServiceSpyObj = jasmine.createSpyObj('ToastService', [
      'showNotification',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpyObj },
        { provide: LoadingService, useValue: loadingServiceSpyObj },
        { provide: ToastService, useValue: toastServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    heroesServiceSpy = TestBed.inject(
      HeroesService
    ) as jasmine.SpyObj<HeroesService>;
    loadingServiceSpy = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
    toastServiceSpy = TestBed.inject(
      ToastService
    ) as jasmine.SpyObj<ToastService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create heroes page', () => {
    component.navigateCreateHeroes();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes/create-heroes']);
  });

  it('should navigate to edit hero page', () => {
    const heroId = 1;
    component.navigateEditHero(heroId);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      `/heroes/edit-heroes/${heroId}`,
    ]);
  });
});
