import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {FollowService} from "../../../_services/follow/follow.service";
import {TokenStorageService} from "../../../_services/token/token-storage.service";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.scss']
})
export class SubscriptionItemComponent implements OnInit {

  @Input()
  subscription: User;

  constructor(private followService: FollowService, private tokenStorage: TokenStorageService,
              protected ref: NbDialogRef<SubscriptionItemComponent>) { }

  ngOnInit(): void {
  }

  unfollow(){
    this.followService.unfollow(this.tokenStorage.getUser().id, this.subscription.id)
      .subscribe(then =>{
        this.ref.close();
      });
  }

}
