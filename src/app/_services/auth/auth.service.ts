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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
        this.tokenStorage.saveToken(response.accessToken)
        this.tokenStorage.saveUser(new UserProfile(response.id, response.email, response.name, response.imageUrl))
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
