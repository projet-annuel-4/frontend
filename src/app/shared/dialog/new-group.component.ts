import {Component} from "@angular/core";
import {NbDialogRef, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {CreateGroupRequest} from "../../_dtos/group/CreateGroupRequest";
import {UserService} from "../../_services/user/user.service";
import {GroupService} from "../../_services/group/group.service";
import {User} from "../../_dtos/user/User";

@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>
        <label class="label">Group Name:</label>
        <input nbInput [(ngModel)]="createGroupRequest.name">
      </nb-card-header>

      <nb-card-body>
        <ul>
          <li *ngFor="let member of members">
            {{member.email}}
            <button nbButton size="tiny" status="danger" (click)="removeMember(member)"> remove </button>
          </li>
        </ul>
        <div>
          <label class="label">Members :</label>
          <input nbInput placeholder="mymail@mail.fr" [(ngModel)]="mail">
        </div>
      </nb-card-body>

      <button nbButton status="primary" (click)="addMembers()">Add Members</button>

      <nb-card-footer>
        <button nbButton (click)="createGroup()"> Create</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NewGroupComponent {

  createGroupRequest = new CreateGroupRequest();
  mail: string;
  members: Set<User> = new Set<User>();

  positions = NbGlobalPhysicalPosition;

  constructor(protected ref: NbDialogRef<NewGroupComponent>, private userService: UserService,
              private groupService: GroupService, private nbToasterService:NbToastrService) {}


  addMembers(){
    this.userService.getByEmail(this.mail).subscribe(user => {
      if(this.members.has(user)){
        this.nbToasterService.show(user.email + " is already add", `Warning`, { position:this.positions.TOP_RIGHT, status:"warning" });
        return;
      }
      this.members.add(user);
      this.mail = "";
    }, error => {
      this.nbToasterService.show("User " + this.mail + " not found", `Warning`, { position:this.positions.TOP_RIGHT, status:"warning" });
    });
  }


  createGroup(){
    if(this.members.size == 0){
      this.nbToasterService.show('A group with only you is not very funny', `Warning`, { position:this.positions.TOP_RIGHT, status:"warning" });
      return;
    }

    this.memberToCreateGroupRequest();

    this.groupService.create(this.createGroupRequest).subscribe(then =>{
      this.ref.close();
    });

  }

  removeMember(memberToDelete: User) {
    this.members.delete(memberToDelete);
  }


  memberToCreateGroupRequest(){
    let ids: Set<number> = new Set<number>();
    ids.add(this.userService.getProfile().id);
    this.members.forEach(member => ids.add(member.id));
    this.createGroupRequest.members = Array.from(ids);
  }

}
