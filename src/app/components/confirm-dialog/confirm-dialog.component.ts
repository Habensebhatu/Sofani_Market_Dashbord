import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Weet je het zeker?</h1>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Annuleren</button>
      <button mat-button cdkFocusInitial (click)="onYesClick()">verwijderen</button>
    </div>
  `,
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
