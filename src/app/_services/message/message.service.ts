import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { UserMessage } from '../../_dtos/chat/UserMessage';
import { FriendProfile } from '../../_dtos/chat/FriendProfile';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  SockJS;
  Stomp;

  constructor() {
    this.initializeWebSocketConnection();
  }

  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8200/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    console.log("messsage : " + message)
    this.stompClient.send("/api/v1/chat/send/message" , {}, message);
  }


}
