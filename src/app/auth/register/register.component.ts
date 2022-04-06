import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new UserModel();

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.user === undefined) {
      alert('No User');
      return;
    }
    //TODO Captcha
    this.user.captcha = "string";

    this.registrationService.register(this.user).subscribe();
  }


}
