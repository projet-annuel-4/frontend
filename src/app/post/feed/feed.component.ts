import { Component, OnInit} from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {Post} from "../../_dtos/post/Post";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {UserProfile} from "../../_dtos/user/UserProfile";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  user: UserProfile;
  posts: Post[];
  answers: Post[];


  constructor(private postService: PostService, private tokenStorage: TokenStorageService) { }


  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.posts = [
      new Post("0","Je suis le contenu du Post", 1, 12, new Date(), new Date()),
      new Post("0","Je suis le contenu du Post", 1, 12, new Date(), new Date()),
      new Post("0","Je suis le contenu du Post", 1, 12, new Date(), new Date()),
      ];
    /*
    this.postService.getAllSubscriptionPost(parseInt(this.user.id)).subscribe(posts =>{
      this.posts = posts;
    });
     */


  }

  getAnswers(post_id: string){
    this.answers = [
      new Post("0","Je suis le contenu de la reponse", 1, 3, new Date(), new Date()),
      new Post("0","Je suis le contenu de la reponse", 1, 3, new Date(), new Date()),
      new Post("0","Je suis le contenu de la reponse", 1, 3, new Date(), new Date()),
      new Post("0","Je suis le contenu de la reponse", 1, 3, new Date(), new Date()),
      new Post("0","Je suis le contenu de la reponse", 1, 3, new Date(), new Date()),
    ];
    //this.postService.getAllPostAnswers(parseInt(post_id));
  }

}
