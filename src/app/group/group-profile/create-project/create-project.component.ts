import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FileService} from "../../../_services/project/fileService";
import {ActivatedRoute} from "@angular/router";
import {CreateFileRequest} from "../../../_dtos/project/CreateFileRequest";
import {delay} from "rxjs/operators";
import {ProjectService} from "../../../_services/project/projectService";
import {CreateProjectRequest} from "../../../_dtos/project/CreateProjectRequest";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(protected ref: NbDialogRef<CreateProjectComponent>, private projectService: ProjectService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  createProject() {
    const projectRequest = new CreateProjectRequest((document.getElementById('createProjectName') as HTMLInputElement).value,
                                          false,
                                                  +localStorage.getItem('groupId'));
    this.projectService.createProject(projectRequest).subscribe(
      (data) => {localStorage.setItem('createdProject', JSON.stringify(data)); },
      (error) => { alert(error.error.message); return; },
      () => {
        alert('Project has been saved successfully');
        localStorage.removeItem('groupId');
        delay(2000);
        this.ref.close();
      },
    );


  }

  close() {
    this.ref.close();
  }

}
