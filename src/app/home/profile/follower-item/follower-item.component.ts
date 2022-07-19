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

  name: string;

  constructor() { }

  //TODO : Crée la page de profile du Friend

  //TODO: Click sur le Friend redirige vers le profile
  // routerlink etc....

  ngOnInit(): void {
    this.name = this.follower.firstname + " " + this.follower.lastname;
  }


}
