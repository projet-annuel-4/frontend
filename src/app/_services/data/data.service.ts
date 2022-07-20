import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FriendProfile } from '../../_dtos/chat/FriendProfile';
import { UserMessage } from '../../_dtos/chat/UserMessage';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {chat_service, environment} from '../../../environments/environment';
import {TokenStorageService} from "../token/token-storage.service";

@Injectable()
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };


  private _friends: BehaviorSubject<Map<string, FriendProfile>> = new BehaviorSubject(new Map());
  public readonly friends: Observable<Map<string, FriendProfile>> = this._friends.asObservable();
  private _userMessages: BehaviorSubject<Map<string, UserMessage>> = new BehaviorSubject(new Map());


  constructor(private httpClient: HttpClient, private tokenStorage:TokenStorageService) {}



  updateUserMessages(msgs: UserMessage[]) {
    let oldMsgs = this._userMessages.value
    msgs.map(msg => oldMsgs.set(msg.id, msg))
    this._userMessages.next(oldMsgs)
    //this.sortFriends()
  }

  updateFriends(newFriends: FriendProfile[]) {
    const friends = this._friends.value
    newFriends.map(v => {
      const friend = friends.get(v.id)
      if (friend) {
        friend.update(v.id, v.friendId, v.email, v.firstName, v.lastName, v.imgUrl, v.blockedBy, v.updatedAt)
      } else { friends.set(v.id, v) }
    })
    this._friends.next(friends)
  }

  sortFriends() {
    const msgs = this._userMessages.value
    const friends = this._friends.value

    msgs.forEach((msg, k) => {
      let friend = friends.get(msg.chatId)
      if (friend.lastMsgAt < msg.createdAt) { friend.updateConv(msg.content, msg.createdAt) }
      // if (!msg.readAt) { friend.incrementUnread() }
    })
    this._friends.next(friends)
  }

  getMessagesByChatId(chatId: String): Observable<UserMessage[]> {
    const messagesList = this._userMessages.value;

    return this.httpClient.get(`${chat_service.CHAT}/${chatId}/messages/?user-email=${this.tokenStorage.getUser().email}`, this.httpOptions)
      .pipe(map((userMessages:UserMessage[]) => {
        console.log("userMessages.length : " + userMessages.length);
        const messages: UserMessage[] = [];
        userMessages.forEach((v, k) => {
          messages.push(v);
          messagesList.set(v.id, v)
        })
        this._userMessages.next(messagesList);
        console.log("messages.length : " + messages.length);
        return messages;
      }));


    /*
    return this._userMessages.pipe(
      map(m => {
        let msgs: UserMessage[] = []
        m.forEach((v, k) => { if (v.chatId == chatId) msgs.push(v) })
        // msgs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        return msgs
      })
    )

     */
  }

  getFriends(): Observable<FriendProfile[]> {

    const friendsList = this._friends.value;

    return this.httpClient.get<FriendProfile[]>(`${chat_service.CHAT}/?user-email=${this.tokenStorage.getUser().email}`, this.httpOptions)
      .pipe(map((friendProfiles:FriendProfile[]) => {

        const friends: FriendProfile[] = [];
        friendProfiles.forEach((v, k) => {
          friends.push(v);
          friendsList.set(v.id, v)
        })
        this._friends.next(friendsList);
        console.log(friends);
        return friends;
      }));

  }

  getAllFriend(): Map<string,FriendProfile> {
    return this._friends.value
  }

}
