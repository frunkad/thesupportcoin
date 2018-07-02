import { Component, OnInit } from '@angular/core';
import { BorrowReqService } from '../borrow-req.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  constructor(public borrows: BorrowReqService, public auth: AuthService ) { }

  ngOnInit() {
  }

}
