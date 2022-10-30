import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_dtos/user/User';
import {GroupService} from '../../../_services/group/group.service';
import {FileManagementService} from '../../../_services/file-management/file-management.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../_services/token/token-storage.service';

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
              private fileService: FileManagementService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log( this.member);
    console.log( this.member?.firstName);


    if (this.member.imgUrl != null) {
      this.loadImage();
    }

  }

  removeMember() {
    this.groupService.deleteMembers(this.member.id).subscribe();
  }

  loadImage() {
    this.fileService.downloadImage(this.member.id).subscribe(res => {
      const objectURL = 'data:image/png;base64,' + res.file;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }


  goToFriendPage() {
    if (this.member.id === this.tokenStorage.getUser().id) {
      this.router.navigate(['/profile']).then();
    } else {
      this.router.navigate(['friend/' + this.member.id + '/' + 'profile']).then();
    }
  }
}
