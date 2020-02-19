import {Flatmate} from '../../models/expense.model';

export interface ExpensesForm {
  firstStep: ExpensesForm.FirstStep;
  secondStep: ExpensesForm.SecondStep;
  thirdStep: ExpensesForm.ThirdStep;
  independentData: ExpensesForm.IndependentData;
}

export namespace ExpensesForm {

  export interface FirstStep {
    flatmates: Flatmate[];
  }

  export interface SecondStep {
    amount: number;
  }

  export interface ThirdStep {
    description: string;
  }

  export interface IndependentData {
    img: File;
    buyer: Flatmate;
    dividedAmount: number;
  }
}
