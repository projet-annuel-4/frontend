import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading: Boolean = false;
  form: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private router: Router) {
    this.form = this.formBuilder.group({
      email: []
    })
  }

  ngOnInit(): void {
  }

  forgotPassword(){

    if(this.form.valid){
      const data = this.form.value;
      this.loading = true;

      this.authService.forgotPassword(data['email']).subscribe(next => {
        alert("Email has been sent to the given address : " + data['email']);
        this.router.navigate(['/auth/signing']).then();
      });
    }
    alert("Please enter your email");

  }



}
