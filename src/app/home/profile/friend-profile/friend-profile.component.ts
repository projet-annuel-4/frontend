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

  posts: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempUserPost: Post[];

  friendPostsLiked: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempFriendPostsLiked: Post[];

  friendAnswers: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempFriendAnswers: Post[];

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
        if(this.tempUserPost != null){
          this.posts = this.postService.postTabToPostMap(this.tempUserPost);
          this.posts = this.postService.reverseMap(this.posts);
          this.posts = this.markPostAlreadyLikeByUser(this.posts);
        }
      }
    );

    this.postService.getPostLikedByUser(this.friendProfile.id).subscribe(
      postsLiked => {
        this.tempFriendPostsLiked = postsLiked;
      },
        error => {},
      () => {
        if(this.tempFriendPostsLiked != null){
          this.friendPostsLiked = this.postService.postTabToPostMap(this.tempFriendPostsLiked);
          this.friendPostsLiked = this.postService.reverseMap(this.friendPostsLiked)
          this.friendPostsLiked = this.markPostAlreadyLikeByUser(this.friendPostsLiked);
        }
      }
    );

    this.postService.getAllUserAnswers(this.friendProfile.id).subscribe(
      userAnswers => {
          this.tempFriendAnswers = userAnswers;
        },
        error => {},
      () => {
        if(this.tempFriendAnswers !== null){
          this.friendAnswers = this.postService.postTabToPostMap(this.tempFriendAnswers);
          this.friendAnswers = this.postService.reverseMap(this.friendAnswers)
          this.friendAnswers = this.markPostAlreadyLikeByUser(this.friendAnswers);
        }
      }
    );
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


  markPostAlreadyLikeByUser(posts: Map<Post, {isLiked: boolean}>){
    this.postService.getPostLikedByUser(this.tokenStorage.getUser().id).subscribe(postsLiked => {
      this.postsAlreadyLiked = postsLiked
      posts.forEach((value, post) => {
        this.postsAlreadyLiked.forEach(postLiked => {
          if(post.id == postLiked.id) value.isLiked = true;
        });
      });
    });
    return posts;
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
    this.postService.like_dislike(post_id, this.posts);
  }

  answers_like_dislike(post_id: string){
    this.postService.like_dislike(post_id, this.friendAnswers);
  }


  postLiked_like_dislike(post_id: string){
    this.postService.like_dislike(post_id, this.friendPostsLiked);
  }

  updateSubscribeButton(){
    if(this.followedByTheUser == true){
      this.buttonText = "unfollow";
    } else {
      this.buttonText = "follow";
    }
  }


}
