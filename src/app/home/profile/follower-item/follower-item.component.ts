import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../_dtos/user/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.scss']
})
export class FollowerItemComponent implements OnInit {

  @Input()
  follower: User;

  name: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = this.follower.firstname + " " + this.follower.lastname;
  }

  goToFriendPage(){
    localStorage.setItem('isFollowed', 'true');
    this.router.navigate(['friend/' + this.follower.id + '/' + 'profile']).then();
  }


}
