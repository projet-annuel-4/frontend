import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {FollowService} from "../../../_services/follow/follow.service";
import {TokenStorageService} from "../../../_services/token/token-storage.service";
import {NbDialogRef} from "@nebular/theme";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.scss']
})
export class SubscriptionItemComponent implements OnInit {

  @Input()
  subscription: User;

  friendId: number

  constructor(private followService: FollowService, public tokenStorage: TokenStorageService,
              protected ref: NbDialogRef<SubscriptionItemComponent>, private router: Router) { }

  ngOnInit(): void {
  }


  goToSubscriptionPage(){
    if(this.subscription.id == this.tokenStorage.getUser().id){
      this.router.navigate(['/profile']).then();
    } else {
      this.router.navigate(['friend/' + this.subscription.id + '/' + 'profile']).then();
    }
  }

  unfollow(){
    this.followService.unfollow(this.tokenStorage.getUser().id, this.subscription.id)
      .subscribe(then =>{
        this.ref.close();
      });
  }

}
