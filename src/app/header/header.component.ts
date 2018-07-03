import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, SuiModal, SuiSidebarModule} from 'ng2-semantic-ui';
import { FormControl, FormGroup } from '@angular/forms';
import { Task, LendTask, BorrowTask } from '../task';
import { LendReqService } from '../lend-req.service';
import { BorrowReqService } from '../borrow-req.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  newTaskForm = new FormGroup({
    title: new FormControl(),
    type: new FormControl(),
    amount: new FormControl(),
    fullText: new FormControl(),
    immediate: new FormControl()
  });
  newTask;

  @ViewChild("mainModal")
  public modalTemplate:ModalTemplate<{ data:string }, string, string>;

  public dynamicContent:string = "Example of dynamic content.";


  constructor(public auth: AuthService,public modalService: SuiModalService, public lendService: LendReqService, public borrowService: BorrowReqService) {
    this.auth.authenticated$.subscribe((ds)=>{
      console.log("Dwdw",ds,ds.valueOf());
    })
  }

  ngOnInit() {
    console.log("initialized")
  }
  public log(msg) {
    console.log(msg);
  }

  public openModal(dynamicContent:string = "Example"):void {
    const config = new TemplateModalConfig<{ data:string }, string, string>(this.modalTemplate);

    config.closeResult = "dismissed";
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(r => {
          if(this.newTaskForm.value.type == "Lending Offer")
          {
            this.newTask = new LendTask(this.newTaskForm.value.title,this.newTaskForm.value.amount);
            this.newTask.addText(this.newTaskForm.value.fullText);
            if(this.newTaskForm.value.immediate)
              this.newTask.requiredImmediately(true);
            this.lendService.createRequest(this.newTask);
          }
          else
          {
            this.newTask = new BorrowTask(this.newTaskForm.value.title,this.newTaskForm.value.amount);
            this.newTask.addText(this.newTaskForm.value.fullText);
            if(this.newTaskForm.value.immediate)
              this.newTask.requiredImmediately(true);
            this.borrowService.createRequest(this.newTask);
          }
          console.log(this.newTask);
        })
        .onDeny(r => console.log(`Denied with result: '${r}'.`));
}


}
