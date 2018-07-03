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

import * as firebase from 'firebase/app';
import {FirebaseError} from 'firebase/app';

// import UserInfo = firebase.UserInfo;
export enum AuthProviders {
  Github = 0,
  Twitter = 1,
  Facebook = 2,
  Google = 3,
  Password = 4,
  Anonymous = 5,
  Custom = 6
}

@Injectable()
export class AuthService {
  public user: firebase.User;
  public authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = null;
    this.authState$ = afAuth.authState;

    this.authState$.subscribe((user: firebase.User) => {
      this.user = user;

      console.log('authState$ changed', this.user);
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : null;
  }

  signIn(providerId: number): Promise<void> {
    let provider: firebase.auth.AuthProvider = null;

    switch (providerId) {
      case AuthProviders.Github:
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case AuthProviders.Twitter:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case AuthProviders.Facebook:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case AuthProviders.Google:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
    }

    return firebase.auth()
      .signInWithPopup(provider)
      .then((result: firebase.auth.UserCredential) => {
        // The signed-in user info.
        this.user = result.user;
        this.updateUserData(result.user);
      }).catch((error: FirebaseError) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'authService/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
        } else {

        }
        console.error('ERROR @ AuthService#signIn() :', error);
      });
  }

  signInWithGithub(): Promise<void> {
    return this.signIn(AuthProviders.Github);
  }

  signInWithTwitter(): Promise<void> {
    return this.signIn(AuthProviders.Twitter);
  }

  signInWithFacebook(): Promise<void> {
    return this.signIn(AuthProviders.Facebook);
  }

  signInWithGoogle(): Promise<void> {
    return this.signIn(AuthProviders.Google);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
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
}

  
// @Injectable()
// export class AuthService {

//   private _user: firebase.User;
//   authenticated$: Observable<boolean>;
//   uid: string = "";

//   get user(): firebase.User {
//     return this._user
//   }

//   set user(value: firebase.User) {
//     this._user = value
//   }

//   get authenticated(): boolean {
//     return this._user !== null;
//   }
  
//   get id(): string {
//     return this.authenticated ? this.user.uid : '';
//   }

//   constructor(
//     public afAuth: AngularFireAuth,
//     private afs: AngularFirestore,
//     private router: Router
//   ) {

//       //// Get auth data, then get firestore user document || null
//       this.authenticated$ = afAuth.authState.pipe(map(user => !!user));
//       // this.uid = afAuth.authState.pipe(map(user=>
//       //   {
//       //     console.log("feefE");
//       //     // this.user =  this.afs.doc<User>(`users/${user.uid}`).valueChanges();
//       //     return user.uid;
//       //   }));
//       afAuth.authState.subscribe((user) => {
//         console.log("<auth.service.ts> Current User",user);
//           // this.authenticated$ = of(true);
//           this.uid = user.uid;
//           this.user = user;
//           // this.user = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
       
        
//       });
//       // this.user = this.afAuth.authState.pipe(
//       //   switchMap(user => {
//       //     if (user) {
//       //       console.log("reduce this call");
//       //       console.log(user);
//       //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
//       //     } else {
//       //       return of(null)
//       //     }
//       //   }));
//     }
  



//   googleLogin() {
//     const provider = new auth.GoogleAuthProvider()
//     return this.oAuthLogin(provider);
//   }

//   private oAuthLogin(provider) {
//     return this.afAuth.auth.signInWithPopup(provider)
//       .then((credential) => {
//         this.updateUserData(credential.user)
//       })
//   }


//   private updateUserData(user) {
//     // Sets user data to firestore on login
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

//     const data: User = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL
//     }

//     return userRef.set(data, { merge: true })

//   }


//   signOut() {
//     this.afAuth.auth.signOut().then(() => {
//         this.router.navigate(['/lend']);
//     });
//   }
// }