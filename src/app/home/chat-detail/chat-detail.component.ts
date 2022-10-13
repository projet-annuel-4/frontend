import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_services/chat/chat.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FriendProfile } from 'src/app/_dtos/chat/FriendProfile';
import { UserService } from 'src/app/_services/user/user.service';
import { NbMessage } from 'src/app/_dtos/chat/NbMessage';
import {User} from "../../_dtos/user/User";
import {MessageService} from "../../_services/message/message.service";
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {UserMessage} from "../../_dtos/chat/UserMessage";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {NotificationService} from "../../_services/notification/notification.service";
import {chat_service} from "../../../environments/environment";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {
  toastPositions = NbGlobalPhysicalPosition;

  messages: NbMessage[] = [];
  friendId: string;
  friendProfile: FriendProfile;
  myProfile: User;


  socketMessages: NbMessage[] = [];
  newMessage: string;
  private stompClient = null;

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute,
              private userService: UserService, private nbToasterService:NbToastrService,
              private notificationService : NotificationService) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.friendId = params.id;
      this.myProfile = this.userService.getProfile();
      this.friendProfile = this.chatService.getFriend(this.friendId);
      this.getChat()

      this.socketMessages = this.messages;
    });

    this.connect()
  }

  getChat() {
    this.messages = []
    this.chatService.getMessagesByChat(this.friendId).subscribe(msgs => {
      let messages = msgs.map(msg => {
        let nm = new NbMessage(msg)
        if (msg.senderId == this.myProfile.id.toString()) {
          nm.updateUser(this.myProfile.firstName, this.myProfile.imgUrl, true)
        }
        else {
          nm.updateUser(this.friendProfile.name, this.friendProfile.imgUrl, false)
        }
        return nm
      })
      this.messages.push(...messages.slice(this.messages.length, messages.length))
    })
  }

  sendMessage(event) {
    const files = !event.files ? [] : event.files;

    let formData = new FormData();

    if(files.length == 0){
      console.log("message texte")
      this.chatService.createMessageText(this.friendId, event.message).subscribe()
    } else {
      formData.append('files', files);
      this.chatService.createMessageFile(this.friendId, event.message, formData).subscribe()
    }
  }


  /** Test Web Socket **/
  connect() {
    //const socket = new SockJS('http://localhost:8200/websocket');
    const socket = new SockJS(`${chat_service.WEB_SOCKET}`);
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      /**
       *  "/start" --> Simple Broker
       *  "/start/initial" --> @SendTo
       */
      _this.stompClient.subscribe('/start/initial', function (message) {
        _this.showMessage(JSON.parse(message.body));
      });
    });
  }


  sendMessageWS2(event) {
    this.chatService.createMessageText(this.friendId, event.message).subscribe(userMessage => {
      let nm = new NbMessage(userMessage);
      if (userMessage.senderId == this.myProfile.id.toString()) {
        nm.updateUser(this.myProfile.id, this.myProfile.imgUrl, true)
      }
      else {
        nm.updateUser(this.friendProfile.id, this.friendProfile.imgUrl, false)
      }

      /**
       *  "/app" --> Application Destination Prefixes
       *   "/resume" --> @MessageMapping
       */
      this.stompClient.send('/app/resume', {}, JSON.stringify(nm));
      this.newMessage = "";

    })
  }

  showMessage(message) {

    let userMessage = new UserMessage("", this.myProfile.id.toString(), "", message['text'],
                                    [], "", message['date'], null, true);

    let nm = new NbMessage(userMessage);

    if (message['sender'] == this.myProfile.id.toString()) {
      nm.updateUser(this.myProfile.lastName, this.myProfile.imgUrl, true)
    }
    else {
      nm.updateUser(this.friendProfile.name, this.friendProfile.imgUrl, false)
    }
    this.socketMessages.push(nm);

    /*
    if(message['sender'] != this.myProfile.id.toString()) {
      this.nbToasterService.show(nm.text, "New Message", {position: this.toastPositions.TOP_RIGHT, status: "success"});
    }

     */

    this.notificationService.notification(message['sender'], nm.text);
  }



}
