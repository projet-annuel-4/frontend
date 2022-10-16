import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment, user_service } from '../../../environments/environment'
import { TokenStorageService } from '../token/token-storage.service'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { User } from '../../_dtos/user/User'
import { UserUpdateRequest } from '../../_dtos/user/UserUpdateRequest'
import { SignInResponse } from '../../_dtos/auth/SignInResponse'

@Injectable()
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private httpClient: HttpClient, private storage: TokenStorageService) {}

  fetchProfile(): Observable<User> {
    return this.httpClient
      .get(
        `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/info`,
        this.httpOptions
      )
      .pipe(
        map((user: User) => {
          this.storage.saveUser(user)
          return user
        })
      )
  }

  update(userUpdate: UserUpdateRequest) {
    return this.httpClient
      .put(
        `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/edit`,
        userUpdate,
        this.httpOptions
      )
      .pipe(
        map((response: SignInResponse) => {
          this.storage.saveUser(
            new User(
              response.id,
              response.firstName,
              response.lastName,
              response.email,
              0,
              0,
              response.imgUrl
            )
          )
          return response
        })
      )
  }

  getProfile(): User {
    return this.storage.getUser()
  }

  logout(): void {
    this.storage.signOut()
  }

  getById(user_id: number): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/${user_id}`,
      this.httpOptions
    )
  }

  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.DOMAIN}/${environment.API_VERSION}/${environment.AUTH}/${environment.USERS}/mail/${email}`,
      this.httpOptions
    )
  }
}
