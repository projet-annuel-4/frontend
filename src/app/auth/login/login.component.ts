import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UserModel} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UserModel();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }


  login(){
    if(this.user.email === undefined || this.user.password === undefined) {
      alert('');
      return;
    }

    this.authenticationService.login(this.user).subscribe();
  }


}
