import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
})
export class SuccessPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SuccessPopupComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
