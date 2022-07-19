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

    this.followService.getAllFollowers(this.tokenStorage.getUser().id).subscribe(followers => {
      this.followers = followers;
    });

  }

}
