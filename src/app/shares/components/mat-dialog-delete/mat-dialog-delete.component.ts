import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mat-dialog-delete',
  standalone: true,
  imports: [MatDialogModule , MatInputModule , MatButtonModule],
  templateUrl: './mat-dialog-delete.component.html',
  styleUrl: './mat-dialog-delete.component.scss'
})
export class MatDialogDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<MatDialogDeleteComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
