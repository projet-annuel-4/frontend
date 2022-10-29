import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_dtos/user/User';
import {GroupService} from '../../../_services/group/group.service';
import {FileService} from "../../../_services/project/fileService";
import {FileManagementService} from "../../../_services/file-management/file-management.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-project-members-card',
  templateUrl: './project-members-card.component.html',
  styleUrls: ['./project-members-card.component.scss']
})
export class ProjectMembersCardComponent implements OnInit {

  @Input()
  member: User;

  image;

  constructor(private groupService: GroupService,
              private fileService : FileManagementService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log( this.member);
    console.log( this.member?.firstName);


    if(this.member.imgUrl != null){
      this.loadImage();
    }

  }

  removeMember() {
    this.groupService.deleteMembers(this.member.id).subscribe();
  }

  loadImage(){
    this.fileService.downloadImage(this.member.id).subscribe( res => {
      const objectURL = 'data:image/png;base64,' + res.file;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
