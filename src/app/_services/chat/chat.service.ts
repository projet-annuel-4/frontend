import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FriendProfile } from '../../_dtos/chat/FriendProfile';
import { DataService } from '../data/data.service';
import { UserMessage } from '../../_dtos/chat/UserMessage';
import {TokenStorageService} from "../token/token-storage.service";
import {JwtInterceptor} from "../../_helpers/jwt.interceptor";

@Injectable()
export class ChatService {

  private _fetch: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly fetch: Observable<number> = this._fetch.asObservable();
  private userEmail:String = this.tokenStorageService.getUser().email
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  fileOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };

  constructor(private httpClient: HttpClient, private dataService: DataService,private tokenStorageService:TokenStorageService) { }

  fetchFriends(): Observable<any> {
    return this.httpClient.get(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.CHAT}/?user-email=${this.userEmail}`, this.httpOptions)
      .pipe(map((friends: FriendProfile[]) => {
        this.dataService.updateFriends(friends);
      }))
  }

  updateFetch(value) {
    this._fetch.next(value);
  }

  fetchAllMessages(): Observable<any> {
    return this.httpClient.post(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.CHAT}/messages?user-email=${this.userEmail}`,
      Array.from(this.dataService.getAllFriend().keys()), this.httpOptions)
      .pipe(map((msgs: UserMessage[]) => {
        this.dataService.updateUserMessages(msgs);
      }))
  }
  /*getAllMessages*/
  fetchMessages(covId: string): Observable<any> {
    return this.httpClient.get(`${environment.DOMAIN}/${environment.API_VERSION}/chat/${covId}/messages?user-email=${this.userEmail}`, this.httpOptions)
      .pipe(map((msgs: UserMessage[]) => {
        this.dataService.updateUserMessages(msgs);
      }))
  }
  /* */
  createFriend(email: String): Observable<any> {

    const token = this.tokenStorageService.getToken();
    console.log("const token : " + token);

    const headers = new HttpHeaders().set('Authorization',  token);
    const contentType =  new HttpHeaders( {'Content-Type': 'application/json'});
    const requestOptions = {
      headers,
      contentType
    };


    console.log("token headers : " + headers.get('Authorization'));
    console.log("token requestOptions : " + requestOptions.headers.get('Authorization'));

    return this.httpClient.post(`${environment.DOMAIN}/${environment.API_VERSION}/chat/?user-email=${this.userEmail}&friend-email=${email}`, /*requestOptions*/this.httpOptions)
      .pipe(map((friend: FriendProfile) => {
        this.dataService.updateFriends([friend]);
      }))
  }



  createMessageText(cid: string, content: string): Observable<UserMessage> {
    return this.httpClient
      .post(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.CHAT}/${cid}/messages/text?content=${content}&user-email=${this.userEmail}`,{}, this.httpOptions)
      .pipe(map((v: UserMessage) => {
        this.dataService.updateUserMessages([v]);
        return v;
      }))
  }

  createMessageFile(cid: string, content: string, data:FormData): Observable<UserMessage> {
    return this.httpClient
      .post(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.CHAT}/${cid}/messages/files?content=${content}&user-email=${this.userEmail}`, data)
      .pipe(map((v: UserMessage) => {
        this.dataService.updateUserMessages([v]);
        return v;
      }))
  }

  getFriends(): Observable<FriendProfile[]> {
    return this.dataService.getFriends();
  }

  getFriend(id: string): FriendProfile {
    return this.dataService.getAllFriend().get(id);
  }

  getMessages(covId: string): Observable<UserMessage[]> {
    return this.dataService.getMessages(covId);
  }

}
