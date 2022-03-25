import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.user).subscribe( userLog => {
      console.log(userLog);
    });
  }


}
