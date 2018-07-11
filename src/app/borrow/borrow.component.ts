import { Component, OnInit, ViewChild } from '@angular/core';
import { BorrowReqService } from '../borrow-req.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {
  public currentUID: string = '';
  constructor(public borrows: BorrowReqService,public auth: AuthService) {    
    this.borrows.callFor();
    auth.authState$.subscribe(authUser => {
      if (authUser != null) {
        this.currentUID = authUser.uid;

      }
      else {
        this.currentUID = '';
      }
    });
  }

  ngOnInit() {
  }
  public encoded(text: string) {
    return encodeURI(text);
  }
}