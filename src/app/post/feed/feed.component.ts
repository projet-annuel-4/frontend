import { Component, OnInit} from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {Post} from "../../_dtos/post/Post";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {User} from "../../_dtos/user/User";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  user: User;

  posts: Map<Post, {isLiked: boolean}> = new Map<Post, {isLiked: boolean}>();
  postsAlreadyLiked: Post[];


  constructor(private postService: PostService, private tokenStorage: TokenStorageService) {}

  //TODO : Faire la recherche

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.postService.getAllSubscriptionPost(this.user.id).subscribe(posts => {
      posts.forEach(post => {
        this.posts.set(post, {isLiked: false});
      });

      this.posts = new Map(Array.from(this.posts).reverse()); //reverse

      //this.getPostAlreadyLiked();
      this.postService.getPostLikedByUser(this.user.id).subscribe(postsLiked => {
        this.postsAlreadyLiked = postsLiked;

        this.posts.forEach((value, post) => {
          this.postsAlreadyLiked.forEach(postLiked => {
            if(post.id == postLiked.id) value.isLiked = true;
          });
        });
      }, error => {});

      //this.markPostAlreadyLiked()

    }, error => {});

  }


  getPostAlreadyLiked(){
    return this.postService.getPostLikedByUser(this.user.id).subscribe(postsLiked => {
      this.postsAlreadyLiked = postsLiked;
    }, error => {});
  }


  markPostAlreadyLiked() {
    this.posts.forEach((value, post) => {
      this.postsAlreadyLiked.forEach(postLiked => {
        if(post.id == postLiked.id) value.isLiked = true;
      });
    });
  }


  isAlreadyLiked(post_id: string): boolean {
    let isLiked:boolean
    this.postsAlreadyLiked.forEach(post => {
      isLiked = post.id == post_id;
    });
    return isLiked;
  }


  /**
   *
   * @param source
   * @param target
   * @return returns common posts to arrays (inner join)
   */
  getIntersection(source: Post[], target: Post[]){
    let res: Post[] = [];

    source.forEach(post => {
      target.forEach(postLiked => {
        if(post.id == postLiked.id){
          res.push(postLiked);
        }
      })
    });

    return res;
  }


  refresh(){
    window.location.reload()
  }
}
