import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateHeroesComponent } from './create-heroes.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UtilService } from '../../shared/services/util/util.service';
import { HeroesService } from '../../shared/services/heroes/heroes.service';

describe('CreateHeroesComponent', () => {
  let component: CreateHeroesComponent;
  let fixture: ComponentFixture<CreateHeroesComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpyObj = jasmine.createSpyObj('ToastService', [
      'showNotification',
    ]);
    const utilServiceSpyObj = jasmine.createSpyObj('UtilService', [
      'generateRandomId',
    ]);
    const heroesServiceSpyObj = jasmine.createSpyObj('HeroesService', [
      'addHero',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CreateHeroesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpyObj },
        { provide: ToastService, useValue: toastServiceSpyObj },
        { provide: UtilService, useValue: utilServiceSpyObj },
        { provide: HeroesService, useValue: heroesServiceSpyObj },
      ],
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastServiceSpy = TestBed.inject(
      ToastService
    ) as jasmine.SpyObj<ToastService>;
    utilServiceSpy = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;
    heroesServiceSpy = TestBed.inject(
      HeroesService
    ) as jasmine.SpyObj<HeroesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to specified route', () => {
    const route = '../';
    component.navigateTo(route);
    expect(routerSpy.navigate).toHaveBeenCalledWith([route]);
  });

  it('should add hero when form is submitted', () => {
    const hero = { id: 123, name: 'Superman', superpower: 'Flight' };
    utilServiceSpy.generateRandomId.and.returnValue(hero.id);
    component.heroForm.patchValue({
      heroName: hero.name,
      superpower: hero.superpower,
    });
    component.submitForm();
    expect(heroesServiceSpy.addHero).toHaveBeenCalledWith(hero);
    expect(toastServiceSpy.showNotification).toHaveBeenCalledWith(
      'Super hero has been created!'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['../']);
  });

  it('should show notification when form validation fails', () => {
    component.submitForm();
    expect(toastServiceSpy.showNotification).toHaveBeenCalledWith(
      'Form validation failed, please try again!'
    );
    expect(heroesServiceSpy.addHero).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
