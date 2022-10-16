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
import {FileManagementService} from "../../../_services/file-management/file-management.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss']
})
export class FriendProfileComponent implements OnInit {

  friendProfile: User;
  image;

  friendPostsLiked: Post[];
  friendAnswers: Post[];

  posts: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempUserPost: Post[];
  postsAlreadyLiked: Post[];

  followedByTheUser: boolean = false;

  buttonText: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private postService: PostService,
              private dialogService: NbDialogService, public codeService:CodeService,
              private followService: FollowService, private tokenStorage: TokenStorageService,
              private fileService: FileManagementService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if(params.friendId !== undefined){
        this.initFriend(params.friendId);
        this.loadProfilePicture(params.friendId);
      }
    });

  }

  initFriend(friendId: string){
    this.postService.getUserById(parseInt(friendId)).subscribe(
      friend => {this.friendProfile = friend},
      () => {},
      () => {
        this.initFriendPost();
        this.isFollowed(parseInt(friendId));
      });
  }


  initFriendPost(){
    this.postService.getAllByUser(this.friendProfile.id).subscribe(
      posts => {this.tempUserPost = posts;},
      error => {},
      () => {
        this.posts = this.postService.postTabToPostMap(this.tempUserPost);
        this.posts = this.reverseMap(this.posts);
        this.markPostAlreadyLikeByUser();
      }
    );

    this.postService.getPostLikedByUser(this.friendProfile.id).subscribe(postsLiked => {
      this.friendPostsLiked = postsLiked;
    }, error => {});

    this.postService.getAllUserAnswers(this.friendProfile.id).subscribe(userAnswers => {
      this.friendAnswers = userAnswers;
    }, error => {});
  }

  loadProfilePicture(friendId: string){
    this.fileService.downloadImage(parseInt(friendId)).subscribe( res => {
      let objectURL = 'data:image/png;base64,' + res.file;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

  isFollowed(friendId: number){
    this.followService.getAllSubscriptions(this.tokenStorage.getUser().id).subscribe(subscriptions => {
      subscriptions.forEach(sub => {
        if(sub.id == friendId) this.followedByTheUser = true;
      });
      this.updateSubscribeButton();
    });
  }


  markPostAlreadyLikeByUser(){
    this.postService.getPostLikedByUser(this.tokenStorage.getUser().id).subscribe(postsLiked => {
      this.postsAlreadyLiked = postsLiked
      this.posts.forEach((value, post) => {
        this.postsAlreadyLiked.forEach(postLiked => {
          if(post.id == postLiked.id) value.isLiked = true;
        });
      });
    });
  }


  viewFollowers(){
    localStorage.setItem('fromFriendPage', 'true');
    localStorage.setItem('friendId', this.friendProfile.id.toString());
    this.dialogService.open(FollowerListComponent);
  }

  viewSubscriptions(){
    localStorage.setItem('fromFriendPage', 'true');
    localStorage.setItem('friendId', this.friendProfile.id.toString());
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

  follow_unfollow(){
    if(!this.followedByTheUser){

      this.followService.follow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
        this.followedByTheUser = true;
        this.friendProfile.nbFollowers += 1;
        this.updateSubscribeButton();
      });

    } else {
      this.followService.unfollow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
        this.followedByTheUser = false;
        this.friendProfile.nbFollowers -= 1;
        this.updateSubscribeButton();
      });
    }
  }

  like_dislike(post_id: string){
    this.posts.forEach((value, post) =>{
      if(post.id == post_id){
        if(!value.isLiked){
          this.postService.like(parseInt(post_id), this.tokenStorage.getUser().id).subscribe(then => {
            value.isLiked = true;
            post.nbLike += 1;
          });
        } else {
          this.postService.dislike(parseInt(post_id), this.tokenStorage.getUser().id).subscribe(then => {
            value.isLiked = false;
            post.nbLike -= 1;
          });
        }
      }
    });
  }

  updateSubscribeButton(){
    if(this.followedByTheUser == true){
      this.buttonText = "unfollow";
    } else {
      this.buttonText = "follow";
    }
  }

  reverseMap(mapToReverse: Map<Post, {isLiked: boolean}>): Map<Post, {isLiked: boolean}>{
    return new Map(Array.from(mapToReverse).reverse());
  }

}
