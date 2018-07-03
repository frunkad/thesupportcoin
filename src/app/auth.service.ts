import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { tap, map, take } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}


@Injectable()
export class AuthService {

  user: Observable<User>;
  authenticated$: Observable<boolean>;
  uid: string = "";
  

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

      //// Get auth data, then get firestore user document || null
      // this.authenticated$ = afAuth.authState.pipe(take(1),map(user => !!user));
      // this.uid = afAuth.authState.pipe(map(user=>
      //   {
      //     console.log("feefE");
      //     // this.user =  this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      //     return user.uid;
      //   }));
      this.user = of(null);
      this.afAuth.authState.subscribe((user) => {
        console.log("fef",user);
        if(user){
          //logged in
          // this.authenticated$ = of(true);
          this.uid = user.uid;
          this.user = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else{
          // this.authenticated$ = of(false);
          this.user = of(null);
          this.uid = "";
        }
        console.log("dedefe");
        
      });
      // this.user = this.afAuth.authState.pipe(
      //   switchMap(user => {
      //     if (user) {
      //       console.log("reduce this call");
      //       console.log(user);
      //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      //     } else {
      //       return of(null)
      //     }
      //   }));
    }
  



  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }


  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/lend']);
    });
  }
}