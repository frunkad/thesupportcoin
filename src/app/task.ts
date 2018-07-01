export interface Task {
  $key?: string;
  completed: boolean;
  title: string;
  createdBy: string;
  amount: string;
}

export class LendTask implements Task {
  completed = false;
  title;
  amount;
  createdBy;
  constructor(title: string, createdBy: string, amount: string) {
    this.title = title;
    this.createdBy = createdBy;
    this.amount = amount;
  }
}
