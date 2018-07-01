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

  visibleBor$: Observable<Task[]>;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    auth.user.pipe(
      take(1),
      map(user => user.uid)
    ).subscribe(uid=> this.uid = uid);
    this.lendreqCollection = db.collection<Task>('lends');
    this.visibleBor$ = this.lendreqCollection.valueChanges();
  }

  createRequest(title: string, amount: string) {
    if(this.uid) {
      this.lendreqCollection.add(new LendTask(title,this.uid,amount));
    }
  }
  
}
