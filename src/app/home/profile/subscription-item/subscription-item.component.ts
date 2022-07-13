import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";

@Component({
  selector: 'app-subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.scss']
})
export class SubscriptionItemComponent implements OnInit {

  @Input()
  subscription: User;

  constructor() { }

  ngOnInit(): void {
    //TODO : Call API for unfollow
  }

  unfollow(){
    alert("TODO : Implement unfollow");
  }

}
