import {Component, OnInit} from '@angular/core';
import {Group} from '../../_dtos/group/Group';
import {ProjectService} from '../../_services/project/projectService';
import {ActivatedRoute, Params} from '@angular/router';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {GroupService} from '../../_services/group/group.service';
import {CreateProjectRequest} from '../../_dtos/project/CreateProjectRequest';

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


  togglePopup = 'pop-up-none';


  constructor(private groupService: GroupService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private dialogService: NbDialogService,
              private nbToasterService: NbToastrService) {
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

  showPopup(){
    if(this.togglePopup === "pop-up-block"){
      this.togglePopup = 'pop-up-none';
      this.offOverlay();
    } else if(this.togglePopup === "pop-up-none"){
      this.togglePopup = 'pop-up-block';
      this.onOverlay();
    }
  }

  onOverlay() {
    document.getElementById("overlay").style.display = "block";
  }

  offOverlay() {
    document.getElementById("overlay").style.display = "none";
  }


  createProject() {
    const projectRequest = new CreateProjectRequest(
      (document.getElementById('createProjectName') as HTMLInputElement).value,
      false,
      +this.groupId
    );
    this.projectService.createProject(projectRequest).subscribe(
      data => {
        localStorage.setItem('createdProject', JSON.stringify(data));
      },
      error => {
        this.nbToasterService.show(error.error.message, `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
        return;
      },
      () => {
        this.nbToasterService.show('Project has been saved successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });

        localStorage.removeItem('groupId')
        this.loadProjects();
        this.showPopup();
      }
    );
  }



}
