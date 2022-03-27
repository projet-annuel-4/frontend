import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  apiUrl: string = 'http://localhost:3000/api/v1/admin/';

  constructor(private http: HttpClient) { }


  getAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiUrl + "user/all");
  }

  getById(userId: string): Observable<UserModel>{
    return this.http.get<UserModel>(this.apiUrl + "user" + userId);
  }

}
