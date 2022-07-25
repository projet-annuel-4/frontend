import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigningComponent } from './signing/signing.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children:[
      {path: 'signing', component: SigningComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'forgot', component: ForgotPasswordComponent},
      {path: 'reset', component: ResetPasswordComponent},
      {path: 'token', component: TokenComponent},
      {path: '', redirectTo:'signing', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
