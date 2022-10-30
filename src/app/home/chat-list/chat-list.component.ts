import { Component, OnInit } from '@angular/core';
import {
  NbMenuService,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { FriendProfile } from 'src/app/_dtos/chat/FriendProfile';
import { NewChatComponent } from '../../shared/dialog/new-chat.component';
import { User } from '../../_dtos/user/User';
import { NewGroupComponent } from '../../shared/dialog/new-group.component';
import {FileManagementService} from "../../_services/file-management/file-management.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-home-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  friends: FriendProfile[];
  profile: User;
  positions = NbGlobalPhysicalPosition;
  userImage;

  togglePopup: string = 'pop-up-none';

  constructor(
    private menuService: NbMenuService,
    private router: Router,
    private dialogService: NbDialogService,
    private userService: UserService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private nbToasterService: NbToastrService,
    private fileService: FileManagementService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.profile = this.userService.getProfile();

    if(this.profile.imgUrl != null) {
      this.loadImage();
    }

    this.initChatList();
  }


  initChatList(){
    this.chatService.getFriends().subscribe(
      friends => {
        this.friends = friends;
      },
      err => {},
      () => {}
    );
  }

  OLDnewChatClicked() {
    this.dialogService.open(NewChatComponent).onClose.subscribe(email => {
      this.userService.getByEmail(email).subscribe(
        user => {
          this.chatService.startConversation(user.email).subscribe(
            r => {
              console.log(r.statusText);
            },
            err => {
              console.log(err);
            }
          );
        },
        error =>
          this.nbToasterService.show('User not found', `Error`, {
            position: this.positions.TOP_RIGHT,
            status: 'warning',
          })
      );
    });
  }

  newChatClicked() {
    this.dialogService.open(NewChatComponent).onClose.subscribe(
      () => {},
      () =>{},
      () => this.initChatList()
    );
  }

  newGroupClicked() {
    this.dialogService.open(NewGroupComponent);
  }

  chatClicked(id: string) {
    this.router.navigate([id], { relativeTo: this.route, skipLocationChange: true }).then();
  }

  loadImage(){
    this.fileService.downloadImage(this.profile.id).subscribe( res => {
      const objectURL = 'data:image/png;base64,' + res.file;
      this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }



  /**** New Chat Pop Up ****/

  openNewChatForm(){
    this.togglePopup = 'pop-up-block';
    this.onOverlay();
  }

  closeNewChatForm(){
    this.togglePopup = 'pop-up-none';
    this.offOverlay();
  }

  submit(email: string){
    this.userService.getByEmail(email).subscribe(
      user => {
        this.chatService.startConversation(user.email).subscribe(
          r => {},
          err => {},
          () => {}
        );
      },
      error => {
        this.nbToasterService.show('User not found', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'warning',
        })
      },
      () => {
        this.initChatList();
        this.closeNewChatForm();
        window.location.reload();
      }
    );
  }

  onOverlay() {
    document.getElementById("overlay").style.display = "block";
  }

  offOverlay() {
    document.getElementById("overlay").style.display = "none";
  }



}
