import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {follower_service} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../_dtos/user/User";

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  constructor(private http: HttpClient) {}

  follow(idUser1: number, idUser2: number){
    return this.http.post(`${follower_service.BASE_URL}/${idUser1}/follow/${idUser2}`, this.httpOptions);
  }

  unfollow(idUser1: number, idUser2: number){
    return this.http.post(`${follower_service.BASE_URL}/${idUser1}/unfollow/${idUser2}`, this.httpOptions);
  }

  getAllFollowers(user_id: number): Observable<User[]>{
    return this.http.post<User[]>(`${follower_service.BASE_URL}/${user_id}/followers`, this.httpOptions);
  }
  getAllSubscriptions(user_id: number){
    return this.http.post<User[]>(`${follower_service.BASE_URL}/${user_id}/subscriptions`, this.httpOptions);
  }


}
