import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-loginalert',
  templateUrl: './loginalert.component.html',
  styleUrls: ['./loginalert.component.css']
})
export class LoginalertComponent {
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<LoginalertComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  openLoginDialog() {
    this.closeDialog();
    this.dialog.open(LoginComponent, {
      width: "400px"
    });
  }
}
