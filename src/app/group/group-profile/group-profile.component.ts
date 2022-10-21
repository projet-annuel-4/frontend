import { Component, OnInit } from '@angular/core';
import {Group} from "../../_dtos/group/Group";
import {ProjectService} from "../../_services/project/projectService";
import {ActivatedRoute, Params} from "@angular/router";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {GroupService} from "../../_services/group/group.service";
import {group} from "@angular/animations";

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {

  group: Group;
  groupId: number;

  image;
  positions = NbGlobalPhysicalPosition;


  constructor(private groupService: GroupService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private dialogService: NbDialogService,
              private nbToasterService:NbToastrService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.groupId = params.groupId;
    });

    this.groupService.getInfoGroup(this.groupId).subscribe(
      data => this.group = data,
      () => {},
      () => { this.loadProjects(); console.log(this.group); }
    );

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
      () => {
        this.nbToasterService.show('', `Error`, { position: this.positions.TOP_RIGHT, status: 'danger' });
      },
      () => {this.loadProjects(); }
    );

  }
}
