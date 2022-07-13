import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {User} from "../../_dtos/user/User";
import {NbDialogService} from "@nebular/theme";
import {FollowerListComponent} from "./follower-list/follower-list.component";
import {SubscriptionListComponent} from "./subscription-list/subscription-list.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User
  userPost: Post[];

  postsLiked: Post[];


  constructor(private userService: UserService, private postService: PostService, private router: Router,
              private dialogService: NbDialogService) {
    this.profile = this.userService.getProfile()
  }

  ngOnInit(): void {

    this.postService.getAllByUser(this.profile.id).subscribe(posts => {
      this.userPost = posts.reverse();
    },error => {

    });

    this.postService.getPostLikedByUser(this.profile.id).subscribe(postsLiked => {
      this.postsLiked = postsLiked;
    }, error => {});


  }


  viewFollowers(){
    this.dialogService.open(FollowerListComponent);
  }
  viewSubscriptions(){
    this.dialogService.open(SubscriptionListComponent);

  }


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
