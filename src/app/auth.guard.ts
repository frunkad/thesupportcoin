import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from './auth.service'
import { Observable, of } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';





@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("auth",this.auth.authenticated);
      return true;

      // return this.auth.afAuth.authState.pipe(
      //       take(1),
      //       map(authState => !!authState)
      //       );

      // return this.auth.authenticated$;

    //   return this.auth.user.pipe(
    //        take(1),
    //        map(user => !!user),
    //        tap(loggedIn => {
    //          if (!loggedIn) {
    //            console.log('access denied')
    //            this.router.navigate(['/login']);
    //          }
    //      })
    // )
  }
}