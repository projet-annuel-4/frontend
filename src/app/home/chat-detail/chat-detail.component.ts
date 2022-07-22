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

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {

  //TODO : Web Socket
  //////// Test WS /////
  greetings: string[] = [];
  greetindsNb: NbMessage[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;
  ///////

  messages: NbMessage[] = [];
  friendId: string;
  friendProfile: FriendProfile;
  myProfile: User;

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute,
              private userService: UserService,public messageService: MessageService) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.friendId = params.id;
      this.myProfile = this.userService.getProfile();
      this.friendProfile = this.chatService.getFriend(this.friendId);
      this.getChat()

      this.greetindsNb = this.messages;
    });

    this.connect()
  }

  getChat() {
    this.messages = []
    this.chatService.getMessagesByChat(this.friendId).subscribe(msgs => {
      let messages = msgs.map(msg => {
        let nm = new NbMessage(msg)
        if (msg.senderId == this.myProfile.id.toString()) {
          nm.updateUser(this.myProfile.firstname, this.myProfile.imgUrl, true)
        }
        else {
          nm.updateUser(this.friendProfile.name, this.friendProfile.imgUrl, false)
        }

        console.log("date : " + nm.date)
        console.log("files : " + nm.files)
        console.log("text : " + nm.text)
        console.log("quote : " + nm.quote)
        console.log("sender : " + nm.sender)
        console.log("type : " + nm.type)
        console.log("reply : " + nm.reply)
        console.log("latitude : " + nm.latitude)
        console.log("longitude : " + nm.longitude)


        return nm
      })
      this.messages.push(...messages.slice(this.messages.length, messages.length))
    })
  }

  sendMessage(event) {
    console.log("message.date : " + event.date);
    console.log("message.senderId : " + event.senderId);
    console.log("message.text : " + event.text);
    console.log("message.message : " + event.message);
    console.log("message.reply : " + event.reply);
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
    const socket = new SockJS('http://localhost:8200/websocket');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/start/initial', function (message) {
        console.log('ahhh : ' + JSON.parse(message.body)['sender']);
        _this.showMessage(JSON.parse(message.body));
      });
    });
  }

  //OK
  sendMessageWS(event) {
    this.newmessage = event.message
    this.stompClient.send('/current/resume', {}, JSON.stringify(this.newmessage));
    this.newmessage = "";

    //Send to BDD
    //this.sendMessage(event);
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

      console.log("userMessage.senderId : " + userMessage.senderId);
      /*
            console.log("date : " + nm.date)
            console.log("files : " + nm.files)
            console.log("text : " + nm.text)
            console.log("quote : " + nm.quote)
            console.log("sender : " + nm.sender)
            console.log("type : " + nm.type)
            console.log("reply : " + nm.reply)
            console.log("latitude : " + nm.latitude)
            console.log("longitude : " + nm.longitude)
       */
      let stringify = JSON.stringify(nm)
      console.log("stringify :" + stringify);

      let jsonParse = JSON.parse(stringify)
      console.log("jsonParse : " + jsonParse);
      console.log("jsonParse['text'] : " + jsonParse['text']);


      this.stompClient.send('/current/resume', {}, JSON.stringify(nm));
      this.newmessage = "";

    })
  }

  showMessage(message) {
    console.log("message.sender1 : " + message['sender']);
    /*
    console.log("message.date : " + message['date']);
    console.log("message.text : " + message['text']);
    console.log("message.sender : " + message['sender']);
    console.log("message.type : " + message['type']);
    console.log("message.reply : " + message['reply']);

     */

    //debug
    this.greetings.push(message);
    //

    console.log("message.sender2 : " + message['sender']);

    //TODO : mapper le message reçu en UserMessage
    // Puis en NbMessages


    let userMessage = new UserMessage("", this.myProfile.id.toString(), "", message['text'],
                                    [], "", message['date'], null, true);


    console.log("message.sender3 : " + message['sender']);

    let nm = new NbMessage(userMessage);


    console.log("message.sender4 : " + message['sender']);


    if (message['sender'] == this.myProfile.id.toString()) {
      nm.updateUser(this.myProfile.lastname, this.myProfile.imgUrl, true)
    }
    else {
      nm.updateUser(this.friendProfile.name, this.friendProfile.imgUrl, false)
    }

    console.log("date : " + nm.date)
    console.log("files : " + nm.files)
    console.log("text : " + nm.text)
    console.log("quote : " + nm.quote)
    console.log("sender : " + nm.sender)
    console.log("type : " + nm.type)
    console.log("reply : " + nm.reply)
    console.log("latitude : " + nm.latitude)
    console.log("longitude : " + nm.longitude)






    this.greetindsNb.push(nm);
  }



}
