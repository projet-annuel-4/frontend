import { Component, OnInit } from '@angular/core'
import { PostService } from '../../_services/post/post.service'
import { Post } from '../../_dtos/post/Post'
import { TokenStorageService } from '../../_services/token/token-storage.service'
import { User } from '../../_dtos/user/User'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  user: User

  posts: Map<Post, { isLiked: boolean }> = new Map<Post, { isLiked: boolean }>()
  tempPosts: Post[];

  randomPost: Map<Post, { isLiked: boolean }> = new Map<Post, { isLiked: boolean }>();

  postsAlreadyLiked: Post[]

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()

    this.postService.getAllSubscriptionPost(this.user.id).subscribe(
      posts => {
        this.tempPosts = posts;
      },
      error => {},
      () => {
        if(this.tempPosts != null){
          this.posts = this.postService.postTabToPostMap(this.tempPosts);
          this.posts = this.postService.reverseMap(this.posts);
        }

        this.addRandomPost();
      }
    );
  }


  addRandomPost(){
    let tempPost: Post[];
    let tempPostMap: Map<Post, { isLiked: boolean }>;

    this.postService.getAll().subscribe(
      post => {tempPost = post},
      () => {},
      () => {
        if(tempPost != null){
          tempPost = tempPost.slice(0,10);

          tempPostMap = this.postService.postTabToPostMap(tempPost);
          tempPostMap.forEach((value, key) => {
            this.posts.set(key, value);
          });

          this.posts = this.postService.reverseMap(this.posts);
        }
      }
    );
  }


  /**
   *
   * @param source
   * @param target
   * @return returns common posts to arrays (inner join)
   */
  getIntersection(source: Post[], target: Post[]) {
    let res: Post[] = []

    source.forEach(post => {
      target.forEach(postLiked => {
        if (post.id == postLiked.id) {
          res.push(postLiked)
        }
      })
    })

    return res
  }

  refresh() {
    window.location.reload()
  }
}
