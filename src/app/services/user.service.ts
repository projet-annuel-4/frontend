import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {Injectable} from "@angular/core";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})



export class UserService {

  apiUrl: string = 'http://localhost:3000/api/v1/users/';

  constructor(private http: HttpClient) { }

  register(user: UserModel){
    return this.http.post<UserModel>(this.apiUrl, user, httpOptions);
  }

  getUserInfo(user: UserModel){
    return this.http.get<UserModel>(this.apiUrl, httpOptions);
  }


  update(userUpdated: UserModel){
    this.http.put<UserModel>(this.apiUrl + "/edit", userUpdated, httpOptions);
  }

  delete(userId: string){
    return this.http.delete<UserModel>(this.apiUrl + userId, httpOptions);
  }

}
