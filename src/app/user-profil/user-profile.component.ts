import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(user =>{
      this.user = user;
    });
  }

}
