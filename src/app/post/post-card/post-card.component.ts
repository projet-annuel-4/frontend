import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../_dtos/post/Post'
import {PostService} from "../../_services/post/post.service";
import {CodeService} from "../../_services/code_execution/code.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input()
  post: Post

  constructor(public codeService: CodeService) {}

  ngOnInit(): void {}
}
