import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { UserMessage } from '../../_dtos/chat/UserMessage';
import { FriendProfile } from '../../_dtos/chat/FriendProfile';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable()
export class NotificationService {

  stompClient: any;
  topic: string

  //https://haseeamarathunga.medium.com/create-a-spring-boot-angular-websocket-using-sockjs-and-stomp-cb339f766a98

  constructor(private dataService: DataService, private userService: UserService, private storageService: TokenStorageService) {
    this.topic = `/notifications/${this.userService.getProfile().id}`
  }

  subscribe() {
    const ws = new SockJS(`${environment.DOMAIN}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = () => {};
    const _this = this;
    _this.stompClient.connect({ "Authorization": "Bearer " + this.storageService.getToken() },
      function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
        });
      }, function (error) { setTimeout(() => _this.subscribe(), 5000); });
  }

  onMessageReceived(message) {
    let json = JSON.parse(message.body)
    if (json['type'] == "USER_MESSAGE_ADDED") {
      let data = json['data'] as UserMessage
      this.dataService.updateUserMessages([data])
    } else if (json['type'] == "USER_CONVERSATION_UPDATED" || json['type'] == "USER_CONVERSATION_ADDED") {
      let data = json['data'] as FriendProfile
      this.dataService.updateFriends([data])
    } else {
      console.log(json)
    }
  }

}
