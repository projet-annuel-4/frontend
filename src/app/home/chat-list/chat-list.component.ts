import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbDialogService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { UserProfile } from 'src/app/_dtos/user/UserProfile';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { Observable } from 'rxjs';
import { FriendProfile } from 'src/app/_dtos/chat/FriendProfile';
import { NewChatComponent } from './new-chat/new-chat.component';
import {User} from "../../_dtos/user/User";
import {NewGroupComponent} from "./new-chat/new-group.component";

@Component({
  selector: 'home-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  friends: FriendProfile[];
  menu = [
    { title: 'New Chat', icon: 'person-add-outline' },
    { title: 'New Group', icon: 'plus-outline' },
    { title: 'Code Execution', icon: '' },
    { title: 'Settings', icon: 'settings-outline' },
    { title: 'Log out', icon: 'unlock-outline' },
  ];

  profile: User;

  constructor(private menuService: NbMenuService, private router: Router, private dialogService: NbDialogService,
    private userService: UserService, private chatService: ChatService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.profile = this.userService.getProfile();

    this.chatService.getFriends().subscribe(friends => {
      this.friends = friends;
    });

    this.menuListener();
  }

  menuListener() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-chat-more'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        switch (title) {
          case 'New Chat':
            this.dialogService.open(NewChatComponent).onClose.subscribe((email) => {
              this.chatService.startConversation(email).subscribe(
                (r) => { console.log(r) },
                (err) => { console.log(err) }
              )
            })
            break;
          case 'New Group':
            this.dialogService.open(NewGroupComponent);
            break;
          case 'Code Execution':

            this.router.navigateByUrl("/execution/project").then();

            break;
          case 'Settings':
            this.router.navigateByUrl("/settings").then();
            break;
          case 'Log out':
            this.userService.logout();
            this.router.navigateByUrl("/auth/signing").then();
            break;
          default:
            break;
        }
      })
  }

  chatClicked(id: String){
    this.router.navigate([id], { relativeTo: this.route, skipLocationChange:true }).then()
  }

}
