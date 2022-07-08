import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

import {auth_service, environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { SignInResponse } from '../../_dtos/auth/SignInResponse';
import { SignInRequest } from '../../_dtos/auth/SignInRequest';
import { SignUpRequest } from '../../_dtos/auth/SignUpRequest';
import { ApiResponse } from '../../_dtos/common/ApiResponse';
import { UserService } from '../user/user.service';
import { UserProfile } from '../../_dtos/user/UserProfile';
import {ForgotPasswordRequest} from "../../_dtos/auth/ForgotPasswordRequest";
import {User} from "../../_dtos/user/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

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
        this.tokenStorage.saveUser(new User(response.id, response.firstname, response.lastname, response.email, response.followers, response.imgUrl));
        console.log("Login User id : " + this.tokenStorage.getUser().id);
        console.log("Login User firstname : " + this.tokenStorage.getUser().firstname);
        console.log("Login User lastname : " + this.tokenStorage.getUser().lastname);
        console.log("Login User email : " + this.tokenStorage.getUser().email);
        return response
      }));

  }

  register(signUpRequest: SignUpRequest): Observable<ApiResponse> {
    return this.http.post(`${auth_service.REGISTRATION}`, signUpRequest, this.httpOptions) as Observable<ApiResponse>;
  }

  registerWithFacebook(){
    window.location.href=`${environment.DOMAIN}/oauth2/authorization/facebook?redirect_url=http://localhost:4200/auth/token`;
  }

  registerWithGoogle(){
    window.location.href=`${environment.DOMAIN}/oauth2/authorization/google?redirect_url=http://localhost:4200/auth/token`;
  }

  registerWithGithub(){

  }

  logout() {
    this.tokenStorage.signOut();
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequest){
    return this.http.put(`${auth_service.FORGOT_PASSWORD}`, forgotPasswordRequest, this.httpOptions);
  }

  updatePassword(forgotPasswordRequest: ForgotPasswordRequest){
    return this.http.put(`${auth_service.EDIT_PASSWORD}`, forgotPasswordRequest, this.httpOptions);
  }

}
