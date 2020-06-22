import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogResult, DialogAction } from '../object/DialogResult';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dialogTitle: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } 
) {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
}

ngOnInit() {
}

confirm(): void {
    this.dialogRef.close(new DialogResult(DialogAction.OK));
}

cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
}
}
