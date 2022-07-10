import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { UserProfile } from 'src/app/_dtos/user/UserProfile';
import {Post} from "../../_dtos/post/Post";
import {PostService} from "../../_services/post/post.service";
import {User} from "../../_dtos/user/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User
  userPost: Post[];


  constructor(private userService: UserService, private postService: PostService, private router: Router) {
    this.profile = this.userService.getProfile()
  }

  ngOnInit(): void {

    this.postService.getAllByUser(this.profile.id).subscribe(posts => {
      this.userPost = posts.reverse();
    },error => {

    });


  }

  //TODO : Cliquer sur le nombre de follower pour aller voir les personnes qui nous suivent

  continue(): void{
    this.router.navigateByUrl("/chat").then();
  }


  viewFollowers(){
    alert("TODO : Liste des followers")
  }


  deletePost(post_id: string) {
    if (confirm("You are going to delete a post")) {
      //this.postService.delete(parseInt(post_id)).subscribe()

      //For demo
      this.userPost.forEach(post => {
        if (post.id == post_id) {
          let i = this.userPost.indexOf(post)
          this.userPost.splice(i, 1);
        }
      })
      //
    }


  }

}
