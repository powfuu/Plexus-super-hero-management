import { ToastService } from './../../shared/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { HeroesService } from '../../shared/services/heroes/heroes.service';
import { Observable } from 'rxjs';
import { Hero } from '../../shared/models/hero.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  heroSearch: string = '';

  constructor(
    private loadingService: LoadingService,
    private heroesService: HeroesService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getHeroesData();
  }

  getHeroesData(): void {
    this.heroes$ = this.heroesService.getHeroes();
  }

  navigateCreateHeroes(): void {
    this.router.navigate(['/heroes/create-heroes']);
  }

  navigateEditHero(id: number): void {
    this.router.navigate([`/heroes/edit-heroes/${id}`]);
  }

  confirmDeleteHero(hero: Hero): void {
    if (window.confirm('Are you sure you want to delete the selected Hero?')) {
      this.heroesService.deleteHero(hero.id);
      this.toastService.showNotification('Hero has been deleted');
    }
  }
}
