import { NgModule } from '@angular/core';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AsyncPipe, CommonModule } from '@angular/common';
import { DialogComponent } from 'src/app/domain/components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoadingComponent, DialogComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    AsyncPipe,
  ],
  providers: [],
  exports: [LoadingComponent],
})
export class SharedModule {}
