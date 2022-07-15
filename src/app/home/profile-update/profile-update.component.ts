import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";
import {Router} from "@angular/router";
import {NbDialogService} from "@nebular/theme";
import {SignUpRequest} from "../../_dtos/auth/SignUpRequest";
import {UserService} from "../../_services/user/user.service";
import {UserUpdateRequest} from "../../_dtos/user/UserUpdateRequest";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  signUpFrom: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private userService: UserService, private router: Router) {
    this.signUpFrom = this.formBuilder.group({
      imgUrl: [],
      firstname: [],
      lastname: []
    });
  }

  ngOnInit(): void {
  }

  update() {
    if (this.signUpFrom.valid) {
      const data = this.signUpFrom.value;
      //this.loading = true;
      this.userService.update(new UserUpdateRequest(data['firstname'], data['lastname'],
        data['imgUrl'])).subscribe(
        response => {
          //this.loading = true;
          console.log("subscribe");
          this.router.navigate(['../profile']).then()
        }
      );

    } else {
      alert("All fields must be completed");
    }

  }
}
