import {Component} from "@angular/core";
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'choose-flatmate-dialog',
  templateUrl: './choose-flatmate-dialog.component.html',
  styleUrls: ['./choose-flatmate-dialog.component.scss']
})
export class ChooseFlatmateDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChooseFlatmateDialogComponent>) {
  }

  flatmate = new FormControl("");

  save(): void {
    this.dialogRef.close(this.flatmate.value);
  }

}
