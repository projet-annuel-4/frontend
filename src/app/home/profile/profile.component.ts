import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { UserProfile } from 'src/app/_dtos/user/UserProfile';
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: UserProfile
  userPost: Post[];


  constructor(private userService: UserService, private postService: PostService, private router: Router) {
    this.profile = this.userService.getProfile()
  }

  ngOnInit(): void {

    this.postService.getAllByUser(6).subscribe(posts => {
      this.userPost = posts;
    },error => {

    });


  }

  continue(): void{
    this.router.navigateByUrl("/chat").then();
  }

  uploadFile(file): void{
    console.log(file)
  }


}
