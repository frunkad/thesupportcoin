import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Task, BorrowTask } from './task';




@Injectable({
  providedIn: 'root'
})
export class BorrowReqService {

  private borrowreqCollection: AngularFirestoreCollection<Task>;
  private uid;
  private username;

  visibleBor$: Observable<Task[]>;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.auth.user.subscribe(user=> {
      if(!!user){
      this.uid = user.uid;
      this.username = user.displayName
      }
      else{
        this.uid = null;
        this.username = null;
      }
    });
    this.borrowreqCollection = this.db.collection<Task>('borrows');
  }
  callFor() {
    this.visibleBor$ = this.borrowreqCollection.valueChanges();
  }

  createRequest(reqTask: BorrowTask) {
    if(this.uid) {
      reqTask.addCreatedBy(this.uid,this.username);
      this.borrowreqCollection.add(Object.assign({},reqTask));
    }
  }
  
}