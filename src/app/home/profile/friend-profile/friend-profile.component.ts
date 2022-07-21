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
import {FollowService} from "../../../_services/follow/follow.service";
import {TokenStorageService} from "../../../_services/token/token-storage.service";

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

  followedByTheUser: boolean;

  buttonText: string = "";

  //TODO : Trouver un autre moyen de savoir si le friend est suivi par le user connecté

  constructor(private userService: UserService, private route: ActivatedRoute, private postService: PostService,
              private dialogService: NbDialogService, private codeService:CodeService,
              private followService: FollowService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.followedByTheUser = params.isFollowed;
      console.log("followedByTheUser : " + this.followedByTheUser);

      if(this.followedByTheUser == true){
        this.buttonText = "follow"
      } else {
        this.buttonText = "unfollow"
      }


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


  //TODO : Liste des follower du friend
  viewFollowers(){
    this.dialogService.open(FollowerListComponent);
  }
  //TODO : Liste des subscriptions du friend
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


  follow(){
    this.followService.follow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
      this.followedByTheUser = true;
    })
  }

  unfollow(){
    this.followService.unfollow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
      this.followedByTheUser = false;
    })
  }

  follow_unfollow(){
    this.followedByTheUser = !this.followedByTheUser;
    if(this.followedByTheUser == true){
      this.followService.follow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
        this.followedByTheUser = true;
        this.buttonText = "unfollow"
      })

    } else {
      this.followService.unfollow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
        this.followedByTheUser = false;
        this.buttonText = "follow"
      })

    }
  }

}
