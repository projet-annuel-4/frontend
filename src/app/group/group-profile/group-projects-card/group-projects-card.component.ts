import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../_dtos/project/Project";
import {Branch} from "../../../_dtos/project/Branch";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-projects-card',
  templateUrl: './group-projects-card.component.html',
  styleUrls: ['./group-projects-card.component.scss']
})
export class GroupProjectsCardComponent implements OnInit {

  @Input()
  project: Project ;



  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(projectId: number): void {
    this.router.navigate([ this.router.url + '/project/', projectId]).then();
  }

}
