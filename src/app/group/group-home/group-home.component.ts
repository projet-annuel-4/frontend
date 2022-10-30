import {Component, OnInit} from '@angular/core';
import {Group} from '../../_dtos/group/Group';
import {GroupService} from '../../_services/group/group.service';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {CreateGroupRequest} from '../../_dtos/group/CreateGroupRequest';
import {User} from '../../_dtos/user/User';
import {UserService} from '../../_services/user/user.service';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {

  createGroupRequest = new CreateGroupRequest();
  mail: string;
  members: Set<User> = new Set<User>();
  positions = NbGlobalPhysicalPosition;
  creatorId: number;

  togglePopup = 'pop-up-none';


  groups: Group[];

  constructor(private groupService: GroupService, private dialogService: NbDialogService,
              private nbToasterService: NbToastrService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.initUserGroups();
  }

  initUserGroups() {
    this.groupService.getGroupsByMembersEmail().subscribe(groups => {
      this.groups = groups;
    });
  }


  showPopup() {
    if (this.togglePopup === 'pop-up-block') {
      this.togglePopup = 'pop-up-none';
      this.offOverlay();
    } else if (this.togglePopup === 'pop-up-none') {
      this.togglePopup = 'pop-up-block';
      this.onOverlay();
    }
  }

  onOverlay() {
    document.getElementById('overlay').style.display = 'block';
  }

  offOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }



/*** For  newGroup pop up***/
  addMembers() {
    this.userService.getByEmail(this.mail).subscribe(
      user => {
        if (this.members.has(user)) {
          this.nbToasterService.show(user.email + ' is already add', `Warning`, {
            position: this.positions.TOP_RIGHT,
            status: 'warning',
          });
          return;
        }
        this.members.add(user);
        this.mail = '';
      },
      error => {
        this.nbToasterService.show('User ' + this.mail + ' not found', `Warning`, {
          position: this.positions.TOP_RIGHT,
          status: 'warning',
        });
      }
    );
  }

  createGroup() {
    if (this.members.size === 0) {
      this.nbToasterService.show('A group with only you is not very funny', `Warning`, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      });
      return;
    }

    this.memberToCreateGroupRequest();
    let user: User;
    user = JSON.parse(localStorage.getItem('auth-user') as unknown as User);
    this.createGroupRequest.creatorId = parseInt(user.id);
    this.groupService.create(this.createGroupRequest).subscribe(
      then => {
        this.togglePopup = 'pop-up-none';
        this.initUserGroups();
      },
      () => {
      },
      () => {
      });
  }

  removeMember(memberToDelete: User) {
    this.members.delete(memberToDelete);
  }

  memberToCreateGroupRequest() {
    const ids: Set<number> = new Set<number>();
    ids.add(this.userService.getProfile().id);
    this.members.forEach(member => ids.add(member.id));
    this.createGroupRequest.members = Array.from(ids);
  }

}
