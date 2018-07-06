import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Task } from './task';
import { FirestoreService, User } from './firestore.service';




@Injectable({
  providedIn: 'root'
})
export class BorrowReqService {

  private borrowreqCollection: AngularFirestoreCollection<Task>;
  private uid;
  private username;
  private currentUser$: Observable<User>

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
    this.borrowreqCollection = this.db.collection<Task>('borrows');

  }
  callFor() {
    this.visibleBor$ = this.borrowreqCollection.valueChanges();
  }

  createRequest(reqTask: Task) {
    // this.borrowreqCollection.add(Object.assign({},reqTask));
    this.borrowreqCollection.add(reqTask);
  }  
}