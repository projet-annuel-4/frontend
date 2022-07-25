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

  friendPost: Post[];
  friendPostsLiked: Post[];
  friendAnswers: Post[];

  posts: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  postsAlreadyLiked: Post[];


  followedByTheUser: boolean;

  buttonText: string;


  //TODO : Pouvoir liker les posts du Friend
  constructor(private userService: UserService, private route: ActivatedRoute, private postService: PostService,
              private dialogService: NbDialogService, private codeService:CodeService,
              private followService: FollowService, private tokenStorage: TokenStorageService,
              private fileService: FileManagementService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if(params.friendId !== undefined){
          this.postService.getUserById(params.friendId).subscribe(friend => {
            this.friendProfile = friend;
            this.initFriendPost();
          });

          //Est ce le user follow ce friend ??
          this.followService.getAllSubscriptions(this.tokenStorage.getUser().id).subscribe(subscriptions => {
            subscriptions.forEach(sub => {
              if (sub.id == params.friendId) {
                this.followedByTheUser = true;
              } else {
                this.followedByTheUser = false;
              }
              this.updateButton();
            })
          });


        this.fileService.downloadImage(params.friendId).subscribe( res => {
          let objectURL = 'data:image/png;base64,' + res.file;
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
      }
    });

  }


  initFriendPost(){
    this.postService.getAllByUser(this.friendProfile.id).subscribe(posts => {
      posts.forEach(post => {
        this.posts.set(post, {isLiked: false});
      });
      this.posts = new Map(Array.from(this.posts).reverse()); //reverse
      this.markPostAlreadyLikeByUser();
    },error => {});

    this.postService.getPostLikedByUser(this.friendProfile.id).subscribe(postsLiked => {
      this.friendPostsLiked = postsLiked;
    }, error => {});

    this.postService.getAllUserAnswers(this.friendProfile.id).subscribe(userAnswers => {
      this.friendAnswers = userAnswers;
    }, error => {});
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
    this.followedByTheUser = !this.followedByTheUser;
    if(this.followedByTheUser == true){
      this.followService.follow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
        this.followedByTheUser = true;
      });

    } else {
      this.followService.unfollow(this.tokenStorage.getUser().id, this.friendProfile.id).subscribe(then => {
        this.followedByTheUser = false;
      });
    }

    this.updateButton();
  }

  like_dislike(post_id: string){
    this.posts.forEach((value, post) =>{
      if(post.id == post_id){
        value.isLiked = !value.isLiked;

        if(value.isLiked){
          this.postService.like(parseInt(post_id), this.tokenStorage.getUser().id).subscribe(then => {
            //this.status = this.ENABLE;
            post.nbLike += 1;
            //window.location.reload();
          });
        } else {
          this.postService.dislike(parseInt(post_id), this.tokenStorage.getUser().id).subscribe(then => {
            //this.status = this.DISABLE;
            //window.location.reload();
            post.nbLike -= 1;
          });
        }
      }
    });
  }

  updateButton(){
    if(this.followedByTheUser == true){
      this.buttonText = "unfollow";
    } else {
      this.buttonText = "follow";
    }
  }

}
