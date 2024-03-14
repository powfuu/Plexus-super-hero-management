import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500,
    });
  }
}
