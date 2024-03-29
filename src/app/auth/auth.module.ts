import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../shared/shared.module'

import { AuthService } from '../_services/auth/auth.service'

import { AuthComponent } from './auth.component'
import { SignupComponent } from './signup/signup.component'
import { SigningComponent } from './signing/signing.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { TokenComponent } from './token/token.component'
import { UserService } from '../_services/user/user.service'

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SigningComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TokenComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, UserService],
})
export class AuthModule {}
