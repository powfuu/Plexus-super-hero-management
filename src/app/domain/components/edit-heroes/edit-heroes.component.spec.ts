import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHeroesComponent } from './edit-heroes.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';
import { HeroesService } from '../../shared/services/heroes/heroes.service';
import { of } from 'rxjs';
import { Hero } from '../../shared/models/hero.model';

describe('EditHeroesComponent', () => {
  let component: EditHeroesComponent;
  let fixture: ComponentFixture<EditHeroesComponent>;
  let formBuilder: FormBuilder;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpyObj = jasmine.createSpyObj('ToastService', [
      'showNotification',
    ]);
    const heroesServiceSpyObj = jasmine.createSpyObj('HeroesService', [
      'getCurrentHero',
      'updateHero',
    ]);

    activatedRouteStub = { params: of({ id: 123 }) };

    await TestBed.configureTestingModule({
      declarations: [EditHeroesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpyObj },
        { provide: ToastService, useValue: toastServiceSpyObj },
        { provide: HeroesService, useValue: heroesServiceSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastServiceSpy = TestBed.inject(
      ToastService
    ) as jasmine.SpyObj<ToastService>;
    heroesServiceSpy = TestBed.inject(
      HeroesService
    ) as jasmine.SpyObj<HeroesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current hero on initialization', () => {
    const hero: Hero = { id: 123, name: '', superpower: '' };
    heroesServiceSpy.getCurrentHero.and.returnValue(of(hero));
    component.ngOnInit();
    expect(component.currentHero).toEqual(hero);
    expect(component.heroForm.value).toEqual({
      heroName: hero.name,
      superpower: hero.superpower,
    });
  });

  it('should update hero when form is submitted', () => {
    const updatedHero: Hero = {
      id: 123,
      name: 'Batman',
      superpower: 'Gadgets',
    };
    const formValue = {
      heroName: updatedHero.name,
      superpower: updatedHero.superpower,
    };
    spyOn(component, 'updateHero');
    component.heroForm.setValue(formValue);
    component.submitForm();
    expect(component.updateHero).toHaveBeenCalledWith(updatedHero);
  });

  it('should show notification when form validation fails', () => {
    component.heroForm.setValue({ heroName: '', superpower: '' });
    component.submitForm();
    expect(toastServiceSpy.showNotification).toHaveBeenCalledWith(
      'Form validation failed, please try again!'
    );
  });

  it('should navigate to specified route', () => {
    const route = '../';
    component.navigateTo(route);
    expect(routerSpy.navigate).toHaveBeenCalledWith([route]);
  });
});
