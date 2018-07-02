export interface Task {
  $key?: string;
  completed: boolean;
  title: string;
  createdBy: string;
  createdByName: string;
  amount: string;
  immediate?: boolean;
  fullText?: string;
}

export class LendTask implements Task {
  completed = false;
  title;
  amount;
  createdBy;
  createdByName;
  fullText?;
  immediate = false;
  constructor(title: string, createdBy: string, createdByName:string, amount: string) {
    this.title = title;
    this.createdBy = createdBy;
    this.amount = amount;
    this.createdByName = createdByName;
  }
  addText(text: string) {
    this.fullText = text;
  }
  requiredImmediately(immediate: boolean = true) {
    this.immediate = false;
  }
}

export class BorrowTask implements Task {
  completed = false;
  title;
  amount;
  createdBy;
  createdByName;
  fullText?;
  immediate = false;
  constructor(title: string, createdBy: string, createdByName:string, amount: string) {
    this.title = title;
    this.createdBy = createdBy;
    this.amount = amount;
    this.createdByName = createdByName;

  }
  addText(text: string) {
    this.fullText = text;
  }
  requiredImmediately(immediate: boolean = true) {
    this.immediate = false;
  }
}
