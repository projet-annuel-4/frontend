import { Component, OnInit } from '@angular/core'
import { User } from '../../../_dtos/user/User'
import { FollowService } from '../../../_services/follow/follow.service'
import { TokenStorageService } from '../../../_services/token/token-storage.service'

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss'],
})
export class FollowerListComponent implements OnInit {
  followers: User[]

  fromFriendPage: boolean

  constructor(private followService: FollowService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.fromFriendPage = localStorage.getItem('fromFriendPage') as unknown as boolean

    console.log('-----------' + this.fromFriendPage)
    console.log('-----------' + localStorage.getItem('friendId'))
    console.log('zqùelmd:;jqlk:vj;?Z%PFML.?ML/')

    if (this.fromFriendPage) {
      this.followService
        .getAllFollowers(localStorage.getItem('friendId') as unknown as number)
        .subscribe(followers => {
          this.followers = followers
        })
    } else {
      this.followService.getAllFollowers(this.tokenStorage.getUser().id).subscribe(followers => {
        this.followers = followers
      })
    }

    localStorage.removeItem('fromFriendPage')
    localStorage.removeItem('friendId')
  }
}
