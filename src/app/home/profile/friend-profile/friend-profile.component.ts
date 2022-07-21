import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {Post} from "../../../_dtos/post/Post";
import {UserService} from "../../../_services/user/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../../_services/post/post.service";
import {FollowerListComponent} from "../follower-list/follower-list.component";
import {SubscriptionListComponent} from "../subscription-list/subscription-list.component";
import {NbDialogService} from "@nebular/theme";
import {CodeService} from "../../../_services/code_execution/code.service";

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss']
})
export class FriendProfileComponent implements OnInit {

  friendProfile: User;

  friendPost: Post[];
  postsLiked: Post[];
  friendAnswers: Post[];

  constructor(private userService: UserService, private route: ActivatedRoute, private postService: PostService,
              private dialogService: NbDialogService, private codeService:CodeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if(params.friendId !== undefined){
        this.postService.getUserById(params.friendId).subscribe(friend => {
          this.friendProfile = friend;
          this.initFriendPost();
        });
      }
    });
  }


  initFriendPost(){
    this.postService.getAllByUser(this.friendProfile.id).subscribe(posts => {
      this.friendPost = posts.reverse();
    },error => {});

    this.postService.getPostLikedByUser(this.friendProfile.id).subscribe(postsLiked => {
      this.postsLiked = postsLiked;
    }, error => {});

    this.postService.getAllUserAnswers(this.friendProfile.id).subscribe(userAnswers => {
      this.friendAnswers = userAnswers;
    }, error => {});
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



}
