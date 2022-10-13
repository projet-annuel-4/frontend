import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

import {auth_service, environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { SignInResponse } from '../../_dtos/auth/SignInResponse';
import { SignInRequest } from '../../_dtos/auth/SignInRequest';
import { SignUpRequest } from '../../_dtos/auth/SignUpRequest';
import {ForgotPasswordRequest} from "../../_dtos/auth/ForgotPasswordRequest";
import {User} from "../../_dtos/user/User";
import {FollowService} from "../follow/follow.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private followService: FollowService) {

  }

  getToken(): string {
    return this.tokenStorage.getToken()
  }

  setToken(token:string){
    this.tokenStorage.saveToken(token)
  }

  login(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.http.post(`${auth_service.LOGIN}`, signInRequest, this.httpOptions)
      .pipe(map((response: SignInResponse) => {

        this.tokenStorage.saveToken(response.accessToken);
        console.log("Login token  : " + this.tokenStorage.getToken());

        this.tokenStorage.saveUser(new User(response.id, response.firstName, response.lastName, response.email,
          0, 0, response.imgUrl));

        this.followService.getAllFollowers(response.id).subscribe( followers => {
          let user = this.tokenStorage.getUser();
          user.nbFollowers = followers.length;
          this.tokenStorage.saveUser(user);
        });

        this.followService.getAllSubscriptions(response.id).subscribe( subscriptions => {
          let user = this.tokenStorage.getUser();
          user.nbSubscriptions = subscriptions.length;
          this.tokenStorage.saveUser(user);
        });


        console.log("Login User id : " + this.tokenStorage.getUser().id);
        console.log("Login User firstname : " + this.tokenStorage.getUser().firstName);
        console.log("Login User lastname : " + this.tokenStorage.getUser().lastName);
        console.log("Login User email : " + this.tokenStorage.getUser().email);
        console.log("Login User nbFollowers : " + this.tokenStorage.getUser().nbFollowers);
        console.log("Login User nbSubscriptions : " + this.tokenStorage.getUser().nbSubscriptions);
        return response;
      }));

  }

  register(signUpRequest: SignUpRequest) {
    return this.http.post(`${auth_service.REGISTRATION}`, signUpRequest, this.httpOptions);
  }

  registerWithFacebook(){
    window.location.href=`${environment.DOMAIN}/oauth2/authorization/facebook?redirect_url=http://localhost:4200/auth/token`;
  }

  registerWithGoogle(){
    window.location.href=`${environment.DOMAIN}/oauth2/authorization/google?redirect_url=http://localhost:4200/auth/token`;
  }

  registerWithGithub(){

  }

  forgotPassword(email: string){
    return this.http.post(`${auth_service.FORGOT_PASSWORD}/${email}`, this.httpOptions);
  }

  updatePassword(forgotPasswordRequest: ForgotPasswordRequest){
    return this.http.put(`${auth_service.EDIT_PASSWORD}`, forgotPasswordRequest, this.httpOptions);
  }

}
