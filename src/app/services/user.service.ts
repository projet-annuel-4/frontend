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

  apiUrl: string = 'http://localhost:3000/api/v1/user/';

  constructor(private http: HttpClient) { }

  register(user: UserModel){
    return this.http.post<UserModel>(this.apiUrl, user, httpOptions);
  }

  login(user: UserModel){
    return this.http.put<UserModel>(this.apiUrl, user, httpOptions);
  }

  logout(){

  }

  getAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  getById(userId: string): Observable<UserModel>{
    return this.http.get<UserModel>(this.apiUrl + userId);
  }

  update(userUpdated: UserModel){
    this.http.put<UserModel>(this.apiUrl + userUpdated.id, userUpdated, httpOptions);
  }

  delete(userId: string){
    return this.http.delete<UserModel>(this.apiUrl + userId, httpOptions);
  }

}
