import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInRequest } from 'src/app/_dtos/auth/SignInRequest';
import { SignInResponse } from 'src/app/_dtos/auth/SignInResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {

  loading: Boolean = false
  signInFrom: FormGroup
  redirect = "/"

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
      const data = this.signInFrom.value
      this.loading = true
      this.authService.login(new SignInRequest(data['email'], data['password'])).subscribe(
        (response: SignInResponse)=>{
          this.router.navigateByUrl(this.redirect);
          this.loading = false;
        },(err:any)=>{
          this.loading = false;
          console.log(err.error.message);
        }
      );
    }
  }

  facebook(){
    this.authService.registerWithFacebook();
  }

  google(){
    this.authService.registerWithGoogle();
  }

  gitHub(){

  }

}
