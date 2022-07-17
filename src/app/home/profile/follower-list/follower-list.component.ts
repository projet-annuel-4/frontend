import { Component, OnInit } from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {FollowService} from "../../../_services/follow/follow.service";
import {TokenStorageService} from "../../../_services/token/token-storage.service";

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss']
})
export class FollowerListComponent implements OnInit {

  followers: User[];

  constructor(private followService: FollowService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    //TODO : Call API for followers
    this.followService.getAllFollowers(this.tokenStorage.getUser().id).subscribe(followers => {
      this.followers = followers;
    });

    /*
    const followersMock = [
      new User(1, "Jean1", "Mock", "jean.mock@gmail.com", 12, 5, "http://profile-image.oui"),
      new User(2, "Jean2", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(3, "Jean3", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(4, "Jean4", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(5, "Jean5", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(6, "Jean6", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(7, "Jean7", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
    ]


    this.followers = followersMock;

     */
  }

}
