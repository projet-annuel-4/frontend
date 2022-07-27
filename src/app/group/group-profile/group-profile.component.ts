import { Component, OnInit } from '@angular/core';
import {Group} from "../../_dtos/group/Group";
import {Project} from "../../_dtos/project/Project";
import {Branch} from "../../_dtos/project/Branch";
import {User} from "../../_dtos/user/User";
import {ProjectService} from "../../_services/project/projectService";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {

  group: Group = new Group(1, "coucou", []);
  groupId: number;

  image;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {

    this.group.members = [
      new User(1 , 'mon test', 'mon tast', 'montext@gmail.com', 0, 0, null)
    ];

  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(){
    this.route.params.subscribe((params: Params): void => {
      this.groupId = params.groupId;
    });
    this.projectService.getProjectByIdGroup(this.groupId).subscribe(
      data => this.group.project = data,
      () => this.group.project = null,
    );
  }

}
