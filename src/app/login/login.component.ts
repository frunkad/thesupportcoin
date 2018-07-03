import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(public auth: AuthService,private router:Router) { }

  doLogin() { 
<<<<<<< HEAD
    this.auth.signInWithGoogle().then((suc)=>{
      this.router.navigateByUrl("lend");
      return suc;
=======
    this.auth.googleLogin().then((suc)=>{
      this.router.navigate(["/lend"]);
>>>>>>> <<xd>>
    })
  }

}