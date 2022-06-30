import { Component, OnInit} from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {Post} from "../../_dtos/post/Post";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {UserProfile} from "../../_dtos/user/UserProfile";
import {User} from "../../_dtos/user/User";
import {NbButtonComponent} from "@nebular/theme";
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  //user: UserProfile;
  user: User;
  posts: Post[];
  postsLikedByUser: Post[];

  likeButton: NbButtonComponent;
  toggle = false;
  status = "Disable";

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) {}


  ngOnInit(): void {
    //this.user = this.tokenStorage.getUser();
    //this.user.id = "5";

    this.postService.getAllSubscriptionPost(5).subscribe(posts =>{
      this.posts = posts;
    }, error => {});


    this.postService.getPostLikedByUser(5).subscribe(postsLikedByUser => {
      this.postsLikedByUser = postsLikedByUser;
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


  like_dislike(){
    this.toggle = !this.toggle;

    if(this.toggle){
      this.status = "Enable"
    } else {
      this.status = "Disable"
    }
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
