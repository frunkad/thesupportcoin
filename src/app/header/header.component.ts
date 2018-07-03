import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, SuiModal} from 'ng2-semantic-ui';
import { FormControl, FormGroup } from '@angular/forms';
import { Task, LendTask, BorrowTask } from '../task';
import { LendReqService } from '../lend-req.service';
import { BorrowReqService } from '../borrow-req.service';
import { Observable } from 'rxjs';
import { User, FirestoreService } from '../firestore.service';

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
  public currentUser$: Observable<User>;
  public currentUser: User;


  constructor(public auth: AuthService,public modalService: SuiModalService, public lendService: LendReqService, public borrowService: BorrowReqService, public firestoreService: FirestoreService) {
    auth.authState$.subscribe(authUser => {
      if (authUser != null) {
        this.currentUser$ = firestoreService.getUser(authUser.uid);

        this.currentUser$.subscribe(user => {
          console.log("<header.component.ts> currentUser state",user);

          this.currentUser = user;
        });
      }
      else {
        this.currentUser = null;
      }
    });

  }

  ngOnInit() {
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