import { Component, OnInit } from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {FollowService} from "../../../_services/follow/follow.service";
import {TokenStorageService} from "../../../_services/token/token-storage.service";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  subscriptions: User[];

  constructor(private followService: FollowService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.followService.getAllSubscriptions(this.tokenStorage.getUser().id).subscribe(subscriptions => {
      this.subscriptions = subscriptions;
    });

  }

}
