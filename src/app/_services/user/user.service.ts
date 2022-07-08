import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment, user_service} from '../../../environments/environment';
import { TokenStorageService } from '../token/token-storage.service';
import { map } from 'rxjs/operators';
import { UserProfile } from '../../_dtos/user/UserProfile';
import { Observable } from 'rxjs';
import {User} from "../../_dtos/user/User";

@Injectable()
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private storage:TokenStorageService) {
  }

  fetchProfile(): Observable<User>{
    return this.httpClient.get(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/info`, this.httpOptions)
    .pipe(map((user: User) =>{
      this.storage.saveUser(user)
      return user;
    }))
  }

  getProfile(): User{
    return this.storage.getUser();
  }

  logout(): void{
    this.storage.signOut();
  }
}
