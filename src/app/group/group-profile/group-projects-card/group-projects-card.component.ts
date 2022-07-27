import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../_dtos/project/Project";
import {Branch} from "../../../_dtos/project/Branch";
import {Router} from "@angular/router";
import {ProjectService} from "../../../_services/project/projectService";

@Component({
  selector: 'app-group-projects-card',
  templateUrl: './group-projects-card.component.html',
  styleUrls: ['./group-projects-card.component.scss']
})
export class GroupProjectsCardComponent implements OnInit {

  @Input()
  project: Project ;



  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  goTo(projectId: number): void {
    this.projectService.getBranchIdByProjectId(projectId).subscribe(project => {
      this.router.navigate([ this.router.url + '/project/', projectId, "branch", project]).then();
    })

  }

}
