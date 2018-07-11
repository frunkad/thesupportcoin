import { Component, OnInit, ViewChild } from '@angular/core';
import { LendReqService } from '../lend-req.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User, FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css'],
})
export class LendComponent implements OnInit {
  public currentUID: string = '';
  constructor(public lends: LendReqService,public auth: AuthService) {
    this.lends.callFor();
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
