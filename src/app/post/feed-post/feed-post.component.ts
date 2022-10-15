import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../_dtos/post/Post'
import { PostService } from '../../_services/post/post.service'
import { TokenStorageService } from '../../_services/token/token-storage.service'
import { User } from '../../_dtos/user/User'
import { KeyValue } from '@angular/common'
import { CodeService } from '../../_services/code_execution/code.service'

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss'],
})
export class FeedPostComponent implements OnInit {
  @Input()
  post: KeyValue<Post, { isLiked: boolean }>

  user: User

  ENABLE = 'Enable'
  DISABLE = 'Disable'
  status: string

  constructor(
    private postService: PostService,
    private tokenStorage: TokenStorageService,
    public codeService: CodeService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
  }

  formatContent(content: string) {
    let newContent = content
    let codes = this.codeService.codePreview(content)

    codes.codesFound.forEach((codeStr, i) => {
      newContent = newContent.replace(codeStr, '\n' + codes.codes[i].content + '\n')
    })

    return newContent
  }

  like_dislike(post_id: string) {
    this.post.value.isLiked = !this.post.value.isLiked

    if (this.post.value.isLiked) {
      this.postService.like(parseInt(post_id), this.user.id).subscribe(then => {
        this.status = this.ENABLE
        this.post.key.nbLike += 1
      })
    } else {
      this.postService.dislike(parseInt(post_id), this.user.id).subscribe(then => {
        this.status = this.DISABLE
        this.post.key.nbLike -= 1
      })
    }
  }
}
