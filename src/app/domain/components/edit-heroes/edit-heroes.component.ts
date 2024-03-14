import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';
import { HeroesService } from '../../shared/services/heroes/heroes.service';
import { take } from 'rxjs/operators';
import { Hero } from '../../shared/models/hero.model';

@Component({
  selector: 'app-edit-heroes',
  templateUrl: './edit-heroes.component.html',
  styleUrls: ['./edit-heroes.component.scss'],
})
export class EditHeroesComponent implements OnInit {
  idHero!: number;
  heroForm!: FormGroup;
  currentHero!: Hero | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.idHero = +params['id'];
      this.loadCurrentHero();
    });
    this.heroForm = this.formBuilder.group({
      heroName: [this.currentHero?.name, Validators.required],
      superpower: [this.currentHero?.superpower, Validators.required],
    });
  }

  private loadCurrentHero(): void {
    this.heroesService
      .getCurrentHero(this.idHero)
      .pipe(take(1))
      .subscribe((currentHero) => {
        this.currentHero = currentHero;
      });
  }

  submitForm(): void {
    if (this.heroForm.valid) {
      const { heroName, superpower } = this.heroForm.value;
      const updatedHero: Hero = {
        id: this.idHero,
        name: heroName,
        superpower: superpower,
      };
      this.updateHero(updatedHero);
    } else {
      this.toastService.showNotification(
        'Form validation failed, please try again!'
      );
    }
  }

  updateHero(updatedHero: Hero): void {
    this.heroesService.updateHero(updatedHero);
    this.toastService.showNotification('Super hero has been updated!');
    this.navigateTo('../');
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
