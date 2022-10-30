import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Post} from '../../_dtos/post/Post';
import {CodeService} from '../../_services/code_execution/code.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent implements OnInit {
  @Input()
  post: Post;

  constructor(public codeService: CodeService) {}

  ngOnInit(): void {}
}
