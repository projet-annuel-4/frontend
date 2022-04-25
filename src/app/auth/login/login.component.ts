import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UserModel} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new UserModel();

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }


  login(){
    if(this.user.email === undefined || this.user.password === undefined) {
      alert('');
      return;
    }
    this.authenticationService.login(this.user);
  }


}
