import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchProfile().subscribe(o =>{
      this.chatService.updateFetch(10)
    });
    this.chatService.fetchFriends().subscribe((output)=>{
      this.chatService.updateFetch(20);
      this.chatService.getAllUserMessages().subscribe(v =>{
        this.chatService.updateFetch(100)
      });
    });

  }

}
