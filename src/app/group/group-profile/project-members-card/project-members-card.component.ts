import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {GroupService} from "../../../_services/group/group.service";

@Component({
  selector: 'app-project-members-card',
  templateUrl: './project-members-card.component.html',
  styleUrls: ['./project-members-card.component.scss']
})
export class ProjectMembersCardComponent implements OnInit {

  @Input()
  member: User;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
  }

  removeMember(){
    this.groupService.deleteMembers(this.member.id).subscribe();
  }

}
