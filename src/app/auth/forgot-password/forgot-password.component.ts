import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading: Boolean = false;
  form: FormGroup;

  positions = NbGlobalPhysicalPosition;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private router: Router, private nbToasterService:NbToastrService) {
    this.form = this.formBuilder.group({
      email: []
    })
  }

  ngOnInit(): void {

  }

  forgotPassword(){
    const data = this.form.value;

    if(data['email'] === null){
      this.nbToasterService.show('Please enter your email', ``, { position:this.positions.TOP_RIGHT, status:"danger" })
      return;
    }

    this.loading = true;

    this.authService.forgotPassword(data['email']).subscribe(next => {
      this.nbToasterService.show("Email has been sent to the given address : " + data['email'], ``, { position:this.positions.TOP_RIGHT, status:"success" })
      this.router.navigate(['/auth/signing']).then();
    });

  }


}
