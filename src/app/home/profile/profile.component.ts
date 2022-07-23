import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {User} from "../../_dtos/user/User";
import {NbDialogService} from "@nebular/theme";
import {FollowerListComponent} from "./follower-list/follower-list.component";
import {SubscriptionListComponent} from "./subscription-list/subscription-list.component";
import {CodeService} from "../../_services/code_execution/code.service";
import {FileManagementService} from "../../_services/file-management/file-management.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User
  userPost: Post[];
  postsLiked: Post[];
  userAnswers: Post[];

  image;

  //TODO : Récupérer la photo de profile depuis le bucket S3

  constructor(private userService: UserService, private postService: PostService, private router: Router,
              private dialogService: NbDialogService, private codeService:CodeService, private fileService: FileManagementService,
              private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {

    this.profile = this.userService.getProfile();
    console.log(this.profile.id)
    console.log(this.profile.firstname)
    console.log(this.profile.lastname)

    this.postService.getAllByUser(this.profile.id).subscribe(posts => {
      this.userPost = posts;
    },error => {

    });

    this.postService.getPostLikedByUser(this.profile.id).subscribe(postsLiked => {
      this.postsLiked = postsLiked;
    }, error => {});

    this.postService.getAllUserAnswers(this.profile.id).subscribe(userAnswers => {
      this.userAnswers = userAnswers;
    }, error => {});


    this.fileService.downloadImage(this.profile.id).subscribe( res => {
      let objectURL = 'data:image/png;base64,' + res.file;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })

  }

  viewFollowers(){
    this.dialogService.open(FollowerListComponent);
  }
  viewSubscriptions(){
    this.dialogService.open(SubscriptionListComponent);
  }

  formatContentP(content: string){
    let newContent = content;
    let codes = this.codeService.codePreview(content);

    codes.codesFound.forEach((codeStr, i) => {
      newContent = newContent.replace(codeStr, '\n' + codes.codes[i].content + '\n');
    });

    return newContent;
  }

  containCode(str: string) : boolean{
    return this.codeService.findCodeInContent(RegExp('#(.+?)##','g'), str).length > 0;
  }



  //TODO : Debug le delete cote API
  deletePost(post_id: string) {
    if (confirm("You are going to delete a post")) {
      //this.postService.delete(parseInt(post_id)).subscribe()

      //For demo
      this.userPost.forEach(post => {
        if (post.id == post_id) {
          let i = this.userPost.indexOf(post)
          this.userPost.splice(i, 1);
        }
      })
      //
    }


  }

}
