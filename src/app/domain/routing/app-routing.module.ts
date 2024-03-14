import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes-routing.module').then(
        (m) => m.HeroesRoutingModule
      ),
  },
  { path: '**', redirectTo: '/heroes', pathMatch: 'full' }, // Redirige cualquier ruta no encontrada a la ruta /heroes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // Habilitar la precarga de todos los módulos luego de la carga inicial
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
