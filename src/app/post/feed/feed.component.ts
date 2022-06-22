import { Component, OnInit} from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {Post} from "../../_dtos/post/Post";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {UserProfile} from "../../_dtos/user/UserProfile";
import {User} from "../../_dtos/user/User";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  //user: UserProfile;
  user: User;
  posts: Post[];
  answers: Post[];


  constructor(private postService: PostService, private tokenStorage: TokenStorageService) { }


  ngOnInit(): void {
    //this.user = this.tokenStorage.getUser();
    //this.user.id = "5";
/*
    this.posts = [
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()"," new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
      new Post("0","Je suis le contenu de la reponse", 1, "new Date()", "new Date()", new User(6)),
    ];

 */

    this.postService.getAllSubscriptionPost(parseInt("5")).subscribe(posts =>{
      posts.forEach(post => {
        console.log(post.content);
      })
      this.posts = posts;
    });

  }




  getAnswers(post_id: string){
    /*
    this.answers = [
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
      new Post("0","Je suis le contenu de la reponse", 1, new Date(), new Date(), 6),
    ];

     */
    //this.postService.getAllPostAnswers(parseInt(post_id));
  }

}
