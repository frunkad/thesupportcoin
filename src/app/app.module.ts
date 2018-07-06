import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LendComponent } from './lend/lend.component';
import { BorrowComponent } from './borrow/borrow.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HeaderComponent } from './header/header.component';
import { SuiModalService, SuiModule, SuiSidebarModule } from 'ng2-semantic-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { UnauthGuard } from './unauth.guard';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LendComponent,
    BorrowComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    SuiModule,
    SuiSidebarModule
  ],
  providers: [AuthService,AuthGuard,SuiModalService,UnauthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
