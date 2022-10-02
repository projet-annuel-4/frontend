import { Component, OnInit } from '@angular/core';
import {NbMenuService, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { FriendProfile } from 'src/app/_dtos/chat/FriendProfile';
import { NewChatComponent } from '../../shared/dialog/new-chat.component';
import {User} from "../../_dtos/user/User";
import {NewGroupComponent} from "../../shared/dialog/new-group.component";

@Component({
  selector: 'home-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  friends: FriendProfile[];
  profile: User;
  positions = NbGlobalPhysicalPosition;

  constructor(private menuService: NbMenuService, private router: Router, private dialogService: NbDialogService,
              private userService: UserService, private chatService: ChatService, private route: ActivatedRoute,
              private nbToasterService:NbToastrService) {
  }

  ngOnInit(): void {
    this.profile = this.userService.getProfile();

    this.chatService.getFriends().subscribe(friends => {
      this.friends = friends;
    });

  }

  newChatClicked(){
    this.dialogService.open(NewChatComponent).onClose.subscribe((email) => {
      this.userService.getByEmail(email).subscribe(user => {
        this.chatService.startConversation(user.email).subscribe(
          (r) => { console.log(r['statusText']) },
          (err) => { console.log(err) }
        )
      }, error => this.nbToasterService.show('User not found', `Error`, { position:this.positions.TOP_RIGHT, status:"warning" }))
    });
  }

  newGroupClicked(){
    this.dialogService.open(NewGroupComponent);
  }


  chatClicked(id: String){
    this.router.navigate([id], { relativeTo: this.route, skipLocationChange:true }).then()
  }

}
