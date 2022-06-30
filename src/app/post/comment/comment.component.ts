import { Component, OnInit } from '@angular/core';
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostRequest} from "../../_dtos/post/PostRequest";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentRequest} from "../../_dtos/post/CommentRequest";
import {TokenStorageService} from "../../_services/token/token-storage.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  post: Post;
  answerForm: FormGroup;
  answer: Post;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private route: ActivatedRoute,
              private tokenStorage: TokenStorageService, private router: Router) {
    this.answerForm = this.formBuilder.group({
      content: [],
      tagName: [],
      attachmentUrl: [],
      attachmentDescription: []
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params): void => {
      if(params.postId !== undefined){
        this.postService.getById(params.postId).subscribe(post => {
          this.post = post;
          console.log("id: " + this.post.id);
          console.log("content: " + this.post.content);
        });
      }
    });

  }


  comment(){
    //créer le post
    if(this.answerForm.valid) {
      const data = this.answerForm.value;

      this.postService.create(new PostRequest(
        data["content"] == null ? data["content"] = "" : data["content"],
        //this.user.id,
        "6",
        data["tagName"] == null ? data["tagName"] = "" : data["tagName"],
        data["attachmentUrl"] == null ? data["attachmentUrl"] = "" : data["attachmentUrl"],
        data["attachmentDescription"] == null ? data["attachmentDescription"] = "" : data["attachmentDescription"]))
        .subscribe(answer => {
          this.answer = answer;

          this.createCommentLink()
        });

    }

  }

  createCommentLink(){
    let commentRequest = new CommentRequest(
      this.post.id,
      this.answer.id,
      /*this.tokenStorage.getUser().id*/ "7")

    this.postService.comment(commentRequest).subscribe(then => {
      this.router.navigate(['post/' + this.post.id + '/detail']).then();
    });
  }


}