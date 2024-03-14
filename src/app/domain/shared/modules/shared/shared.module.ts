import { NgModule } from '@angular/core';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AsyncPipe,
  ],
  providers: [],
  exports: [LoadingComponent],
})
export class SharedModule {}
