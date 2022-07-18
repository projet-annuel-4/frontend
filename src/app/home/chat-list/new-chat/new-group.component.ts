import {Component} from "@angular/core";
import {NbDialogRef} from "@nebular/theme";
import {CreateGroupRequest} from "../../../_dtos/group/CreateGroupRequest";
import {UserService} from "../../../_services/user/user.service";
import {GroupService} from "../../../_services/group/group.service";

@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>
        <label class="label">Group Name:</label>
        <input nbInput [(ngModel)]="createGroupRequest.name">
      </nb-card-header>
      <nb-card-body>
        <ul>
          <li *ngFor="let member of members">{{member}}</li>
        </ul>
        <div>
          <label class="label">Members :</label>
          <input nbInput placeholder="mymail@mail.fr" [(ngModel)]="mail">
        </div>


      </nb-card-body>
      <button nbButton status="primary" (click)="addMembers()">Add Members</button>

      <nb-card-footer>
        <button nbButton (click)="createGroup()"> Create </button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewGroupComponent {

  createGroupRequest = new CreateGroupRequest();
  mail: string;
  members: string[] = [];

  constructor(protected ref: NbDialogRef<NewGroupComponent>, private userService: UserService,
              private groupService: GroupService) {}


  addMembers(){
    //TODO : Init le group-service côté back
    this.userService.getByEmail(this.mail).subscribe(user => {
      this.members.push(user.email);
      this.createGroupRequest.membersIds.add(user.id);
      this.mail = "";
    }, error => {
      alert("User " + this.mail + " not found");
    });
  }


  createGroup(){
    if(this.members.length == 0){
      alert("A group with only you is not very funny");
      return;
    }

    this.groupService.create(this.createGroupRequest).subscribe(then =>{
      this.ref.close();
    });
  }

}
