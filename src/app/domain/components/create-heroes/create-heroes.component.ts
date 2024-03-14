import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UtilService } from '../../shared/services/util/util.service';
import { HeroesService } from '../../shared/services/heroes/heroes.service';

@Component({
  selector: 'app-create-heroes',
  templateUrl: './create-heroes.component.html',
  styleUrls: ['./create-heroes.component.scss'],
})
export class CreateHeroesComponent {
  heroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private util: UtilService,
    private heroesService: HeroesService
  ) {
    this.heroForm = this.formBuilder.group({
      heroName: ['', Validators.required],
      superpower: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.heroForm.valid) {
      const heroName = this.heroForm.get('heroName')!.value;
      const superpower = this.heroForm.get('superpower')!.value;
      const hero = {
        id: this.util.generateRandomId(),
        name: heroName,
        superpower: superpower,
      };
      this.heroesService.addHero(hero);
      this.toastService.showNotification('Super hero has been created!');
      this.navigateTo('../');
    } else {
      this.toastService.showNotification(
        'Form validation failed, please try again!'
      );
    }
  }

  navigateTo(to: string): void {
    this.router.navigate([to]);
  }
}
