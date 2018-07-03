import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LendComponent } from './lend/lend.component';
import { BorrowComponent } from './borrow/borrow.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/lend',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    children: [
      {
        path: 'lend',
        component: LendComponent,
        pathMatch: 'full'
      },
      {
        path: 'borrow',
        component: BorrowComponent,
        pathMatch: 'full'
      }

    ],
    component: HeaderComponent
  },
  {
    path: '**',
    redirectTo: '/lend'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
