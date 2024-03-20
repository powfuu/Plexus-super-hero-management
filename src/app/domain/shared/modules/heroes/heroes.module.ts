import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from '../../../components/heroes/heroes.component';
import { EditHeroesComponent } from '../../../components/edit-heroes/edit-heroes.component';
import { CreateHeroesComponent } from '../../../components/create-heroes/create-heroes.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterHeroesPipe } from '../../pipes/filter-heroes/filter-heroes.pipe';
import { HeroesDataService } from '../../services/data/heroes-data/heroes-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeroesComponent,
    EditHeroesComponent,
    CreateHeroesComponent,
    FilterHeroesPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HeroesDataService],
})
export class HeroesModule {}
