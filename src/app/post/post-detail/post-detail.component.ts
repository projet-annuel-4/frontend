import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {CodeService} from "../../_services/code_execution/code.service";
import {TokenStorageService} from "../../_services/token/token-storage.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  postIsLiked: boolean;

  postAlreadyLiked: Post[];

  answers: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  tempAnswers: Post[];

  constructor(private postService: PostService, private route: ActivatedRoute,
              private router: Router, public codeService: CodeService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if(params.postId !== undefined){
        this.postService.getById(params.postId).subscribe(
          post => this.post = post,
          () => {},
          () => this.markPostAlreadyLikeByUser(this.post.id)
        );
      }
    });
  }


  getAnswers(){
    this.postService.getAllPostAnswers(parseInt(this.post.id)).subscribe(
      answers => {
        this.tempAnswers = answers;
      },
      () => {},
      () => {
        this.answers = this.postService.postTabToPostMap(this.tempAnswers);
        this.answers = this.postService.reverseMap(this.answers);
        this.answers = this.markAnswerAlreadyLikedByUser(this.answers);
      });
  }


  goToProfile(){
    if(this.post.user.id == this.tokenStorage.getUser().id){
      this.router.navigate(['/profile']).then();
    } else {
      this.router.navigate(['friend/' + this.post.user.id + '/' + 'profile']).then();
    }
  }

  goToAnswerDetail(post_id: string){
    this.router.navigate(["post/" + post_id + "/detail"]).then()
  }


  markPostAlreadyLikeByUser(postId: string){
    this.postService.getPostLikedByUser(this.tokenStorage.getUser().id).subscribe(
      posts => {this.postAlreadyLiked = posts;},
      () => {},
      () => {
        this.postAlreadyLiked.forEach(post => {
          if(post.id == postId) this.postIsLiked = true;
        });
      }
    );
  }


  markAnswerAlreadyLikedByUser(answers: Map<Post, {isLiked: boolean}>){
    answers.forEach((value, answer) => {
      this.postAlreadyLiked.forEach(post => {
        if(answer.id == post.id) value.isLiked = true;
      })
    })

    return answers;
  }


  like_dislike(postId: string){
    if(!this.postIsLiked){
      this.postService.like(parseInt(postId), this.tokenStorage.getUser().id).subscribe(then => {
        this.postIsLiked = true;
        this.post.nbLike += 1;
      });
    } else {
      this.postService.dislike(parseInt(postId), this.tokenStorage.getUser().id).subscribe(then => {
        this.postIsLiked = false;
        this.post.nbLike -= 1;
      });
    }
  }

  answers_like_dislike(post_id: string){
    this.answers.forEach((value, post) =>{
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
    window.location.reload();
  }


}
