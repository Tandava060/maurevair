import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  snackbarConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  }

  constructor(private snackBar: MatSnackBar) { }

  show(msg: string) {
    this.snackBar.open(msg, 'Close', this.snackbarConfig)
  }
}
