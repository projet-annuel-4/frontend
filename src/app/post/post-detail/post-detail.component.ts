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
  answers: Post[];

  constructor(private postService: PostService, private route: ActivatedRoute,
              private router: Router, public codeService: CodeService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params): void => {
      if(params.postId !== undefined){
        this.postService.getById(params.postId).subscribe(post => {
          this.post = post;
          console.log("id: " + post.id);
          console.log("content: " + post.content);
        });
      }
    });
  }


  getAnswers(){
    this.postService.getAllPostAnswers(parseInt(this.post.id)).subscribe(answers => {
      answers.forEach(answer => {
        console.log("answer.id : " + answer.id)
      });
      this.answers = answers;
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


}
