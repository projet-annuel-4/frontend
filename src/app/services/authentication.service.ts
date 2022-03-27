import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserModel} from "../models/user.model";
import {PasswordResetModel} from "../models/passwordReset.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  apiUrl: string = 'http://localhost:3000/api/v1/auth/';

  constructor(private http: HttpClient) { }


  login(mail: string, password: string){
    return this.http.post<UserModel>(this.apiUrl + "login", {mail, password}, httpOptions);
  }

  forgot(passwordResetModel: PasswordResetModel){
    return this.http.post<UserModel>(this.apiUrl + "forgot", passwordResetModel, httpOptions);
  }

  getPasswordResetCode(){
  }

  resetPassword(passwordResetModel: PasswordResetModel){
    return this.http.post<UserModel>(this.apiUrl + "reset/", passwordResetModel, httpOptions);
  }

  updateUserPassword(user: UserModel, passwordResetModel: PasswordResetModel){
    return this.http.put<UserModel>(this.apiUrl + "edit/password", {
      user, passwordResetModel
    }, httpOptions);
  }

}
