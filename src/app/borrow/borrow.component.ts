import { Component, OnInit, ViewChild } from '@angular/core';
import { BorrowReqService } from '../borrow-req.service';
import { AuthService } from '../auth.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, SuiModal} from 'ng2-semantic-ui';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  newTaskForm = new FormGroup({
    title: new FormControl()
  });

  @ViewChild("modalTemplate2")
  public modalTemplate:ModalTemplate<{ data:string }, string, string>;

  public dynamicContent:string = "Example of dynamic content.";


  constructor(public borrows: BorrowReqService,public auth: AuthService,public modalService: SuiModalService) { }

  ngOnInit() {
  }
  public open(dynamicContent:string = "Example"):void {
    const config = new TemplateModalConfig<{ data:string }, string, string>(this.modalTemplate);

    config.closeResult = "dismissed";
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(r => {
          this.borrows.createRequest(this.newTaskForm.value.title,"1030");
        })
        .onDeny(r => console.log(`Denied with result: '${r}'.`));
}

}

