import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import {Injectable} from "@angular/core";
import {error} from "@angular/compiler/src/util";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})


export class RegistrationService {
  apiUrl: string = "http://localhost:8082/api/v1/registration";

  constructor(private http: HttpClient) {}

  register(user: UserModel){
    return this.http.post<UserModel>(this.apiUrl, user, httpOptions).subscribe(
      res => alert("Un mail a été envoyé à " + res.email),
      error => alert("Error : " + error['emailError'])
    );
  }

}
