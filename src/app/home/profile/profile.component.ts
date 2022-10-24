import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/app/_services/user/user.service';
import {Post} from '../../_dtos/post/Post';
import {PostService} from '../../_services/post/post.service';
import {User} from '../../_dtos/user/User';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {FollowerListComponent} from './follower-list/follower-list.component';
import {SubscriptionListComponent} from './subscription-list/subscription-list.component';
import {CodeService} from '../../_services/code_execution/code.service';
import {FileManagementService} from '../../_services/file-management/file-management.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DeletePostDialogComponent} from '../../shared/dialog/delete-post-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User;

  posts: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempUserPost: Post[];

  postsLiked: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempPostLiked: Post[];

  userAnswers: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempUserAnswers: Post[];

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
    this.postService.getUserById(this.profile.id).subscribe(
      user => {
        this.profile = user;
      },
      ()=> {},
      () => {
        if(this.profile.imgUrl != null){
          this.loadImage();
        }
      }
    );

    this.postService.getAllByUserWithoutAnswers(this.profile.id).subscribe(
      posts => {this.tempUserPost = posts; },
      error => {},
      () => {
        if(this.tempUserPost != null){
          this.posts = this.postService.postTabToPostMap(this.tempUserPost);
          this.posts = this.postService.reverseMap(this.posts);
          this.posts = this.markPostsAlreadyLikeByUser(this.posts);
        }
      }
    );

    this.postService.getPostLikedByUser(this.profile.id).subscribe(
      posts => {
        this.tempPostLiked = posts;
      },
      error => {},
      () => {
        if(this.tempPostLiked != null){
          this.postsLiked = this.postService.postTabToPostMap(this.tempPostLiked);
          this.postsLiked = this.reverseMap(this.postsLiked);
          this.postsLiked = this.markPostsAlreadyLikeByUser(this.postsLiked);
        }
      }
    );

    this.postService.getAllUserAnswers(this.profile.id).subscribe(
      userAnswers => {
        this.tempUserAnswers = userAnswers;
      },
        error => {},
      () => {
        if(this.tempUserAnswers != null){
          this.userAnswers = this.postService.postTabToPostMap(this.tempUserAnswers);
          this.userAnswers = this.reverseMap(this.userAnswers);
          this.userAnswers = this.markPostsAlreadyLikeByUser(this.userAnswers);
        }
      }
    );

  }


  loadImage(){
    this.fileService.downloadImage(this.profile.id).subscribe( res => {
      const objectURL = 'data:image/png;base64,' + res.file;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  viewFollowers() {
    this.dialogService.open(FollowerListComponent);
  }
  viewSubscriptions() {
    this.dialogService.open(SubscriptionListComponent);
  }


  deletePost(postId: string) {
    this.dialogService.open(DeletePostDialogComponent).onClose.subscribe(deletionConfirmed => {
      if (deletionConfirmed) {
        this.postService.delete(parseInt(postId)).subscribe(
          () => {},
          () => {},
          () => {
            window.location.reload();
          });
        this.nbToasterService.show('Post deleted successfully', `Confirmation`, { position: this.positions.TOP_RIGHT, status: 'success' });
      }
    });
  }

  markPostsAlreadyLikeByUser(posts: Map<Post, {isLiked: boolean}>) {
    this.postService.getPostLikedByUser(this.profile.id).subscribe(
      postsLiked => {
        this.postsAlreadyLiked = postsLiked;
      },
      ()=> {},
      () => {
        if (this.postsAlreadyLiked != null){
          posts.forEach((value, post) => {
            this.postsAlreadyLiked.forEach(postLiked => {
              if (post.id === postLiked.id) { value.isLiked = true; }
            });
          });
        }
      }
    );
    return posts;
  }


  like_dislike(postId: string) {
    this.postService.like_dislike(postId, this.posts);
  }

  answers_like_dislike(postId: string) {
    this.postService.like_dislike(postId, this.userAnswers);
  }

  postLiked_like_dislike(postId: string) {
    this.postService.like_dislike(postId, this.postsLiked);
  }

  reverseMap(mapToReverse: Map<Post, {isLiked: boolean}>): Map<Post, {isLiked: boolean}> {
    return new Map(Array.from(mapToReverse).reverse());
  }


}
