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
  constructor(title: string, amount: string) {
    this.title = title;
    this.amount = amount;
  }
  addCreatedBy(createdBy: string, createdByName: string) {
    this.createdBy = createdBy;
    this.createdByName = createdByName;
  }
  addText(text: string) {
    this.fullText = text;
  }
  requiredImmediately(immediate: boolean = true) {
    //oh wait
    // how could lenders immediately go ?
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
  constructor(title: string, amount: string) {
    this.title = title;
    this.amount = amount;

  }
  addCreatedBy(createdBy: string, createdByName: string) {
    this.createdBy = createdBy;
    this.createdByName = createdByName;
  }
  addText(text: string) {
    this.fullText = text;
  }
  requiredImmediately(immediate: boolean = true) {
    this.immediate = immediate;
  }
}