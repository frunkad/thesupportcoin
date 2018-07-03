import { Component, OnInit, ViewChild } from '@angular/core';
import { LendReqService } from '../lend-req.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css'],
})
export class LendComponent implements OnInit {

  constructor(public lends: LendReqService) {
    this.lends.callFor();
  }

  ngOnInit() {
  }

public encoded(text: string) {
  return encodeURI(text);
}

}
