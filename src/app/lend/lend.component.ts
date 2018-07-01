import { Component, OnInit } from '@angular/core';
import { LendReqService } from '../lend-req.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {

  constructor(public lends: LendReqService) { }

  ngOnInit() {
  }

}
