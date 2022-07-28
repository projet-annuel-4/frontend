import { Component, OnInit } from '@angular/core';
import {Group} from "../../_dtos/group/Group";
import {ProjectService} from "../../_services/project/projectService";
import {ActivatedRoute, Params} from "@angular/router";
import {NbDialogService} from "@nebular/theme";
import {CreateProjectComponent} from "./create-project/create-project.component";

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {

  group: Group;
  groupId: number;

  image;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private dialogService: NbDialogService) {

    /*this.group.members = [
      new User(1 , 'mon test', 'mon tast', 'montext@gmail.com', 0, 0, null)
    ];*/

  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.route.params.subscribe((params: Params): void => {
      this.groupId = params.groupId;
    });
    this.projectService.getProjectByIdGroup(this.groupId).subscribe(
      data => this.group.project = data,
      () => this.group.project = null,
    );
  }


  createProject() {

    localStorage.setItem('groupId', String(this.groupId));
    const createProjectComponent = this.dialogService.open(CreateProjectComponent);
    createProjectComponent.onClose.subscribe(
      () => {},
      () => {alert('Error'); },
      () => {this.loadProjects(); }
    );

  }

}
