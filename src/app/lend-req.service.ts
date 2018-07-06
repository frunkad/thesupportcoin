import { Injectable } from '@angular/core';
import { BorrowComponent } from './borrow/borrow.component';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, ObservableLike } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Task } from './task';
import { User, FirestoreService } from './firestore.service';




@Injectable({
  providedIn: 'root'
})
export class LendReqService {

  private lendreqCollection: AngularFirestoreCollection<Task>;
  private uid;
  private username;
  private currentUser$: Observable<User>;

  visibleBor$: Observable<Task[]>;

  constructor(private db: AngularFirestore,public authService: AuthService,public firestoreService: FirestoreService) {

    authService.authState$.subscribe(authUser => {
      if (authUser != null) {
        this.currentUser$ = firestoreService.getUser(authUser.uid);

        this.currentUser$.subscribe(user => {
          if(user){
            this.username = user.displayName;
            this.uid = user.uid;
            }
            else{
              this.username = '';
              this.uid = null;
            }
        });
      }
      else {
        this.username = '';
        this.uid = null;
      }
    });
    
    this.lendreqCollection = this.db.collection<Task>('lends');
  }

  callFor() {
    this.visibleBor$ = this.lendreqCollection.valueChanges();
  }

  createRequest(reqTask: Task) {
      // this.lendreqCollection.add(Object.assign({},reqTask));
      this.lendreqCollection.add(reqTask);
    
  }
  
}