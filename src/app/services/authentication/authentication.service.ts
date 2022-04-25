import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserModel} from "../../models/user.model";
import {PasswordResetModel} from "../../models/passwordReset.model";
import {Router} from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  apiUrl: string = 'http://localhost:8082/api/v1/auth/';

  constructor(private http: HttpClient, private router: Router) { }


  login(user: UserModel){
    this.http.post<UserModel>(this.apiUrl + "login", user, httpOptions).subscribe(
      res => {
        if(res['token']){
          localStorage.setItem('token', res['token']);
          //console.log("TOKEN : " + localStorage.getItem('token'));
        }
        if(res['userRole']){
          localStorage.setItem('userRole', res['userRole']);
          //console.log("USER ROLE : " + localStorage.getItem('userRole'));
        }
        this.router.navigate(["user/profile"]).then();
      },
      error => {
        alert(error['error']);
      }
    );
  }

  forgot(passwordResetModel: PasswordResetModel){
    return this.http.post(this.apiUrl + "forgot", passwordResetModel, httpOptions).subscribe(
      res => {
        alert("Regardez votre boite mail !");
      },
      error => {
        alert(error['error']);
      }
    );
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
