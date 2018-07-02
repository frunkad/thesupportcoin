import { Component, OnInit, ViewChild } from '@angular/core';
import { LendReqService } from '../lend-req.service';
import { AuthService } from '../auth.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, SuiModal} from 'ng2-semantic-ui';
// import { SuiComponentFactory, SuiModal } from 'ng2-semantic-ui/dist';

import {  LendTask } from '../task';
import { FormControl, FormGroup } from '@angular/forms';

export interface IContext {
  data:string;
}

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css'],
})
export class LendComponent implements OnInit {

  newTaskForm = new FormGroup({
    title: new FormControl()
  });

  @ViewChild("modalTemplate")
  public modalTemplate:ModalTemplate<{ data:string }, string, string>;

  public dynamicContent:string = "Example of dynamic content.";


  constructor(public lends: LendReqService,public auth: AuthService,public modalService: SuiModalService) { }

  ngOnInit() {
  }
  public open(dynamicContent:string = "Example"):void {
    const config = new TemplateModalConfig<{ data:string }, string, string>(this.modalTemplate);

    config.closeResult = "dismissed";
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(r => {
          this.lends.createRequest(this.newTaskForm.value.title,"1030");
        })
        .onDeny(r => console.log(`Denied with result: '${r}'.`));
}

public encoded(text: string) {
  return encodeURI(text);
}

}

