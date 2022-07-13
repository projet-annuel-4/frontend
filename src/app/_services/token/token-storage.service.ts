import { Injectable } from '@angular/core';
import { UserProfile } from '../../_dtos/user/UserProfile';
import {User} from "../../_dtos/user/User";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user'

  constructor() { }

  public saveToken(token: string) {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: User) {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    /*const raw = JSON.parse(localStorage.getItem(this.USER_KEY));
    return (raw != null)? new UserProfile(raw['id'], raw['email'], raw['firstname'], raw['imgUrl'], ) : null;
     */
    return new User(5, "Kélyan", "Bervin", "test@test.com", 352, 102, "https://image.fr");
  }

  signOut() {
    localStorage.clear();
  }

}
