import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/utils/toast/toast.service';
import { UtilService } from '../../shared/services/utils/util/util.service';
import { HeroesService } from '../../shared/services/utils/heroes/heroes.service';
import { PhotosService } from '../../shared/services/photos/photos.service';

@Component({
  selector: 'app-create-heroes',
  templateUrl: './create-heroes.component.html',
  styleUrls: ['./create-heroes.component.scss'],
})
export class CreateHeroesComponent {
  heroForm: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private util: UtilService,
    private heroesService: HeroesService,
    private photosService: PhotosService
  ) {
    this.heroForm = this.formBuilder.group({
      heroPhoto: [null, Validators.required],
      heroName: ['', Validators.required],
      heroAge: [null, Validators.required],
      superpower: ['', Validators.required],
      heroCanFly: [false, Validators.required],
    });
  }

  submitForm(): void {
    if (this.heroForm.valid) {
      const heroPhoto = this.heroForm.get('heroPhoto')!.value;
      const heroName = this.heroForm.get('heroName')!.value;
      const heroAge = this.heroForm.get('heroAge')!.value;
      const heroCanFly = this.heroForm.get('heroCanFly')!.value;
      const superpower = this.heroForm.get('superpower')!.value;
      const hero = {
        id: this.util.generateRandomId(),
        photo: heroPhoto,
        name: heroName,
        age: heroAge,
        superpower: superpower,
        canFly: heroCanFly,
      };
      this.heroesService.addHero(hero);
      this.toastService.showNotification('Super hero has been created!');
      this.navigateTo('../');
    } else {
      this.toastService.showNotification(
        'Form validation failed, please complete the form!'
      );
    }
  }

  navigateTo(to: string): void {
    this.router.navigate([to]);
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
}
