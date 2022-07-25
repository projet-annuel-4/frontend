import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInRequest } from 'src/app/_dtos/auth/SignInRequest';
import { SignInResponse } from 'src/app/_dtos/auth/SignInResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {

  loading: Boolean = false
  signInFrom: FormGroup
  redirect = "/"
  errorMessage = "";


  constructor( private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.signInFrom = this.formBuilder.group({
      email: [],
      password: []
    })
  }

  ngOnInit(): void {
  }

  login(){
    if(this.signInFrom.valid){
      const data = this.signInFrom.value;
      this.loading = true;


      this.authService.login(new SignInRequest(data['email'], data['password'])).subscribe(
        (response: SignInResponse) => {
          this.router.navigate(["profile"]).then();
          this.loading = false;
        },(err:any)=>{
          this.loading = false;
          this.errorMessage = err;
          alert(err['statusText']);
        }
      );
    } else {
      alert("All fields must be completed");
    }
  }

  facebook(){
    this.authService.registerWithFacebook();
  }

  google(){
    this.authService.registerWithGoogle();
  }

  gitHub(){
    this.authService.registerWithGithub();
  }

}
