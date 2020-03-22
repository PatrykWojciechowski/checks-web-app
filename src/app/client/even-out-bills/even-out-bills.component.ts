import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FlatmateService} from '../../shared/flatmate.service';

export interface EvenOutBillsData {
  username: string,
  flatmateName: string,
  sum: string,
  bankNumber: string
}

@Component({
  selector: 'app-even-out-bills',
  templateUrl: './even-out-bills.component.html',
  styleUrls: ['./even-out-bills.component.css']
})
export class EvenOutBillsComponent implements OnInit {

  data: EvenOutBillsData;

  constructor() {
  }

  ngOnInit(): void {}


}
