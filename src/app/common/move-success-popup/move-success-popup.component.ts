import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-move-success-popup',
  templateUrl: './move-success-popup.component.html',
  styleUrls: ['./move-success-popup.component.scss'],
})
export class MoveSuccessPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MoveSuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close(this.data);
  }
}
