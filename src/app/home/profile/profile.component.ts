import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import {Post} from '../../_dtos/post/Post';
import {PostService} from '../../_services/post/post.service';
import {User} from '../../_dtos/user/User';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {FollowerListComponent} from './follower-list/follower-list.component';
import {SubscriptionListComponent} from './subscription-list/subscription-list.component';
import {CodeService} from '../../_services/code_execution/code.service';
import {FileManagementService} from '../../_services/file-management/file-management.service';
import {DomSanitizer} from '@angular/platform-browser';
import {PostDetailComponent} from '../../post/post-detail/post-detail.component';
import {DeletePostDialogComponent} from '../../shared/dialog/delete-post-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User;

  posts: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();

  postsLiked: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();

  userPost: Post[];

  userAnswers: Post[];

  postsAlreadyLiked: Post[];

  image;

  positions = NbGlobalPhysicalPosition;

  constructor(private userService: UserService, private postService: PostService, private router: Router,
              private dialogService: NbDialogService, public codeService: CodeService, private fileService: FileManagementService,
              private sanitizer: DomSanitizer, private nbToasterService: NbToastrService) {

  }


  ngOnInit(): void {
    this.profile = this.userService.getProfile();

    this.init();
  }

  init() {
    this.postService.getUserById(this.profile.id).subscribe(user => {
      this.profile = user;
    });

    this.postService.getAllByUser(this.profile.id).subscribe(posts => {
      posts.forEach(post => {
        this.posts.set(post, {isLiked: false});
      });

    },
      error => {},
      () => {
        this.posts = new Map(Array.from(this.posts).reverse()); //reverse
        this.posts = this.markPostAlreadyLikeByUser(this.posts);
      });

    this.postService.getPostLikedByUser(this.profile.id).subscribe(posts => {
      posts.forEach(post => {
        this.postsLiked.set(post, {isLiked: false});
      });

    }, error => {},
      () =>{
        this.postsLiked = new Map(Array.from(this.postsLiked).reverse()); //reverse
        this.postsLiked = this.markPostAlreadyLikeByUser(this.postsLiked);
      }
    );

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

  viewPostDetail(){
    this.dialogService.open(PostDetailComponent);
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
    return this.codeService.findCodeInContent(RegExp('#(.+?)##', 'g'), str).length > 0;
  }


  deletePost(post_id: string) {
    this.dialogService.open(DeletePostDialogComponent).onClose.subscribe(deletionConfirmed => {
      if (deletionConfirmed) {
        this.postService.delete(parseInt(post_id)).subscribe(
          () =>{},
          () => {},
          () => {
            window.location.reload();
          });
        this.nbToasterService.show('Post deleted successfully', `Confirmation`, { position:this.positions.TOP_RIGHT, status:"success" });
      }
    });
  }


  markPostAlreadyLikeByUser(posts: Map<Post, {isLiked: boolean}>){
    this.postService.getPostLikedByUser(this.profile.id).subscribe(postsLiked => {
      this.postsAlreadyLiked = postsLiked
      posts.forEach((value, post) => {
        this.postsAlreadyLiked.forEach(postLiked => {
          if(post.id == postLiked.id) value.isLiked = true;
        });
      });
    });

    return posts;
  }

  like_dislike(post_id: string){
    this.posts.forEach((value, post) =>{
      if(post.id == post_id){
        if(!value.isLiked){
          this.postService.like(parseInt(post_id), this.profile.id).subscribe(then => {
            value.isLiked = true;
            post.nbLike += 1;
          });
        } else {
          this.postService.dislike(parseInt(post_id), this.profile.id).subscribe(then => {
            value.isLiked = false;
            post.nbLike -= 1;
          });
        }
      }
    });
  }


}
