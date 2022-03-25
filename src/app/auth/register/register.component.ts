import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.user === undefined) {
      alert('No User');
      return;
    }
    this.userService.register(this.user).subscribe();
  }


}
