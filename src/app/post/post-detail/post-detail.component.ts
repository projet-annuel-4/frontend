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

    const tags = [new Tag("js",  1), new Tag("front",  1)];

    this.post = new Post("1","Je suis le contenu ", 1, "new Date()"," new Date()", tags, new User(6));

    /*
        this.route.params.subscribe((params: Params): void => {
          if(params.postId !== undefined){
            this.postService.getById(params.postId).subscribe(post => {
              this.post = post;
            });
          }

        });

     */
    this.answers = [
      new Post("0","Je suis la réponse ", 1, "new Date()"," new Date()", [], new User(6)),
      new Post("0","Je suis la réponse ", 1, "new Date()"," new Date()", [], new User(6)),
      new Post("0","Je suis la réponse ", 1, "new Date()"," new Date()", [], new User(6)),
      new Post("0","Je suis la réponse ", 1, "new Date()"," new Date()", [], new User(6)),
      new Post("0","Je suis la réponse ", 1, "new Date()"," new Date()", [], new User(6)),
    ];


    /*this.postService.getAllPostAnswers(parseInt(this.post.id));*/
  }



}
