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
    auth.user.pipe(
      take(1),
      map(user => user)
    ).subscribe(uid=> {
      if(!!uid){
      this.uid = uid.uid;
      this.username = uid.displayName
      }
      else{
        this.uid = null;
        this.username = null;
      }
    });
    this.borrowreqCollection = db.collection<Task>('borrows');
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
