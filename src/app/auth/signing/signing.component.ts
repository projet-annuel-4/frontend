import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInRequest } from 'src/app/_dtos/auth/SignInRequest';
import { SignInResponse } from 'src/app/_dtos/auth/SignInResponse';
import { Router } from '@angular/router';
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

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

  positions = NbGlobalPhysicalPosition;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
              private nbToasterService:NbToastrService) {
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
          this.router.navigate(["profile"]).then(() => {
            window.location.reload();
          });
          this.loading = false;
        },(err:any)=>{
          this.loading = false;
          this.errorMessage = err;
          this.nbToasterService.show(err['statusText'], `Error`, { position:this.positions.TOP_RIGHT, status:"danger" })
        }
      );
    } else {
      this.nbToasterService.show('All fields must be completed', ``, { position:this.positions.TOP_RIGHT, status:"danger" });
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
