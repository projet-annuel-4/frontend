import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {User} from "../../_dtos/user/User";
import {Tag} from "../../_dtos/post/Tag";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  answers: Post[];

  constructor(private postService: PostService, private route: ActivatedRoute) { }

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



}
