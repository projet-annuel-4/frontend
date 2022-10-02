import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Router } from '@angular/router';
import { SignUpRequest } from 'src/app/_dtos/auth/SignUpRequest';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //loading: Boolean = false;
  signUpFrom: FormGroup;

  positions = NbGlobalPhysicalPosition;

  constructor(private _authService: AuthService, private formBuilder: FormBuilder, private router: Router,
              private dialogService: NbDialogService, private nbToasterService:NbToastrService) {
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

  register() {
    if (this.signUpFrom.valid) {

      const data = this.signUpFrom.value;
      //this.loading = true;

      this._authService.register(new SignUpRequest(data['firstname'], data['lastname'], data['email'],
                                                   data['password'], data['password2'], "captchtest")).subscribe(
        () => {
          this.nbToasterService.show('Connection successful, an email has been sent', ``, { position:this.positions.TOP_RIGHT, status:"success" });
          this.router.navigate(['../auth/signing']).then();
        },
      );

    } else {
      this.nbToasterService.show('All fields must be completed', ``, { position:this.positions.TOP_RIGHT, status:"danger" });
    }

  }

}
