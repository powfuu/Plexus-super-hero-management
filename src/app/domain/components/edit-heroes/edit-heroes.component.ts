import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/services/utils/toast/toast.service';
import { HeroesService } from '../../shared/services/utils/heroes/heroes.service';
import { take } from 'rxjs/operators';
import { Hero } from '../../shared/models/hero.model';
import { PhotosService } from '../../shared/services/photos/photos.service';

@Component({
  selector: 'app-edit-heroes',
  templateUrl: './edit-heroes.component.html',
  styleUrls: ['./edit-heroes.component.scss'],
})
export class EditHeroesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  idHero!: number;
  heroForm!: FormGroup;
  currentHero!: Hero | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private photosService: PhotosService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.idHero = +params['id'];
      this.loadCurrentHero();
    });
    this.heroForm = this.formBuilder.group({
      heroPhoto: [this.currentHero?.photo, Validators.required],
      heroName: [this.currentHero?.name, Validators.required],
      heroAge: [this.currentHero?.age, Validators.required],
      superpower: [this.currentHero?.superpower, Validators.required],
      heroCanFly: [this.currentHero?.canFly, Validators.required],
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
      const { heroPhoto, heroName, heroAge, heroCanFly, superpower } =
        this.heroForm.value;
      const updatedHero: Hero = {
        id: this.idHero,
        photo: heroPhoto,
        name: heroName,
        age: heroAge,
        superpower: superpower,
        canFly: heroCanFly,
      };
      this.updateHero(updatedHero);
    } else {
      this.toastService.showNotification(
        'Form validation failed, please try again!'
      );
    }
  }

  onFileChange(event: any) {
    this.photosService
      .previewImage(event)
      .then((dataURL) => {
        this.heroForm.patchValue({
          heroPhoto: dataURL,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
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
