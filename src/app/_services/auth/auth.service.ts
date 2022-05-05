import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

import { environment } from '../../../environments/environment';
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
    return this.http.post(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.auth}`, signInRequest, this.httpOptions)
      .pipe(map((response: SignInResponse) => {
        this.tokenStorage.saveToken(response.accessToken)
        this.tokenStorage.saveUser(new UserProfile(response.id, response.email, response.name, response.imageUrl))
        return response
      }));
  }

  register(signUpRequest: SignUpRequest): Observable<ApiResponse> {
    return this.http.post(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.registration}`, signUpRequest, this.httpOptions) as Observable<ApiResponse>;
  }

  logout() {
    this.tokenStorage.signOut()
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequest){
    return this.http.put(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.auth}/forgot`, forgotPasswordRequest, this.httpOptions);
  }

  updatePassword(forgotPasswordRequest: ForgotPasswordRequest){
    return this.http.put(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.auth}/edit/password`, forgotPasswordRequest, this.httpOptions);
  }

}
