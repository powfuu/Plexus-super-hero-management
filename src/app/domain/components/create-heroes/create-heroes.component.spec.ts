import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateHeroesComponent } from './create-heroes.component';
import { ToastService } from '../../shared/services/utils/toast/toast.service';
import { UtilService } from '../../shared/services/utils/util/util.service';
import { HeroesService } from '../../shared/services/utils/heroes/heroes.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('CreateHeroesComponent', () => {
  let component: CreateHeroesComponent;
  let fixture: ComponentFixture<CreateHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [CreateHeroesComponent],
      providers: [ToastService, UtilService, HeroesService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.heroForm.valid).toBeFalsy();
  });

  it('submitting form', () => {
    expect(component.heroForm.valid).toBeFalsy();
    component.heroForm.controls['heroName'].setValue('Superman');
    component.heroForm.controls['heroAge'].setValue(30);
    component.heroForm.controls['superpower'].setValue('Flight');
    component.heroForm.controls['heroCanFly'].setValue(true);
    expect(component.heroForm.valid).toBeTruthy();
  });
});
