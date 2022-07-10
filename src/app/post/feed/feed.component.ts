import { Component, OnInit} from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {Post} from "../../_dtos/post/Post";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {UserProfile} from "../../_dtos/user/UserProfile";
import {User} from "../../_dtos/user/User";
import {NbButtonComponent} from "@nebular/theme";
import {any} from "codelyzer/util/function";
import {LikeButton} from "../../_dtos/post/LikeButton";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  user: User;
  posts: Post[];
  postsLikedByUser: Post[];

  likeButton: NbButtonComponent;
  toggle = false;
  //status = "Disable";

  likeButtons: LikeButton[]

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) {}


  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.postService.getAllSubscriptionPost(this.user.id).subscribe(posts => {
      this.posts = posts;
      this.posts.forEach(post => {
        this.likeButtons.push(new LikeButton(post.id, "Disable", false));
      });

      this.markPostAlreadyLikedBis();
      console.log("oue")

    }, error => {});

  }


  markPostAlreadyLikedBis(){
    console.log("oue")
    this.postService.getPostLikedByUser(this.user.id).subscribe(postsLiked => {
      postsLiked.forEach(postLiked => {
        this.likeButtons.forEach(button => {
          if(button.post_id == postLiked.id){
            button.status = "Enable";
          }
        });
      });
    }, error => {});
  }


  markPostAlreadyLiked(){
    let postAlreadyLiked = this.getIntersection(this.posts, this.postsLikedByUser);
    postAlreadyLiked.forEach(posts => {
      //mettre le status de leur bouton à Enable

    });

  }

  //TODO : Trouver le moyen d'assoicer le bouton de like au post
  //      Pour pouvoir changer leur status indépendamment des autres


  like_dislike(post_id: string){
    this.toggle = !this.toggle;

    let curButton = this.likeButtons.find(button => button.post_id = post_id);

    if(this.toggle){
      curButton.status = "Enable"
      //this.postService.like(parseInt(post_id), this.user.id).subscribe(then => {
      //  changer le status du bouton
      // });
    } else {
      curButton.status = "Disable"
      //this.postService.dislike(parseInt(post_id), this.user.id).subscribe(then => {
      //  changer le status du bouton
      // });
    }
  }

/*
  like_dislike(post_id: string){
    this.toggle = !this.toggle;

    if(this.toggle){
      //this.status = "Enable"
    } else {
      this.status = "Disable"
    }
  }
*/



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
