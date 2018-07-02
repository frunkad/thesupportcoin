export interface Task {
  $key?: string;
  completed: boolean;
  title: string;
  createdBy: string;
  createdByName: string;
  amount: string;
}

export class LendTask implements Task {
  completed = false;
  title;
  amount;
  createdBy;
  createdByName;
  constructor(title: string, createdBy: string, createdByName:string, amount: string) {
    this.title = title;
    this.createdBy = createdBy;
    this.amount = amount;
    this.createdByName = createdByName;
  }
}

export class BorrowTask implements Task {
  completed = false;
  title;
  amount;
  createdBy;
  createdByName;
  constructor(title: string, createdBy: string, createdByName:string, amount: string) {
    this.title = title;
    this.createdBy = createdBy;
    this.amount = amount;
    this.createdByName = createdByName;

  }
}
