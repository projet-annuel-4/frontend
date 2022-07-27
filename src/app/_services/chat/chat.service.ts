import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {chat_service, environment} from '../../../environments/environment';
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
  private userEmail:String = this.tokenStorageService.getUser().email;

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

  getAllUserMessages(): Observable<any> {
    return this.httpClient.post(`${environment.DOMAIN}/${environment.API_VERSION}/${environment.CHAT}/messages?user-email=${this.userEmail}`,
      Array.from(this.dataService.getAllFriend().keys()), this.httpOptions)
      .pipe(map((msgs: UserMessage[]) => {
        this.dataService.updateUserMessages(msgs);
      }))
  }

  startConversation(email: String): Observable<any> {
    return this.httpClient.post(`${chat_service.CHAT}/?user-email=${this.userEmail}&friend-email=${email}`, "", this.httpOptions)
      .pipe(map((friend: FriendProfile) => {
        console.log("friend.id : " + friend.id);
        console.log("friend.friendId : " + friend.friendId);
        console.log("friend.email : " + friend.email);
        console.log("friend.firstName : " + friend.firstName);
        console.log("friend.lastName : " + friend.lastName);
        console.log("friend.imgUrl : " + friend.imgUrl);
        console.log("friend.blockedBy : " + friend.blockedBy);
        console.log("friend.lastMsg : " + friend.lastMsg);
        console.log("friend.lastMsgAt : " + friend.lastMsgAt);
        console.log("friend.unreadMsgs : " + friend.unreadMsgs);
        console.log("friend.updatedAt : " + friend.updatedAt);
        this.dataService.updateFriends([friend]);
      }))
  }


  createMessageText(cid: string, content: string): Observable<UserMessage> {
    return this.httpClient
      .post(`${chat_service.CHAT}/${cid}/messages/text?content=${content}&user-email=${this.userEmail}`,{}, this.httpOptions)
      .pipe(map((userMessage: UserMessage) => {
        this.dataService.updateUserMessages([userMessage]);
        return userMessage;
      }))
  }

  createMessageFile(cid: string, content: string, data:FormData): Observable<UserMessage> {
    return this.httpClient
      .post(`${chat_service.CHAT}/${cid}/messages/files?content=${content}&user-email=${this.userEmail}`, data, this.fileOptions)
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

  getMessagesByChat(covId: string): Observable<UserMessage[]> {
    return this.dataService.getMessagesByChatId(covId);
  }




}
