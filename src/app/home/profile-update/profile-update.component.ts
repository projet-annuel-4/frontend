import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";
import {Router} from "@angular/router";
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  signUpFrom: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.signUpFrom = this.formBuilder.group({
      firstname: [],
      lastname: [],
      email: [],
      password: [],
      password2: [],
    });
  }

  ngOnInit(): void {
  }

  update() {

    //TODO : impplémenter l'update

    alert("TODO : implement update");

  }
}
