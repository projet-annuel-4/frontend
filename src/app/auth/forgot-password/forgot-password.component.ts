import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {PasswordResetModel} from "../../models/passwordReset.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  passwordModel = new PasswordResetModel()

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.authenticationService.forgot(this.passwordModel);
  }

}
