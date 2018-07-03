import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';



export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore, private auth: AuthService) {

  }

  createUser(user: User): Promise<any>{
    const newUserId: string = this.afs.createId();
    return this.afs.doc<User>(`users/${newUserId}`).set(user);
  }
  getUser(userId: string): Observable<User>{
    return this.afs.doc<User>(`users/${userId}`).valueChanges();
  }
}
