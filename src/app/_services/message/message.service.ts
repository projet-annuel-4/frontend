import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;

  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8200/websocket');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/start/initial', function (hello) {
        console.log(JSON.parse(hello.body));

        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  sendMessage() {
    this.stompClient.send('/current/resume', {}, JSON.stringify(this.newmessage));
    this.newmessage = "";

  }

  showMessage(message) {
    this.greetings.push(message);
  }


}
