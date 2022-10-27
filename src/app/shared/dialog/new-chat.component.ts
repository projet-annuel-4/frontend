import { Component, Input } from '@angular/core'
import {NbDialogRef, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme'
import {UserService} from "../../_services/user/user.service";
import {ChatService} from "../../_services/chat/chat.service";

@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>Enter Your Friend Email</nb-card-header>
      <nb-card-body>
        <input #email nbInput placeholder="Email" type="email" />
      </nb-card-body>
      <nb-card-footer class="text-center">
        <button nbButton (click)="submit(email.value)" status="primary" class="m-2">Submit</button>
        <button nbButton (click)="dismiss()" status="danger" class="m-2">Close</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewChatComponent {

  positions = NbGlobalPhysicalPosition;

  constructor(protected ref: NbDialogRef<NewChatComponent>, private userService: UserService,
              private chatService: ChatService, private nbToasterService: NbToastrService,) {}


  dismiss() {
    this.ref.close()
  }

  OLDsubmit(email: string) {
    this.ref.close(email)
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
        this.ref.close();
      }
    );
  }
}
