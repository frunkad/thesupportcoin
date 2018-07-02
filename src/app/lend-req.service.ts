import { Injectable } from '@angular/core';
import { BorrowComponent } from './borrow/borrow.component';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Task, LendTask } from './task';




@Injectable({
  providedIn: 'root'
})
export class LendReqService {

  private lendreqCollection: AngularFirestoreCollection<Task>;
  private uid;
  private username;

  visibleBor$: Observable<Task[]>;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    auth.user.pipe(
      take(1),
      map(user => user)
    ).subscribe(uid=> {this.uid = uid,this.username = uid.displayName});
    this.lendreqCollection = db.collection<Task>('lends');
    this.visibleBor$ = this.lendreqCollection.valueChanges();
  }

  createRequest(title: string, amount: string) {
    if(this.uid) {
      this.lendreqCollection.add(Object.assign({},new LendTask(title,this.uid,this.username,amount)));
    }
  }
  
}
