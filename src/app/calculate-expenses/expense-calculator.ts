import {Hero} from "../hero";

export class ExpensesCalculator {

  constructor() {}

  shareWith: Hero[];
  moneySpent: number;

  getAmountToGiveBack(){
      return (this.moneySpent / (this.shareWith.length + 1)).toFixed(2);
  }
}

