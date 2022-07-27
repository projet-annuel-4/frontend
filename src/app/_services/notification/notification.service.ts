import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { UserMessage } from '../../_dtos/chat/UserMessage';
import { FriendProfile } from '../../_dtos/chat/FriendProfile';
import { TokenStorageService } from '../token/token-storage.service';
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Injectable()
export class NotificationService {

  stompClient: any;
  topic: string


  toastPositions = NbGlobalPhysicalPosition;

  constructor(private dataService: DataService, private userService: UserService, private tokenStorageService: TokenStorageService,
              private nbToasterService:NbToastrService) {
  }


  notification(senderId: number, message: string){
    if(senderId != this.tokenStorageService.getUser().id) {
      this.nbToasterService.show(message, "New Message", {position: this.toastPositions.TOP_RIGHT, status: "success"});
    }
  }


/*
  subscribe() {
    const ws = new SockJS(`http://localhost:8200/websocket`);
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
 */
}
