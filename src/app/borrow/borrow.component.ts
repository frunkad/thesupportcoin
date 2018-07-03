import { Component, OnInit, ViewChild } from '@angular/core';
import { BorrowReqService } from '../borrow-req.service';
@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {


  constructor(public borrows: BorrowReqService) {
    this.borrows.callFor();
  }

  ngOnInit() {
  }
  public encoded(text: string) {
    return encodeURI(text);
  }

}