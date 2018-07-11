import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import {SuiModalService, TemplateModalConfig, ModalTemplate, SuiModal, SuiSidebarModule} from 'ng2-semantic-ui';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../task';
import { LendReqService } from '../lend-req.service';
import { BorrowReqService } from '../borrow-req.service';
import { Observable } from 'rxjs';
import { User, FirestoreService } from '../firestore.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';


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
    description: new FormControl(),
    immediate: new FormControl(),
    name: new FormControl(),
    organisation: new FormControl(),
    idproof: new FormControl(),
    location: new FormControl()
  });
  newTask: Task;

  @ViewChild("mainModal")
  public modalTemplate:ModalTemplate<{ data:string }, string, string>;

  public dynamicContent:string = "Example of dynamic content.";
  public currentUser$: Observable<User>;
  public currentUser: User;
  public task;
  private fileURL: any = '';
  private ref;


  constructor(public auth: AuthService,public modalService: SuiModalService, public lendService: LendReqService, public borrowService: BorrowReqService, public firestoreService: FirestoreService, public storage: AngularFireStorage) {
    this.newTask = <Task>{};
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
    console.log("initialized")
  }
  public log(msg) {
    console.log(msg);
  }

  upload(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.fileURL = '-image';
    this.newTask.photoRef = `userPhotos/${randomId}.jpg`;
    this.ref = this.storage.ref('userPhotos').child(randomId+'.jpg');
    this.task = this.storage.upload('userPhotos/'+randomId+'.jpg',event.target.files[0])
    // observe percentage changes
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url) => {
            this.fileURL = url;
            console.log(this.fileURL);
          })
          
        })
     )
    .subscribe()
    
    // 
    // const task = ref.put(event.target.files[0]);
    

    // task.snapshot.ref.getDownloadURL().subscribe((url) =>{
    //   console.log(url);
    //   this.fileURL = url;
    // });
  }

  public openModal(dynamicContent:string = "Example"):void {
    const config = new TemplateModalConfig<{ data:string }, string, string>(this.modalTemplate);
    console.log('file',this.fileURL);

    config.closeResult = "dismissed";
    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(r => {
          this.newTask.amount = this.newTaskForm.value.amount;
          this.newTask.completed = false;
          this.newTask.title = this.newTaskForm.value.title;
          this.newTask.name = this.newTaskForm.value.name;
          this.newTask.description = this.newTaskForm.value.description;
          this.newTask.location = this.newTaskForm.value.location;
          if(this.newTaskForm.value.type == "Lending Offer")
          {
            this.newTask.organisation = this.newTaskForm.value.organisation;
            if(this.fileURL === ''){
              alert('No image uploaded');
              return;
            }

            if(this.fileURL === '-image'){
              //await file upload
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  this.ref.getDownloadURL().subscribe((url) => {
                    this.fileURL = url;
                    this.newTask.photo = this.fileURL;
                    this.lendService.createRequest(this.newTask); 
                  })
                  
                })
             )
            .subscribe()
            }
            else{
              this.newTask.photo = this.fileURL;
              this.lendService.createRequest(this.newTask);
            }
          }
          else
          {
            this.newTask.idproof = this.newTaskForm.value.idproof;
            if(this.newTaskForm.value.immediate)
              this.newTask.immediate = true;
            if(this.fileURL === ''){
              //await file upload
              this.task.snapshotChanges().pipe(
                finalize(() => {
                  this.ref.getDownloadURL().subscribe((url) => {
                    this.fileURL = url;
                    this.newTask.photo = this.fileURL;
                    this.borrowService.createRequest(this.newTask); 
                  })
                  
                })
             )
            .subscribe()
            }
            else{
              this.newTask.photo = this.fileURL;
              this.borrowService.createRequest(this.newTask);
            }
          }
        })
        .onDeny(r => console.log(`Denied with result: '${r}'.`));

}


}