import {Component, OnInit} from '@angular/core';
import {Group} from '../../_dtos/group/Group';
import {ProjectService} from '../../_services/project/projectService';
import {ActivatedRoute, Params} from '@angular/router';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {GroupService} from '../../_services/group/group.service';
import {CreateProjectRequest} from '../../_dtos/project/CreateProjectRequest';
import {GroupRequest} from "../../_dtos/group/GroupRequest";
import {UserService} from "../../_services/user/user.service";
import {User} from "../../_dtos/user/User";

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
  addMemberPopup = 'pop-up-none';

  email: string;


  constructor(private groupService: GroupService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private dialogService: NbDialogService,
              private nbToasterService: NbToastrService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.groupId = params.groupId;
    });

    this.initGroup();
  }

  initGroup(){
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
    if(this.togglePopup == "pop-up-block"){
      this.togglePopup = 'pop-up-none';
      this.offOverlay();
    } else if(this.togglePopup == "pop-up-none"){
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


  showAddMembersPopup(){
    if(this.addMemberPopup === "pop-up-block"){
      this.addMemberPopup = 'pop-up-none';
      this.offOverlay();
    } else if(this.addMemberPopup === "pop-up-none"){
      this.addMemberPopup = 'pop-up-block';
      this.onOverlay();
    }
  }



  addMembers(email: string){
    if(email === undefined){
      this.nbToasterService.show('Please give an email', `No entry`, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      });
    }

    let userToAdd: User;

    this.userService.getByEmail(email).subscribe(
      user => { userToAdd = user },
      err => {
        this.nbToasterService.show('User not found', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'warning',
        });
      },
      () => {
        let groupRequest = new GroupRequest(
          this.group.id,
          this.group.name,
          this.group.creatorId,
          [userToAdd.id]
        );

        this.groupService.addMembers(this.group.id, groupRequest).subscribe(
          then => {},
          error => {
            this.nbToasterService.show('We have a problem retry later', `Oopss`, {
              position: this.positions.TOP_RIGHT,
              status: 'danger',
              icon: 'alert-triangle-outline'
            });
          },
          () => {
            this.addMemberPopup = 'pop-up-none';
            this.email = "";
            this.offOverlay();
            this.initGroup();
            this.nbToasterService.show('User add successfully', `Confirm`, {
              position: this.positions.TOP_RIGHT,
              status: 'success',
            });
          },
        );

      },
    );


  }



}
