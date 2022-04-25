import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../models/user.model";
import {Injectable} from "@angular/core";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})


export class UserService {

  apiUrl: string = 'http://localhost:8082/api/v1/users/';

  constructor(private http: HttpClient) { }


  getUserInfo(): Observable<UserModel>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders();
    if(token){
      headers.set('Authorization', token);
      headers.set( 'Content-Type', 'application/json');
    }

    return this.http.get<UserModel>(this.apiUrl + "info", {headers});
  }


  update(userUpdated: UserModel){
    return this.http.put<UserModel>(this.apiUrl + "edit", userUpdated, httpOptions);
  }

  delete(userId: string){
    return this.http.delete<UserModel>(this.apiUrl + userId, httpOptions);
  }

}
