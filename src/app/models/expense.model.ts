export class Flatmate{
  constructor(id: number, name: string, title: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  id: number;
  name: string;
  title: string;
  imageUrl: string;
}

export interface User {
  uid: string;
  flatmateId?: number;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface Expense {
  id?: number;
  amount: number;
  description: string;
  shareWith: string[];
  heroName: string;
}

export interface Summary {
  creditor: string;
  debts: Debt[];
}

export interface Debt {
  name: string;
  amount: number;
}

export interface TotalDebt {
  creditor: string;
  amount: number;
  debtor: string;
}
