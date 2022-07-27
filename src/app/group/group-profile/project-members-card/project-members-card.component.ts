import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";

@Component({
  selector: 'app-project-members-card',
  templateUrl: './project-members-card.component.html',
  styleUrls: ['./project-members-card.component.scss']
})
export class ProjectMembersCardComponent implements OnInit {

  @Input()
  member: User;

  constructor() { }

  ngOnInit(): void {
  }

}
