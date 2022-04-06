import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {UserProfilComponent} from "./user-profil/user-profil.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";

const routes: Routes = [

  {path: "auth", children:[
      {path: "login", component: LoginComponent},
      {path: "register", component: RegisterComponent},
      {path: "forgot-password", component: ForgotPasswordComponent},
    ]},


  {path: "user/:id", component: UserProfilComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
