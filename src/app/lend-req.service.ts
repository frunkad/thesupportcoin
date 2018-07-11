import { Injectable } from '@angular/core';
import { BorrowComponent } from './borrow/borrow.component';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, ObservableLike } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Task } from './task';
import { User, FirestoreService } from './firestore.service';

// dec2hex :: Integer -> String
function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

// generateId :: Integer -> String
function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}



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

  deleterRequest(reqId: string){
    return this.db.doc<Task>(`lends/${reqId}`).delete();
  }

  createRequest(reqTask: Task) {
      // this.lendreqCollection.add(Object.assign({},reqTask));
      let newId = generateId(16);
      reqTask.key = newId;
      this.db.doc<Task>(`lends/${newId}`).set(reqTask);
    
  }
  
}