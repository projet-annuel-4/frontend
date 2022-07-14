import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {User} from "../../_dtos/user/User";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit {

  @Input()
  post: KeyValue<Post, {isLiked: boolean}>;

  user: User;

  ENABLE = "Enable";
  DISABLE = "Disable"
  status: string;

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

  //TODO : mettre les codes du content dans une balise  <code></code>
  // https://developer.mozilla.org/fr/docs/Web/HTML/Element/code


  like_dislike(post_id: string){
    this.post.value.isLiked = !this.post.value.isLiked;

    if(this.post.value.isLiked){
      this.postService.like(parseInt(post_id), this.user.id).subscribe(then => {
        this.status = this.ENABLE;
        this.post.key.nbLike += 1;
        //window.location.reload();
      });
    } else {
      this.postService.dislike(parseInt(post_id), this.user.id).subscribe(then => {
        this.status = this.DISABLE;
        //window.location.reload();
        this.post.key.nbLike -= 1;
      });
    }
  }

}
