import { Component, OnInit } from '@angular/core';
import {Group} from '../../_dtos/group/Group';
import {GroupService} from '../../_services/group/group.service';
import {NbDialogService} from '@nebular/theme';
import {NewGroupComponent} from '../../shared/dialog/new-group.component';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {

  groups: Group[];

  constructor(private groupService: GroupService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.initUserGroups();
  }

  initUserGroups() {
    this.groupService.getGroupsByMembersEmail().subscribe(groups => {
      this.groups = groups;
    });
  }

  createGroup() {
    this.dialogService.open(NewGroupComponent).onClose.subscribe(
      () => this.initUserGroups()
    );
  }
}
