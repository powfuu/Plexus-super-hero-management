import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from '../../components/heroes/heroes.component';
import { EditHeroesComponent } from '../../components/edit-heroes/edit-heroes.component';
import { CreateHeroesComponent } from '../../components/create-heroes/create-heroes.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
  {
    path: 'create-heroes',
    component: CreateHeroesComponent,
  },
  {
    path: 'edit-heroes/:id',
    component: EditHeroesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
