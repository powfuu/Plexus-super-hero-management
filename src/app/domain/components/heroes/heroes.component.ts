import { UtilService } from './../../shared/services/utils/util/util.service';
import { ToastService } from '../../shared/services/utils/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/services/utils/loading/loading.service';
import { HeroesService } from '../../shared/services/utils/heroes/heroes.service';
import { Observable, take } from 'rxjs';
import { Hero } from '../../shared/models/hero.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HeroesDataService } from '../../shared/services/data/heroes-data/heroes-data.service';

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
    private heroesData: HeroesDataService,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getHeroesData();
    //se simula carga con settimeout, solo para visualizar loading
    this.loadingService.startLoader();
    setTimeout(() => {
      this.loadingService.stopLoader();
    }, 1000);
  }

  getHeroesData(): void {
    this.heroesData
      .getHeroesData()
      .pipe(take(1))
      .subscribe((heroes) => {
        this.heroes$ = this.heroesService.initializeHeroes(heroes);
      });
  }

  navigateCreateHeroes(): void {
    this.router.navigate(['/heroes/create-heroes']);
  }

  navigateEditHero(id: number): void {
    this.router.navigate([`/heroes/edit-heroes/${id}`]);
  }

  confirmDeleteHero(hero: Hero): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        description: 'Are you sure you want to delete the selected hero?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(hero.id);
        this.toastService.showNotification('Hero has been deleted');
      }
    });
  }

  getHeroCanFlyText(canFly: boolean): string {
    return canFly ? 'Hero can fly! 🪽🪽' : "Hero can't fly 🙁🪽";
  }
}
