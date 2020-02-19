export class Flatmate{
  constructor(id: string, name: string, title: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  id: string;
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
  id: string;
  amount: number;
  description: string;
  buyerId: string;
  debtors: Debtor[];
  timestamp: Date;
}

export interface Summary {
  creditor: string;
  debts: Debt[];
}

export interface Debtor {
  name: string;
  amount: number;
  paid: boolean;
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
