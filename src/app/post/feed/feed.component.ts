import {Component, OnInit} from '@angular/core';
import {PostService} from '../../_services/post/post.service';
import {Post} from '../../_dtos/post/Post';
import {TokenStorageService} from '../../_services/token/token-storage.service';
import {User} from '../../_dtos/user/User';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  user: User;

  posts: Map<Post, { isLiked: boolean }> = new Map<Post, { isLiked: boolean }>();
  tempPosts: Post[];

  randomPost: Map<Post, { isLiked: boolean }> = new Map<Post, { isLiked: boolean }>();

  postsAlreadyLiked: Post[];

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.postService.getAllSubscriptionPost(this.user.id).subscribe(
      posts => {
        this.tempPosts = posts;
      },
      error => {},
      () => {
        if (this.tempPosts != null) {
          this.posts = this.postService.postTabToPostMap(this.tempPosts);
          this.posts = this.postService.reverseMap(this.posts);
        }
        this.generateRandomPost();
      }
    );
  }


  generateRandomPost(nb?: number) {
    if (nb === undefined) {
      nb = 10;
    }

    let tempPost: Post[];
    let tempPostMap: Map<Post, { isLiked: boolean }>;

    this.postService.getAll().subscribe(
      post => {
        tempPost = post;
      },
      () => {
      },
      () => {
        if (tempPost != null) {
          tempPost = tempPost.slice(0, nb);
          tempPostMap = this.postService.postTabToPostMap(tempPost);

          this.posts = this.distinct(this.posts, tempPostMap);
          // console.log(distinctMap);// this.addAll(distinctMap, this.posts);
          this.posts = this.postService.reverseMap(this.posts);
        }
      }
    );
  }


  distinct(map1: Map<Post, { isLiked: boolean }>, map2: Map<Post, { isLiked: boolean }>) {
    const res: Map<Post, { isLiked: boolean }> = new Map<Post, { isLiked: boolean }>();
    if (map1.size > 0 && map2.size > 0) {
      map1.forEach((value1, key1) => {
        map2.forEach((value2, key2) => {
          if (key2.id !== key1.id) {
            res.set(key2, value2);
          }
        });
      });
      return res;
    } else if (map1.size > 0 && map2.size === 0) {
      return map1;
    } else {
      return map2;
    }


  }

  /**
   * map1 into map2
   * @param map1
   * @param map2
   */
  addAll(map1: Map<Post, { isLiked: boolean }>, map2: Map<Post, { isLiked: boolean }>) {
    map2.forEach((value, key) => {
      map1.forEach((value1, key1) => {
        map2.set(key1, value1);
      });
    });
  }


  /**
   *
   * @param source
   * @param target
   * @return returns common posts to arrays (inner join)
   */
  getIntersection(source: Post[], target: Post[]) {
    const res: Post[] = [];

    source.forEach(post => {
      target.forEach(postLiked => {
        if (post.id == postLiked.id) {
          res.push(postLiked);
        }
      });
    });

    return res;
  }

  refresh() {
    window.location.reload();
  }
}
