import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";

@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.scss']
})
export class FollowerItemComponent implements OnInit {

  @Input()
  follower: User;

  constructor() { }

  ngOnInit(): void {
    //TODO : Call API for unfollow
  }



}
